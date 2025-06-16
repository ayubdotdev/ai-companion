import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getCompanion } from '@/lib/actions/companion.action'
import CompanionComponent from '@/components/CompanionComponent'

const CallPage = async ({ params }: { params: { id: string } }) => {
    const { userId } = await auth()
    if (!userId) redirect('/sign-in')

    const companion = await getCompanion(params.id)
    if (!companion) redirect('/companions')

    const { user } = await auth()
    if (!user) redirect('/sign-in')

    return (
        <main className="flex-1 flex flex-col items-center justify-center p-4">
            <CompanionComponent
                {...companion}
                companionId={params.id}
                userName={user.firstName!}
                userImage={user.imageUrl!}
            />
        </main>
    )
}

export default CallPage 