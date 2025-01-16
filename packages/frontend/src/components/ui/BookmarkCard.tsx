export const BookmarkCard = ({
  name,
  username,
  profileImage,
  text,
}: {
  name: string;
  username: string;
  profileImage: string;
  text: string;
}) => (
  <div className="bg-slate-50 p-3 border border-gray-200 rounded-lg">
    <div className="flex gap-2">
      <img
        className="w-8 h-8 rounded-full object-cover"
        src={profileImage}
        alt="User profile"
      />
      <div>
        <div className="font-medium text-sm">{name}</div>
        <div className="text-sm text-gray-500">@{username}</div>
      </div>
    </div>
    <div className="mt-2 text-sm whitespace-pre-wrap">{text}</div>
  </div>
);
