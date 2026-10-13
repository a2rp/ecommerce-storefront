import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiSearch, FiShoppingBag, FiSun, FiX } from "react-icons/fi";
import styles from "./styles.module.css";

const Header = ({ cartCount }) => {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let previousScroll = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < 80 || currentScroll < previousScroll - 3) setHidden(false);
      else if (currentScroll > previousScroll + 3 && !menuOpen && !searchOpen) setHidden(true);
      previousScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen, searchOpen]);

  const submitSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const closePanels = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const linkClass = ({ isActive }) => [styles.navLink, isActive ? styles.active : ""].join(" ");

  return (
    <header className={[styles.header, hidden && !menuOpen && !searchOpen ? styles.hidden : ""].join(" ")}>
      <div className={styles.announcement}><span>Small-batch homewares for the everyday</span><span>Free US shipping over $85</span></div>
      <div className={styles.bar}>
        <Link className={styles.brand} to="/" onClick={closePanels} aria-label="Morrow and Made home">
          <span className={styles.brandMark}><FiSun aria-hidden="true" /></span>
          <span className={styles.brandName}>morrow<span> & made</span></span>
        </Link>

        <nav className={[styles.navigation, menuOpen ? styles.navigationOpen : ""].join(" ")} aria-label="Main navigation">
          <NavLink className={linkClass} to="/shop" onClick={closePanels}>Shop all</NavLink>
          <NavLink className={linkClass} to="/shop?category=Tableware" onClick={closePanels}>Tableware</NavLink>
          <NavLink className={linkClass} to="/shop?category=Scent%20%26%20ritual" onClick={closePanels}>Scent & ritual</NavLink>
          <Link className={styles.navLink} to="/#our-story" onClick={closePanels}>Our story</Link>
        </nav>

        <div className={styles.actions}>
          <form className={styles.searchForm} role="search" onSubmit={submitSearch}>
            <FiSearch aria-hidden="true" />
            <input aria-label="Search the shop" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search objects" />
            <button type="submit" aria-label="Submit search"><FiSearch aria-hidden="true" /></button>
          </form>
          <button className={styles.searchToggle} type="button" onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }} aria-label={searchOpen ? "Close search" : "Open search"} aria-expanded={searchOpen}>
            {searchOpen ? <FiX aria-hidden="true" /> : <FiSearch aria-hidden="true" />}
          </button>
          <Link className={styles.bagButton} to="/cart" onClick={closePanels} aria-label={`Shopping bag, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}>
            <FiShoppingBag aria-hidden="true" /><span className={styles.bagLabel}>Bag</span><span className={styles.bagCount}>{cartCount}</span>
          </Link>
          <button className={styles.menuToggle} type="button" onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {searchOpen && <form className={styles.mobileSearch} role="search" onSubmit={submitSearch}>
        <FiSearch aria-hidden="true" />
        <input autoFocus aria-label="Search the shop" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search mugs, candles, bowls..." />
        <button type="submit">Search</button>
      </form>}
    </header>
  );
};

export default Header;
