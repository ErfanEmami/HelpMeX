import axios from "axios";
import { useEffect, useState } from "react";

import { BOOKMARKS_ENDPOINT } from "../lib/endpoints";
import { Author, Bookmark } from "@/lib/types";

export const useBookmarks = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<Author["id"][]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);

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
        filteredAuthors.includes(bookmark.authorId)
      )
    );
  }, [filteredAuthors]);

  const fetchBookmarks = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get(BOOKMARKS_ENDPOINT, {
        withCredentials: true,
      });

      const { bookmarks, authors } = res.data;

      setAuthors(authors);
      setBookmarks(bookmarks);
      setFilteredBookmarks(bookmarks);
    } catch (error) {
      console.error("getBookmarks error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    bookmarks: filteredBookmarks,
    authors,
    filteredAuthors,
    fetchBookmarks,
    setFilteredAuthors,
  };
};
