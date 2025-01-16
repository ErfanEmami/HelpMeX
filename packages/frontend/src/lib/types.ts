export type Author = {
  id: string,
  name: string;
  username: string;
  profileImage: string;
};

export type Bookmark = {
  id: string,
  name: string,
  username: string,
  profileImage: string,
  authorId: string,
  createdAt: string,
  text: string,
};
