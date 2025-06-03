import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { getSubjectColor } from "@/lib/utils";
import { getAllCompanions } from "@/lib/actions/companion.action";
import AnimatedHeading from "@/components/AnimatedHeading";
import Image from "next/image";

export const dynamic = 'force-dynamic';

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const communityCompanions = await getAllCompanions({ limit: 10 });

  return (
    <main className="relative">
      <AnimatedHeading>

        <div className="hidden lg:block absolute top-[5%] left-[18%] w-[300px] h-[300px] opacity-60 -z-10">
          <Image
            src='/images/masters.jpg'
            alt='masters'
            width={200}
            height={200}
            className="object-cover rounded-lg"
          />
        </div>

        <div className="hidden lg:block absolute top-[6%] right-[18%] w-[300] h-[300] opacity-60 -z-10">
          <Image
            src='/images/ai.jpg'
            alt='ai'
            width={200}
            height={200}
            className="object-cover rounded-lg"
          />
        </div>
      </AnimatedHeading>

      <div className="relative z-10">
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
            classNames="w-2/3 pt-5 max-lg:w-full  text-center border border-grey-400 rounded-lg"
          />
          <CTA />
        </section>
      </div>
    </main>
  );
};

export default Page;
