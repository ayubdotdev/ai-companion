import React from 'react'
import CompanionForm from '@/components/CompanionForm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { newCompanionPermissions } from '@/lib/actions/companion.action'
import Image from 'next/image'
import Link from 'next/link'


const NewCompanion = async () => {
    const { userId } = await auth()
    if (!userId) redirect('/sign-in')
    const canCreateCompanion = await newCompanionPermissions()


    return (
        <main className='min-lg:w1/3 min-md:w-2/3 items-center justify-center'>
            {canCreateCompanion ?
                (
                    <article className='w-full  gap-4 flex flex-col'>
                        <h1>Companion Builder</h1>
                        <CompanionForm />
                    </article>
                )
                : (
                    <article className="companion-limit flex flex-col items-center justify-center text-center gap-4 p-6 md:p-10">
                        <Image
                            src="/images/limit.svg"
                            alt="Companion limit reached"
                            width={360}
                            height={230}
                            className="mx-auto"
                        />

                        <div className="cta-badge text-sm font-medium bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full">
                            Upgrade your plan
                        </div>

                        <h1 className="text-2xl font-bold">You've reached your limit</h1>
                        <p className="text-gray-600 max-w-md">
                            You’ve reached your companion limit. Upgrade to create more companions and unlock premium features.
                        </p>

                        <Link
                            href="/subscription"
                            className="bg-black text-white rounded-xl cursor-pointer px-6 py-3 flex items-center gap-2 justify-center hover:bg-neutral-800 transition-colors"
                        >
                            Upgrade My Plan
                        </Link>
                    </article>

                )}
        </main>
    )
}

export default NewCompanion