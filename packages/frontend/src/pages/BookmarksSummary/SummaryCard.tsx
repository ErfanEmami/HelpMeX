import { Separator } from "@/components/ui/separator";
import { SummaryTheme } from "@/lib/types";

export const SummaryCard = (theme: SummaryTheme) => (
  <div className="flex flex-col w-full p-4 gap-3 bg-white rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">
      {theme.themeTitle}
    </h2>

    <Separator />

    <div className="">
      <h3 className="font-semibold text-lg  mb-2">Key Insights</h3>
      <ul className="pl-5 list-disc list-outside ">
        {theme.keyInsights.map((v, index) => (
          <li key={index} className="mb-2">
            {v}
          </li>
        ))}
      </ul>
    </div>

    <Separator />

    <div className="">
      <h3 className="font-semibold text-lg  mb-2">Actionable Items</h3>
      <ul className="pl-5 list-disc list-outside ">
        {theme.actionableItems.map((v, index) => (
          <li key={index} className="mb-2">
            {v}
          </li>
        ))}
      </ul>
    </div>

    <Separator />

    <div>
      <h3 className="font-semibold text-lg mb-2">Bookmark References</h3>
      <ul className="pl-5 list-disc list-outside ">
        {theme.bookmarkRefs.map((v, index) => (
          <li key={index} className="mb-2">
            {v}
          </li>
        ))}
      </ul>
    </div>
  </div>
);
