import { getAllCompanions } from "@/lib/actions/companion.action";
import CompanionCard from "@/components/CompanionCard";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import AnimatedHeading from "@/components/AnimatedHeading";

const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
    const filters = await searchParams;
    const subject = filters.subject ? filters.subject : '';
    const topic = filters.topic ? filters.topic : '';

    const companions = await getAllCompanions({ subject, topic });

    // Filter out duplicate companions based on ID
    const uniqueCompanions = companions.filter((companion, index, self) =>
        index === self.findIndex((c) => c.id === companion.id)
    );

    return (
        <main>

            <section className="flex justify-between gap-4 max-sm:flex-col">
                <AnimatedHeading>Companion Library</AnimatedHeading>
                    <div className="flex gap-4">
                        <SearchInput />
                        <SubjectFilter />
                    </div>
            </section>
            <section className="companions-grid">
                {uniqueCompanions.map((companion) => (
                    <CompanionCard
                        key={companion.id}
                        {...companion}
                        color={getSubjectColor(companion.subject)}
                    />
                ))}
            </section>
        </main >
    )
}

export default CompanionsLibrary