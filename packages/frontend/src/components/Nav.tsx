export const Nav = ({ max_width }: { max_width: string }) => (
  <nav className="border-b">
    <div className={`p-4 m-auto max-w-[${max_width}]`}>
      <a href="/">Home</a> | <a href="/summary">Summary</a>
    </div>
  </nav>
);
