import { AuthorPill } from "@/components/AuthorPill";
import { Page } from "../components/Page";
import { BookmarkCard } from "@/components/ui/BookmarkCard";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { SummaryTheme } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import Title from "@/components/Title";

export const BookmarksSummary = () => {
  const {
    isLoadingBookmarks,
    isLoadingSummary,
    bookmarks,
    authors,
    filteredAuthors,
    setFilteredAuthors,
    fetchBookmarksSummary,
    bookmarksSummary,
  } = useBookmarks();

  const isSelected = (id: string) => {
    return filteredAuthors.includes(id);
  };

  const handlePillClick = (id: string) => {
    setFilteredAuthors((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const BookmarksPanel = () => (
    <HalfPanel
      title="Bookmarks"
      content={
        isLoadingBookmarks ? (
          <Loading />
        ) : (
          bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} {...bookmark} />
          ))
        )
      }
      control={
        <div className="inline-flex pb-2 gap-2 overflow-x-auto">
          {authors.map((author) => (
            <AuthorPill
              {...author}
              key={author.id}
              selected={isSelected(author.id)}
              onClick={() => handlePillClick(author.id)}
            />
          ))}
        </div>
      }
    />
  );

  const SummaryPanel = () => (
    <HalfPanel
      title="Summary"
      content={
        isLoadingSummary ? (
          <Loading />
        ) : bookmarksSummary ? (
          bookmarksSummary.themes.map((theme) => <SummaryCard {...theme} />)
        ) : null
      }
      control={
        <Button
          size="full"
          disabled={isLoadingSummary}
          onClick={fetchBookmarksSummary}
        >
          Get Summary
        </Button>
      }
    />
  );

  return (
    <Page>
      <div className="flex flex-1 overflow-y-hidden">
        <BookmarksPanel />
        <SummaryPanel />
      </div>
    </Page>
  );
};

const HalfPanel = ({
  title,
  content,
  control,
}: {
  title: string;
  content: React.ReactNode;
  control: React.ReactNode;
}) => (
  <div className="w-1/2 px-4 flex flex-col">
    <Title>{title}</Title>
    <div className="border border-gray-200  bg-gray-50 p-4 flex flex-col gap-4 overflow-y-auto items-center flex-1">
      {content}
    </div>
    <div className="mt-2 min-h-[100px] flex flex-col justify-center items-center overflow-hidden">
      {control}
    </div>
  </div>
);

const SummaryCard = (theme: SummaryTheme) => (
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
