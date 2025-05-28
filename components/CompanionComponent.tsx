'use client';

import { useEffect, useRef, useState } from 'react'
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from '@/constants/soundwaves.json'
import { motion, AnimatePresence } from "framer-motion";
import { addToSessionHistory } from "@/lib/actions/companion.action";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

interface CurrentExchange {
    aiMessage?: string;
    userMessage?: string;
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentExchange, setCurrentExchange] = useState<CurrentExchange>({});
    const [isUserTurn, setIsUserTurn] = useState(false);

    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    useEffect(() => {
        const onCallStart = () => {
            setCallStatus(CallStatus.ACTIVE);
            setCurrentExchange({});
            setIsUserTurn(false);
        };

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            setCurrentExchange({});
            setIsUserTurn(false);
            addToSessionHistory(companionId);
        }

        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                if (callStatus === CallStatus.ACTIVE) {
                    if (message.role === 'assistant') {
                        // When AI speaks, clear user message and set new AI message
                        setCurrentExchange(prev => ({
                            aiMessage: message.transcript,
                            userMessage: undefined
                        }));
                        setIsUserTurn(true);
                    } else if (message.role === 'user' && isUserTurn) {
                        // When user responds, update user message
                        setCurrentExchange(prev => ({
                            ...prev,
                            userMessage: message.transcript
                        }));
                        setIsUserTurn(false);
                    }
                }
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => {
            setIsSpeaking(false);
            
            // If AI finished speaking, it's user's turn
            if (callStatus === CallStatus.ACTIVE) {
                setIsUserTurn(true);
            }
        };

        const onError = (error: Error) => {
            console.log('Error', error);
            setCurrentExchange({});
            setIsUserTurn(false);
        };

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    }, [callStatus, isUserTurn]);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted)
    }

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);
        setCurrentExchange({});
        setIsUserTurn(false);

        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ["transcript"],
            serverMessages: [],
        }

        // @ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED);
        setCurrentExchange({});
        setIsUserTurn(false);
        vapi.stop()
    }

    return (
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-[70vh]"
        >
            <motion.section 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
                className="flex gap-8 max-sm:flex-col"
            >
                <motion.div 
                    className="companion-section"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <motion.div 
                        className="companion-avatar relative" 
                        style={{ backgroundColor: getSubjectColor(subject) }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        {/* Soundwaves animation in the background */}
                        <motion.div 
                            className={cn(
                                'absolute inset-0 flex items-center justify-center',
                                callStatus === CallStatus.ACTIVE && isSpeaking ? 'opacity-100' : 'opacity-0'
                            )}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            style={{ zIndex: 1 }}
                        >
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className="w-full h-full opacity-30"
                            />
                        </motion.div>

                        {/* AI Avatar on top */}
                        <motion.div
                            key={callStatus}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                                'absolute inset-0 flex items-center justify-center',
                                (callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE || callStatus === CallStatus.ACTIVE) ? 'opacity-100' : 'opacity-0',
                                callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                            )}
                            style={{ zIndex: 2 }}
                        >
                            <Image 
                                src={`/icons/${subject}.svg`} 
                                alt={subject} 
                                width={150} 
                                height={150} 
                                className="max-sm:w-fit" 
                            />
                        </motion.div>
                    </motion.div>
                    <motion.p 
                        className="font-bold text-2xl"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {name}
                    </motion.p>
                </motion.div>

                <motion.div 
                    className="user-section"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 100, damping: 15 }}
                >
                    <motion.div 
                        className="user-avatar"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <Image 
                                src={userImage} 
                                alt={userName} 
                                width={130} 
                                height={130} 
                                className="rounded-lg" 
                            />
                        </motion.div>
                        <motion.p 
                            className="font-bold text-2xl"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            {userName}
                        </motion.p>
                    </motion.div>
                    <motion.button 
                        className="btn-mic" 
                        onClick={toggleMicrophone} 
                        disabled={callStatus !== CallStatus.ACTIVE}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <motion.div
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <Image 
                                src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} 
                                alt="mic" 
                                width={36} 
                                height={36} 
                            />
                        </motion.div>
                        <motion.p 
                            className="max-sm:hidden"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            {isMuted ? 'Turn on microphone' : 'Turn off microphone'}
                        </motion.p>
                    </motion.button>
                    <motion.button 
                        className={cn(
                            'rounded-lg py-2 cursor-pointer transition-colors w-full text-white',
                            callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-black',
                            callStatus === CallStatus.CONNECTING && 'animate-pulse'
                        )} 
                        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                        }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        {callStatus === CallStatus.ACTIVE
                            ? "End Session"
                            : callStatus === CallStatus.CONNECTING
                                ? 'Connecting'
                                : 'Start Session'
                        }
                    </motion.button>
                </motion.div>
            </motion.section>

            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 15 }}
                className="relative max-h-[80vh] sm:max-h-none overflow-visible px-8 py-6 bg-white rounded-lg shadow w-full max-w-[1200px] mx-auto"
            >
                <motion.div 
                    className="flex flex-col-reverse items-center gap-4 text-center no-scrollbar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <AnimatePresence mode="popLayout">
                        {currentExchange.aiMessage && (
                            <motion.p
                                key="ai-message"
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="w-full max-w-4xl break-words whitespace-pre-wrap text-lg px-6 text-gray-900"
                            >
                                {name.split(' ')[0].replace(/[.,]/g, '')}: {currentExchange.aiMessage}
                            </motion.p>
                        )}
                        {currentExchange.userMessage && (
                            <motion.p
                                key="user-message"
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="w-full max-w-4xl break-words whitespace-pre-wrap text-lg px-6 text-primary font-semibold"
                            >
                                {userName}: {currentExchange.userMessage}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Top fade */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="pointer-events-none absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent" 
                />
            </motion.section>
        </motion.section>
    )
}

export default CompanionComponent;