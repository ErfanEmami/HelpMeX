export const Overlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="absolute inset-0 bg-black/50 dark:bg-black/80 flex items-center justify-center z-50">
      <div className="text-white">{children}</div>
    </div>
  );
};
