import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { getSubjectColor } from "@/lib/utils";
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.action";
import AnimatedHeading from "@/components/AnimatedHeading";
import Image from "next/image";

export const dynamic = 'force-dynamic';

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>

      <AnimatedHeading>
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to EduNova
          <span className="inline-block align-middle ml-2 mr-1">
            <Image
              src="/images/logo.png"
              alt="EduNova Logo"
              width={56}
              height={56}
              priority
            />
          </span>
           <br />
          Your AI-powered learning companion platform. <br />
          Create personalized AI tutors that adapt to your<br/> style and make
          mastering any subject interactive, engaging, and effective.
        </p>

      </AnimatedHeading>
      <AnimatedHeading>Popular Companions</AnimatedHeading>

      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
