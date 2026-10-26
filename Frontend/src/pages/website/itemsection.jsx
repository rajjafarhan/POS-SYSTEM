import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaWhatsapp } from "react-icons/fa";
import { fetchWebsiteProducts } from "../../functions/website";
import ItemCard from "./itemCard/itemCard.jsx";
import { whatsappLink } from "./siteData";

const PER_PAGE = 16;
const SORTS = {
  featured: { label: "Featured", fn: null },
  low: { label: "Price: low to high", fn: (a, b) => Number(a.sellingPrice) - Number(b.sellingPrice) },
  high: { label: "Price: high to low", fn: (a, b) => Number(b.sellingPrice) - Number(a.sellingPrice) },
  name: { label: "Name: A to Z", fn: (a, b) => String(a.label).localeCompare(String(b.label)) },
};

// Product catalog: search, category filter (kept in the URL), sorting and pagination.
const ItemsSection = () => {
  const { data, isLoading } = useQuery(["fetchWebsiteProducts"], fetchWebsiteProducts);
  const [params, setParams] = useSearchParams();
  const category = (params.get("category") ?? "all").toLowerCase();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  const products = data?.data?.data ?? [];
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      const c = String(p?.category ?? "").trim().toLowerCase();
      if (c) set.add(c);
    });
    return Array.from(set).sort();
  }, [products]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter(
      (p) =>
        (category === "all" || String(p?.category ?? "").trim().toLowerCase() === category) &&
        (!q || `${p?.label} ${p?.category}`.toLowerCase().includes(q))
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
          <div className="s-pills" role="tablist" aria-label="Categories">
            {["all", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                className={`s-pill ${category === c ? "active" : ""}`}
                onClick={() => pickCategory(c)}
              >
                {c === "all" ? "All products" : c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="s-container" style={{ paddingBottom: 96 }}>
        {isLoading ? (
          <div className="s-grid" style={{ marginTop: 28 }}>
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
            <div className="s-grid">
              {shown.map((item, i) => (
                <ItemCard key={item?._id ?? i} item={item} />
              ))}
            </div>
            {pages > 1 && (
              <nav className="s-pager" aria-label="Pages">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} aria-label="Previous page">
                  ‹
                </button>
                {Array.from({ length: pages }).map((_, i) => (
                  <button key={i} className={page === i + 1 ? "active" : ""} onClick={() => setPage(i + 1)}>
                    {i + 1}
                  </button>
                ))}
                <button disabled={page === pages} onClick={() => setPage(page + 1)} aria-label="Next page">
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
