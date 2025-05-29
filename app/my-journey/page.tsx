import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.action";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";
import AnimatedHeading from "@/components/AnimatedHeading";
import { getTotalSessionDuration } from "@/lib/actions/companion.action";

export const dynamic = 'force-dynamic';

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  const totalDuration = await getTotalSessionDuration(user.id);

  return (
    <AnimatedHeading>
      <main className="min-lg:w-3/4">
        <section className="flex justify-between gap-4 max-sm:flex-col items-center">
          <div className="flex gap-4 items-center">
            <div>
              <Image
                src={user.imageUrl}
                alt={user.firstName!}
                width={110}
                height={110}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-muted-foreground">
                {user.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>

          <div className="flex gap-4 max-sm:w-full">
            <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit flex-1">
              <div className="flex gap-2 items-center">
                <div>
                  <Image
                    src="/icons/check.svg"
                    alt="checkmark"
                    width={22}
                    height={22}
                  />
                </div>
                <p className="text-2xl font-bold">
                  {sessionHistory.length}
                </p>
              </div>
              <div className="text-lg text-gray-600">
                Lessons completed
              </div>
            </div>

            <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit flex-1">
              <div className="flex gap-2 items-center">
                <div>
                  <Image
                    src="/icons/cap.svg"
                    alt="cap"
                    width={22}
                    height={22}
                  />
                </div>
                <p className="text-2xl font-bold">
                  {companions.length}
                </p>
              </div>
              <div className="text-lg text-gray-600">
                Companions created
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 rounded-2xl border border-gray-200 shadow-md bg-white overflow-hidden">
          <Accordion type="multiple">


            <AccordionItem value="recent">
              <AccordionTrigger className="text-2xl font-bold px-6 py-4 hover:no-underline">
                Recent Sessions
              </AccordionTrigger>
              <AccordionContent className="bg-gray-50 px-6 py-4">
                <CompanionsList
                  title="Recent Sessions"
                  companions={sessionHistory}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="companions">
              <AccordionTrigger className="text-2xl font-bold px-6 py-4 hover:no-underline">
                My Companions ({companions.length})
              </AccordionTrigger>
              <AccordionContent className="bg-gray-50 px-6 py-4">
                <CompanionsList
                  title="My Companions"
                  companions={companions}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="total-duration" className="border-none">
              <AccordionTrigger className="text-2xl font-bold px-6 py-4 hover:no-underline">
                Total Minutes Spent
              </AccordionTrigger>
              <AccordionContent className="bg-gray-50 px-6 py-4">
                <p className="text-lg text-gray-700">
                  You have spent <span className="font-bold text-gray-900">{totalDuration}</span> minutes in sessions.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

      </main>
    </AnimatedHeading>
  );
};

export default Profile;