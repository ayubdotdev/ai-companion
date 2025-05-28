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
  <span className="block">
    Welcome to EduNova
   </span>
  <span className="block mt-2">
    Your AI-powered learning companion platform.
  </span>

  <span className="block mt-1">
    Create personalized AI tutors<br/> that adapt to your style,
  </span>

  <span className="block mt-1">
    And make mastering any subject interactive, engaging, and effective.
  </span>
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
