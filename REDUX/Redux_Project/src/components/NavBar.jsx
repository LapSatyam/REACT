import { Link } from "react-router-dom";

const NavBar = () => {
  const linkStyle = "rounded-md text-black bg-white px-3 py-1 active:scale-95";

  return (
    <nav className="flex justify-between bg-(--c1) px-6 py-3">
      <Link
        to="/"
        className="font-serif text-3xl font-bold text-shadow-xs text-shadow-black"
      >
        MediaSearch
      </Link>

      <div className="flex items-center gap-2 text-lg font-semibold">
        <Link to="/" className={linkStyle}>
          Search
        </Link>

        <Link to="/collection" className={linkStyle}>
          Collection
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
