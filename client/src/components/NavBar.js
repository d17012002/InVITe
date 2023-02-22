const Header = () => {
  return (
    <header className="bg-[color:var(--white-color)] fixed top-0 z-50 w-full shadow-md text-[color:var(--secondary-color)]">
      <div className="container mx-auto flex items-center flex-col lg:flex-row justify-between p-4">
        <div className="flex items-center">
          {/* <img src="/logo.png" alt="Logo" className="h-8" /> */}
          <h1 className="m-2 text-gray-800 font-bold text-4xl">
            In
            <span className="text-[color:var(--secondary-color)]">VIT</span>
            e✨
          </h1>
        </div>
        <nav className="text-sm">
          <ul className="flex items-center">
            <li className="mr-4">
              <a>Home</a>
            </li>
            <li className="mr-4">
              <a>Events</a>
            </li>
            <li className="mr-4">
              <a>Contact</a>
            </li>
            <li className="mr-4">
              <a>About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
