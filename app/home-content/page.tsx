import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { getSubjectColor } from "@/lib/utils";
import { getAllCompanions } from "@/lib/actions/companion.action";
import AnimatedHeading from "@/components/AnimatedHeading";
import { motion } from "framer-motion";

export const dynamic = 'force-dynamic';

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const communityCompanions = await getAllCompanions({ limit: 10 });

  return (
    <main>
      <AnimatedHeading>
         Popular Companions
       </AnimatedHeading>
      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <AnimatedHeading>
        <div className="text-center mb-8 mt-12">
          <h2 className="text-3xl font-bold text-gray-700 mb-2">Explore More Companions</h2>
          <p className="text-lg text-gray-500">Discover AI companions created by the community or create your own!</p>
        </div>
      </AnimatedHeading>

      <section className="home-section">
        <CompanionsList
          title="Companions of Community"
          companions={communityCompanions}
          classNames="w-2/3 max-lg:w-full  text-center border border-grey-400 rounded-lg"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
