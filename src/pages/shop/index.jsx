import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiSliders } from "react-icons/fi";
import ProductCard from "../../components/productCard";
import { categories, products } from "../../data/products";
import styles from "./styles.module.css";

const Shop = ({ onAddToCart }) => {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [sort, setSort] = useState("featured");
  const selectedCategory = params.get("category") || "All pieces";

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory = selectedCategory === "All pieces" || product.category === selectedCategory;
      const matchesQuery = !normalized || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
    return filtered.sort((a, b) => {
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [query, selectedCategory, sort]);

  const setCategory = (category) => {
    const next = new URLSearchParams(params);
    if (category === "All pieces") next.delete("category");
    else next.set("category", category);
    setParams(next, { replace: true });
  };

  return (
    <section className={styles.shop}>
      <div className={styles.shopIntro}><p className={styles.eyebrow}>THE MORROW COLLECTION</p><h1>Objects to live with.</h1><p>Thoughtful things for the table, the shelf, and the slower parts of the day.</p></div>
      <div className={styles.toolbar}>
        <div className={styles.filters} aria-label="Filter by category">{categories.map((category) => <button key={category} className={selectedCategory === category ? styles.selected : ""} type="button" onClick={() => setCategory(category)} aria-pressed={selectedCategory === category}>{category}</button>)}</div>
        <div className={styles.tools}><label className={styles.search}><FiSearch aria-hidden="true" /><span className={styles.visuallyHidden}>Search pieces</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" /></label><label className={styles.sort}><FiSliders aria-hidden="true" /><span className={styles.visuallyHidden}>Sort pieces</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></label></div>
      </div>
      <div className={styles.resultsLine}><p>{visibleProducts.length} {visibleProducts.length === 1 ? "piece" : "pieces"}</p>{(query || selectedCategory !== "All pieces") && <button type="button" onClick={() => { setQuery(""); setParams({}); }}>Clear filters</button>}</div>
      {visibleProducts.length ? <div className={styles.grid}>{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={onAddToCart} />)}</div> : <div className={styles.empty}><h2>No pieces found.</h2><p>Try another search or choose a different collection.</p><button type="button" onClick={() => { setQuery(""); setParams({}); }}>Show all pieces</button></div>}
    </section>
  );
};

export default Shop;
