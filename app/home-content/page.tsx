import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { getSubjectColor } from "@/lib/utils";
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.action";
import AnimatedHeading from "@/components/AnimatedHeading";

export const dynamic = 'force-dynamic';

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
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
          title="Recently completed sessions by our users"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full border border-grey-200 rounded-lg"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
