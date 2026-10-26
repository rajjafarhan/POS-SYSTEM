import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaWhatsapp, FaChevronDown } from "react-icons/fa";
import { fetchWebsiteProducts } from "../../functions/website";
import ItemCard from "./itemCard/itemCard.jsx";
import { whatsappLink } from "./siteData";

const PER_PAGE = 16;
const TOP_CATEGORIES = 8; // shown as buttons; the rest go in "More categories"
const SORTS = {
  featured: { label: "Featured", fn: null },
  low: { label: "Price: low to high", fn: (a, b) => Number(a.sellingPrice) - Number(b.sellingPrice) },
  high: { label: "Price: high to low", fn: (a, b) => Number(b.sellingPrice) - Number(a.sellingPrice) },
  name: { label: "Name: A to Z", fn: (a, b) => String(a.label).localeCompare(String(b.label)) },
};
const norm = (c) => String(c ?? "").trim().toLowerCase();

// Searchable list of every category, for shops with lots of them.
const MoreCategories = ({ categories, active, onPick, hiddenCount }) => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const shown = categories.filter(([c]) => c.includes(q.trim().toLowerCase()));
  return (
    <div className="s-more" ref={ref}>
      <button type="button" className="s-pill more" onClick={() => setOpen(!open)} aria-expanded={open}>
        More categories{hiddenCount ? ` (+${hiddenCount})` : ""} <FaChevronDown />
      </button>
      {open && (
        <div className="s-more-panel">
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a category…" />
          <div className="s-more-list">
            {shown.length === 0 ? (
              <div className="s-more-empty">No category matches “{q}”</div>
            ) : (
              shown.map(([c, n]) => (
                <button
                  key={c}
                  type="button"
                  className={active === c ? "active" : ""}
                  onClick={() => {
                    onPick(c);
                    setOpen(false);
                    setQ("");
                  }}
                >
                  {c}
                  <span>{n}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Product catalog: search, category filter (kept in the URL), sorting and pagination.
const ItemsSection = () => {
  const { data, isLoading } = useQuery(["fetchWebsiteProducts"], fetchWebsiteProducts);
  const [params, setParams] = useSearchParams();
  const category = norm(params.get("category") ?? "all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const products = data?.data?.data ?? [];
  // [name, count] sorted by number of products, biggest first
  const categories = useMemo(() => {
    const m = new Map();
    products.forEach((p) => {
      const c = norm(p?.category);
      if (c) m.set(c, (m.get(c) ?? 0) + 1);
    });
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [products]);

  const top = categories.slice(0, TOP_CATEGORIES);
  // keep the chosen category visible as a button even if it lives in "More"
  const pills =
    category !== "all" && !top.some(([c]) => c === category)
      ? [...categories.filter(([c]) => c === category), ...top]
      : top;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter(
      (p) =>
        (category === "all" || norm(p?.category) === category) &&
        (!q || `${p?.label} ${p?.category} ${p?.description ?? ""}`.toLowerCase().includes(q))
    );
    if (SORTS[sort].fn) list = [...list].sort(SORTS[sort].fn);
    return list;
  }, [products, category, query, sort]);

  useEffect(() => setPage(1), [category, query, sort]);
  const pages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const shown = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const pickCategory = (c) => {
    if (c === "all") params.delete("category");
    else params.set("category", c);
    setParams(params, { replace: true });
  };
  const goTo = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="s-toolbar">
        <div className="s-container">
          <div className="s-toolbar-row">
            <label className="s-search">
              <FaSearch />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commodes, vanities, showers…"
                aria-label="Search products"
              />
            </label>
            <select className="s-select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort">
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </div>
          <div className="s-pills-row">
            <div className="s-pills" aria-label="Categories">
              <button
                type="button"
                className={`s-pill ${category === "all" ? "active" : ""}`}
                onClick={() => pickCategory("all")}
              >
                All products <em>{products.length}</em>
              </button>
              {pills.map(([c, n]) => (
                <button
                  key={c}
                  type="button"
                  className={`s-pill ${category === c ? "active" : ""}`}
                  onClick={() => pickCategory(c)}
                >
                  {c} <em>{n}</em>
                </button>
              ))}
            </div>
            {categories.length > TOP_CATEGORIES ? (
              <MoreCategories
                categories={categories}
                active={category}
                onPick={pickCategory}
                hiddenCount={categories.length - TOP_CATEGORIES}
              />
            ) : null}
          </div>
        </div>
      </div>

      <section className="s-container" style={{ paddingBottom: 110 }}>
        {isLoading ? (
          <div className="s-grid" style={{ marginTop: 30 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="s-skeleton" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="s-empty">
            <h3>No products found</h3>
            <p style={{ marginBottom: 24 }}>Try another search, or ask us. We may have it in store.</p>
            <a className="s-btn s-btn-wa" href={whatsappLink()} target="_blank" rel="noreferrer">
              <FaWhatsapp /> Ask on WhatsApp
            </a>
          </div>
        ) : (
          <>
            <p className="s-count">
              Showing {shown.length} of {results.length} product{results.length === 1 ? "" : "s"}
              {category !== "all" ? (
                <>
                  {" "}
                  in <b style={{ textTransform: "capitalize" }}>{category}</b>
                </>
              ) : null}
            </p>
            <div className="s-grid" key={`${category}-${sort}-${page}`}>
              {shown.map((item, i) => (
                <ItemCard key={item?._id ?? i} item={item} />
              ))}
            </div>
            {pages > 1 && (
              <nav className="s-pager" aria-label="Pages">
                <button disabled={page === 1} onClick={() => goTo(page - 1)} aria-label="Previous page">
                  ‹
                </button>
                {Array.from({ length: pages }).map((_, i) => (
                  <button key={i} className={page === i + 1 ? "active" : ""} onClick={() => goTo(i + 1)}>
                    {i + 1}
                  </button>
                ))}
                <button disabled={page === pages} onClick={() => goTo(page + 1)} aria-label="Next page">
                  ›
                </button>
              </nav>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default ItemsSection;
