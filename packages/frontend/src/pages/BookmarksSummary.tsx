import { AuthorPill } from "@/components/AuthorPill";
import { Page } from "../components/Page";
import { BookmarkCard } from "@/components/ui/BookmarkCard";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { SummaryTheme } from "@/lib/types";

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

  if (isLoadingBookmarks) {
    return <Loading />;
  }

  const BookmarksPanel = () =>
    isLoadingBookmarks ? (
      <div className="flex justify-center items-center w-full">
        <Loading />
       </div>
    ) : (
      <div className="w-1/2 border-r-2 px-4 flex flex-col gap-4">
        <div className="inline-flex gap-2 overflow-x-auto">
          {authors.map((author) => (
            <AuthorPill
              {...author}
              key={author.id}
              selected={isSelected(author.id)}
              onClick={() => handlePillClick(author.id)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto flex-1">
          {bookmarks.map((bookmark) => (
            <BookmarkCard 
              key={bookmark.id} 
              {...bookmark} 
            />
          ))}
        </div>
      </div>
    );


    const SummaryPanel = () =>
      isLoadingSummary ? (
        <div className="flex justify-center items-center w-full">
          <Loading />
        </div>
      ) : (
        <div className="w-1/2 border-r-2 px-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4 overflow-y-auto flex-1">
            {bookmarksSummary ? (
              bookmarksSummary.themes.map(theme => <SummaryCard {...theme} />)
            ): null}
            <Button onClick={fetchBookmarksSummary}>Get Summary</Button>
          </div>
        </div>
      );    

  return (
    <Page title={{ text: "Bookmarks Summary", isTyped: true }}>
      <div className="flex h-full">
        <BookmarksPanel />
        <SummaryPanel />
      </div>
    </Page>
  );
};

const SummaryCard = (theme: SummaryTheme) => (
  <div className="flex flex-col w-full gap-2 mb-4">
    <b>{theme.themeTitle}</b>
    
    <b>keyInsights</b>
    <ul>
      {theme.keyInsights.map(v => (
        <li>-{v}</li>
      ))}
    </ul>
      
    <b>actionableItems</b>
    <ul>
      {theme.actionableItems.map(v => (
        <li>-{v}</li>
      ))}
    </ul>

    <b>bookmarkRefs</b>
    <ul>
      {theme.bookmarkRefs.map(v => (
        <li>-{v}</li>
      ))}
    </ul>
  </div>
)
