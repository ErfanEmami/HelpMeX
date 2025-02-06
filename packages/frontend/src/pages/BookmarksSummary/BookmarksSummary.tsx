import { AuthorPill } from "@/components/AuthorPill";
import { Page } from "../../components/page";
import { BookmarkCard } from "@/components/BookmarkCard";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Content, Control, ControlPanel } from "@/components/ControlPanel";
import { SummaryCard } from "./components/SummaryCard";

export const BookmarksSummary = () => {
  const {
    isLoadingBookmarks,
    isLoadingSummary,
    awaitingAccept,
    bookmarks,
    authors,
    filteredAuthors,
    setFilteredAuthors,
    fetchBookmarksSummary,
    bookmarksSummary,
    saveBookmarksSummary,
    setAwaitingAccept,
    setBookmarksSummary,
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
                  key={author.authorId}
                  selected={filteredAuthors.includes(author.authorId)}
                  onClick={() => handlePillClick(author.authorId)}
                />
              ))}
            </div>
          </Control>
          <Content>
            {bookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.bookmarkId} {...bookmark} />
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
            {awaitingAccept ? (
              <div className="flex w-full gap-2">
                <Button
                  onClick={() => {
                    setBookmarksSummary(null);
                    setAwaitingAccept(false);
                  }}
                  size="full"
                  variant="destructive"
                >
                  Discard
                </Button>
                <Button
                  onClick={async () => {
                    const res = await saveBookmarksSummary();
                    if (res.error) {
                      // TODO handle error
                    } else {
                      setBookmarksSummary(null);
                    }
                  }}
                  size="full"
                  variant="accept"
                >
                  Save Summary
                </Button>
              </div>
            ) : (
              <Button
                size="full"
                disabled={isLoadingSummary}
                onClick={fetchBookmarksSummary}
              >
                Generate Summary
              </Button>
            )}
          </Control>
        </ControlPanel>
      </div>
    </Page>
  );
};
