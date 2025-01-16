import { AuthorPill } from "@/components/AuthorPill";
import { Page } from "../components/Page";
import { BookmarkCard } from "@/components/ui/BookmarkCard";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Loading } from "@/components/Loading";

const text =
  "As you scale up, one of the most difficult things to navigate is knowing what to delegate, and when to delegate it.\n\nDelegate the wrong thing to the wrong person, and you are toast.\n\nFail to delegate, and you can't grow.";

export const BookmarksSummary = () => {
  const { 
    isLoading, 
    bookmarks, 
    authors, 
    filteredAuthors, 
    setFilteredAuthors 
  } = useBookmarks();

  const isSelected = (id: string) => {
    return filteredAuthors.includes(id);
  };

  const handlePillClick = (id: string) => {
    setFilteredAuthors((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Page title={{ text: "Bookmarks Summary", isTyped: true }}>
      <div className="flex h-full">
        <div className="w-1/2 border-r-2 px-4 flex flex-col gap-4">
          <div className="inline-flex gap-2 overflow-x-auto">
            {authors.map((author) => (
              <AuthorPill
                {...author}
                selected={isSelected(author.id)}
                onClick={() => handlePillClick(author.id)}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto flex-1">
            {bookmarks.map((bookmark) => (
              <BookmarkCard {...bookmark} />
            ))}
          </div>
        </div>

        {/* Right Side - Summarize */}
        <div className="w-1/2 border-r-2 px-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4 overflow-y-auto flex-1">
            {[1, 1, 1, 1, ,].map(() => (
              <BookmarkCard
                name="name"
                username="username"
                profileImage="https://pbs.twimg.com/profile_images/1755950617359777792/sDkIS349_normal.jpg"
                text={text}
              />
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
};
