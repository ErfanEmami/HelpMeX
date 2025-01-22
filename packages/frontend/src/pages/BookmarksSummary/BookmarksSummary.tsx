import { AuthorPill } from "@/components/AuthorPill";
import { Page } from "../../components/Page";
import { BookmarkCard } from "@/components/BookmarkCard";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Content, Control, ControlPanel } from "@/components/ControlPanel";
import { SummaryCard } from "./SummaryCard";

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

  const handlePillClick = (id: string) => {
    setFilteredAuthors((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Page>
      <div className="flex flex-1 overflow-y-hidden">
        <ControlPanel title="Bookmarks" half isLoading={isLoadingBookmarks}>
          <Control>
            <div className="flex pb-2 gap-2 overflow-x-auto">
              {authors.map((author) => (
                <AuthorPill
                  {...author}
                  key={author.id}
                  selected={filteredAuthors.includes(author.id)}
                  onClick={() => handlePillClick(author.id)}
                />
              ))}
            </div>
          </Control>
          <Content>
            {bookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.id} {...bookmark} />
            ))}
          </Content>
        </ControlPanel>
        <ControlPanel title="Summary" half>
          <Content>
            {isLoadingSummary ? (
              <Loading />
            ) : bookmarksSummary ? (
              bookmarksSummary.themes.map((theme) => <SummaryCard {...theme} />)
            ) : null}
          </Content>
          <Control>
            <Button
              size="full"
              disabled={isLoadingSummary}
              onClick={fetchBookmarksSummary}
            >
              Get Summary
            </Button>
          </Control>
        </ControlPanel>
      </div>
    </Page>
  );
};
