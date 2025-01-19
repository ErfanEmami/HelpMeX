import { Separator } from "@/components/ui/separator";
import { SummaryTheme } from "@/lib/types";

type SummarySectionProps = {
  title: string;
  items: string[];
}

const SummarySection = ({ title, items }: SummarySectionProps) => (
  <div>
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <ul className="pl-5 list-disc list-outside">
      {items.map((v, idx) => (
        <li key={idx} className="mb-2">
          {v}
        </li>
      ))}
    </ul>
  </div>
);

export const SummaryCard = (theme: SummaryTheme) => (
  <div className="flex flex-col w-full p-4 gap-3 bg-white rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      {theme.themeTitle}
    </h2>

    <Separator />

    <SummarySection title="Key Insights" items={theme.keyInsights} />
    <Separator />

    <SummarySection title="Actionable Items" items={theme.actionableItems} />
    <Separator />
    
    <SummarySection title="Bookmark References" items={theme.bookmarkRefs} />
  </div>
);
