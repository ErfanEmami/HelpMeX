import axios from "axios";
import { useEffect, useState } from "react";

import { BOOKMARKS_ENDPOINT, BOOKMARKS_SUMMARY_ENDPOINT, SAVE_BOOKMARKS_SUMMARY_ENDPOINT } from "../lib/endpoints";
import { Author, Bookmark, BookmarksAuthors, BookmarksSummary, SavedSummary } from "@/lib/types";

export const useBookmarks = () => {
  const [isLoadingBookmarks, setIsLoadingBookmarks] = useState<boolean>(true);
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(false);
  const [awaitingAccept, setAwaitingAccept] = useState<boolean>(false);

  const [authors, setAuthors] = useState<Author[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<Author["authorId"][]>([]);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
  
  const [bookmarksSummary, setBookmarksSummary] = useState<BookmarksSummary | null>(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  useEffect(() => {
    if (!filteredAuthors.length) {
      setFilteredBookmarks(bookmarks);
      return;
    }

    setFilteredBookmarks(
      bookmarks.filter((bookmark) =>
        filteredAuthors.includes(bookmark.author.authorId)
      )
    );
  }, [filteredAuthors]);

  const fetchBookmarks = async () => {
    setIsLoadingBookmarks(true);

    try {
      const res = await axios.get(BOOKMARKS_ENDPOINT, {
        withCredentials: true,
      });

      const { bookmarks, authors }: BookmarksAuthors = res.data;

      setAuthors(authors);
      setBookmarks(bookmarks);
      setFilteredBookmarks(bookmarks);
    } catch (error) {
      console.error("getBookmarks error:", error);
    } finally {
      setIsLoadingBookmarks(false);
    }
  };

  const fetchBookmarksSummary = async () => {
    setIsLoadingSummary(true);

    try {
      const { data }: { data: BookmarksSummary } = await axios.post(
        BOOKMARKS_SUMMARY_ENDPOINT,
        { bookmarks: filteredBookmarks },
        { withCredentials: true }
      );
      
      setBookmarksSummary(data)
      setAwaitingAccept(true)
    } catch (error) {
      console.error("fetchBookmarksSummary error:", error);
    } finally {
      setIsLoadingSummary(false);
    }
  }

  const saveBookmarksSummary = async () => {
    setIsLoadingSummary(true);

    try {
      const { data }: { data: SavedSummary } = await axios.post(
        SAVE_BOOKMARKS_SUMMARY_ENDPOINT,
        { bookmarks: filteredBookmarks, summary: bookmarksSummary },
        { withCredentials: true }
      );
      setAwaitingAccept(false)
      return {savedBookmark: data, error: null}
    } catch (error) {
      console.error("fetchBookmarksSummary error:", error);
      return {savedBookmark: null, error: `fetchBookmarksSummary error:e${error}`}
    } finally {
      setIsLoadingSummary(false);
    }
  }

  return {
    isLoadingBookmarks,
    isLoadingSummary,
    awaitingAccept,
    authors,
    filteredAuthors,
    bookmarks: filteredBookmarks,
    bookmarksSummary,
    setFilteredAuthors,
    fetchBookmarks,
    fetchBookmarksSummary,
    saveBookmarksSummary,
    setAwaitingAccept,
    setBookmarksSummary,
  };
};
