// Turns the raw invoices from /api/report/closing into the sales closing report:
// summary, period breakdown, date-wise sales/purchases, per-product profit and stock movement.

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const num = (v) => {
  const n = Number(v);
  return isFinite(n) ? n : 0;
};

export const percent = (part, whole) => (whole ? (part / whole) * 100 : 0);

export const money = (n) =>
  Number(n || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
export const pct = (n) => `${Number(n || 0).toFixed(1)}%`;

const pad = (n) => String(n).padStart(2, "0");
export const dayKey = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const startOfDay = (d) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const endOfDay = (d) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

const startOfWeek = (d) => {
  const s = startOfDay(d);
  s.setDate(s.getDate() - ((s.getDay() + 6) % 7)); // weeks start on Monday
  return s;
};

export const formatDay = (d) =>
  `${pad(d.getDate())}-${MONTHS[d.getMonth()]}-${d.getFullYear()}`;

// ---------- periods ----------

const periodOf = (d, groupBy) => {
  if (groupBy === "day") {
    return { key: dayKey(d), label: formatDay(d), start: startOfDay(d) };
  }
  if (groupBy === "week") {
    const s = startOfWeek(d);
    const e = new Date(s);
    e.setDate(e.getDate() + 6);
    return {
      key: dayKey(s),
      label: `${formatDay(s)} – ${formatDay(e)}`,
      start: s,
    };
  }
  return {
    key: `${d.getFullYear()}-${pad(d.getMonth() + 1)}`,
    label: `${MONTHS[d.getMonth()]} ${d.getFullYear()}`,
    start: new Date(d.getFullYear(), d.getMonth(), 1),
  };
};

const nextPeriodStart = (start, groupBy) => {
  const n = new Date(start);
  if (groupBy === "day") n.setDate(n.getDate() + 1);
  else if (groupBy === "week") n.setDate(n.getDate() + 7);
  else n.setMonth(n.getMonth() + 1);
  return n;
};

// Daily for up to ~6 weeks, monthly beyond that.
export const autoGroupBy = (from, to) =>
  (to - from) / 86400000 <= 45 ? "day" : "month";

// ---------- invoice lines ----------

const toLines = (invoices, type) => {
  const lines = [];
  (invoices ?? []).forEach((inv) => {
    const date = new Date(inv.date);
    const items = Array.isArray(inv.product) ? inv.product : [];
    if (items.length === 0) {
      lines.push({
        date,
        invoiceId: inv._id,
        party: inv.rName || "",
        note: inv.rDesc || "",
        productId: "",
        product: "(no products)",
        category: "",
        qty: 0,
        unitPrice: 0,
        total: num(inv.total),
        unitCost: 0,
        cost: type === "sale" ? 0 : num(inv.total),
        profit: type === "sale" ? num(inv.total) : 0,
      });
      return;
    }
    items.forEach((item) => {
      const p = item?.product ?? {};
      const qty = num(item?.productQty);
      const unitCost = num(p.costPrice);
      const listPrice = type === "sale" ? num(p.sellingPrice) : unitCost;
      const total = num(item?.totalPrice) || listPrice * qty;
      const unitPrice = qty ? total / qty : listPrice;
      const cost = type === "sale" ? unitCost * qty : total;
      lines.push({
        date,
        invoiceId: inv._id,
        party: inv.rName || "",
        note: inv.rDesc || "",
        productId: p._id ? String(p._id) : "",
        product: p.label || "Unknown product",
        category: p.category || "",
        qty,
        unitPrice,
        total,
        unitCost,
        cost,
        profit: type === "sale" ? total - cost : 0,
      });
    });
  });
  return lines;
};

// Customer returns become negative sale lines on the return date, so sales, cost,
// profit, per-product figures and stock movement all net them out.
const returnLines = (returns) => {
  const lines = [];
  (returns ?? []).forEach((r) => {
    const date = new Date(r.date);
    (r.items ?? []).forEach((item) => {
      const p = item?.product ?? {};
      const qty = num(item?.qty);
      const unitCost = num(p.costPrice);
      const amount = num(item?.amount) || num(item?.unitPrice) * qty;
      lines.push({
        date,
        invoiceId: null,
        isReturn: true,
        party: `Return${r.rName ? ` – ${r.rName}` : ""}`,
        note: r.reason || "",
        productId: p._id ? String(p._id) : "",
        product: p.label || "Unknown product",
        category: p.category || "",
        qty: -qty,
        unitPrice: num(item?.unitPrice),
        total: -amount,
        unitCost,
        cost: -unitCost * qty,
        profit: -(amount - unitCost * qty),
      });
    });
  });
  return lines;
};

const productKey = (line) => line.productId || `label:${line.product}`;

// ---------- report ----------

export const buildClosingReport = (raw, { from, to, groupBy }) => {
  const inRange = (l) => l.date >= from && l.date <= to;
  const afterRange = (l) => l.date > to;

  const allSales = toLines(raw?.sales, "sale").concat(returnLines(raw?.returns));
  const allPurchases = toLines(raw?.purchases, "purchase");
  const sales = allSales.filter(inRange);
  const purchases = allPurchases.filter(inRange);

  const invoiceCount = (lines) =>
    new Set(lines.filter((l) => !l.isReturn).map((l) => l.invoiceId)).size;
  const sum = (lines, field) => lines.reduce((s, l) => s + l[field], 0);
  const returnedLines = sales.filter((l) => l.isReturn);

  const totalSales = sum(sales, "total"); // net of returns
  const cogs = sum(sales, "cost");
  const totalPurchases = sum(purchases, "total");
  const grossProfit = totalSales - cogs;
  const saleInvoices = invoiceCount(sales);

  // Period breakdown, including empty periods so the timeline has no gaps.
  const periods = new Map();
  for (
    let start = periodOf(from, groupBy).start;
    start <= to;
    start = nextPeriodStart(start, groupBy)
  ) {
    const p = periodOf(start, groupBy);
    periods.set(p.key, {
      ...p,
      sales: 0,
      cogs: 0,
      purchases: 0,
      saleInvoices: new Set(),
    });
  }
  sales.forEach((l) => {
    const row = periods.get(periodOf(l.date, groupBy).key);
    if (!row) return;
    row.sales += l.total;
    row.cogs += l.cost;
    row.saleInvoices.add(l.invoiceId);
  });
  purchases.forEach((l) => {
    const row = periods.get(periodOf(l.date, groupBy).key);
    if (row) row.purchases += l.total;
  });
  const breakdown = [...periods.values()].map((r) => ({
    key: r.key,
    label: r.label,
    start: r.start,
    sales: r.sales,
    purchases: r.purchases,
    cogs: r.cogs,
    profit: r.sales - r.cogs,
    margin: percent(r.sales - r.cogs, r.sales),
    netCash: r.sales - r.purchases,
    saleInvoices: r.saleInvoices.size,
  }));

  // Per-product profit for the period.
  const products = new Map();
  const productRow = (l) => {
    const key = productKey(l);
    if (!products.has(key)) {
      products.set(key, {
        key,
        product: l.product,
        category: l.category,
        unitsSold: 0,
        sales: 0,
        cogs: 0,
        unitsBought: 0,
        purchaseCost: 0,
      });
    }
    return products.get(key);
  };
  sales.forEach((l) => {
    const r = productRow(l);
    r.unitsSold += l.qty;
    r.sales += l.total;
    r.cogs += l.cost;
  });
  purchases.forEach((l) => {
    const r = productRow(l);
    r.unitsBought += l.qty;
    r.purchaseCost += l.total;
  });
  const productRows = [...products.values()]
    .map((r) => ({
      ...r,
      profit: r.sales - r.cogs,
      margin: percent(r.sales - r.cogs, r.sales),
      share: percent(r.sales, totalSales),
    }))
    .sort((a, b) => b.profit - a.profit);

  // Stock movement: work back from today's quantity using invoices after the period.
  const qtyBy = (lines) => {
    const m = new Map();
    lines.forEach((l) => m.set(l.productId, (m.get(l.productId) ?? 0) + l.qty));
    return m;
  };
  const soldIn = qtyBy(sales);
  const boughtIn = qtyBy(purchases);
  const soldAfter = qtyBy(allSales.filter(afterRange));
  const boughtAfter = qtyBy(allPurchases.filter(afterRange));
  const stock = (raw?.inventory ?? [])
    .map((item) => {
      const id = String(item._id);
      const closing =
        num(item.qty) + (soldAfter.get(id) ?? 0) - (boughtAfter.get(id) ?? 0);
      const bought = boughtIn.get(id) ?? 0;
      const sold = soldIn.get(id) ?? 0;
      const opening = closing - bought + sold;
      const costPrice = num(item.costPrice);
      return {
        product: item.label || "Unknown product",
        category: item.category || "",
        opening,
        bought,
        sold,
        closing,
        currentQty: num(item.qty),
        costPrice,
        sellingPrice: num(item.sellingPrice),
        openingValue: opening * costPrice,
        closingValue: closing * costPrice,
      };
    })
    .sort((a, b) => a.product.localeCompare(b.product));

  const byDate = (a, b) => a.date - b.date;

  return {
    shop: raw?.shop ?? {},
    from,
    to,
    groupBy,
    generatedAt: new Date(),
    summary: {
      totalSales,
      totalPurchases,
      cogs,
      grossProfit,
      margin: percent(grossProfit, totalSales),
      markup: percent(grossProfit, cogs),
      netCash: totalSales - totalPurchases,
      saleInvoices,
      returns: -sum(returnedLines, "total"),
      returnedUnits: -sum(returnedLines, "qty"),
      purchaseInvoices: invoiceCount(purchases),
      unitsSold: sum(sales, "qty"),
      unitsBought: sum(purchases, "qty"),
      avgSale: saleInvoices ? totalSales / saleInvoices : 0,
      openingStockValue: stock.reduce((s, r) => s + r.openingValue, 0),
      closingStockValue: stock.reduce((s, r) => s + r.closingValue, 0),
      bestPeriod: breakdown.reduce(
        (best, r) => (r.sales > (best?.sales ?? 0) ? r : best),
        null
      ),
      topProduct: productRows[0]?.profit > 0 ? productRows[0] : null,
    },
    breakdown,
    sales: sales.sort(byDate),
    purchases: purchases.sort(byDate),
    products: productRows,
    stock,
  };
};

// ---------- date range presets ----------

export const PRESETS = [
  { value: "thisMonth", label: "This month" },
  { value: "lastMonth", label: "Last month" },
  { value: "last3", label: "Last 3 months" },
  { value: "last6", label: "Last 6 months" },
  { value: "h1", label: "Jan – Jun (6-month closing)" },
  { value: "h2", label: "Jul – Dec (6-month closing)" },
  { value: "thisYear", label: "This year" },
  { value: "lastYear", label: "Last year" },
  { value: "custom", label: "Custom dates" },
];

// "Last N months" = the current month plus the N-1 months before it.
export const presetRange = (preset, year, today = new Date()) => {
  const y = today.getFullYear();
  const m = today.getMonth();
  const month = (yy, mm) => new Date(yy, mm, 1);
  const monthEnd = (yy, mm) => endOfDay(new Date(yy, mm + 1, 0));
  switch (preset) {
    case "thisMonth":
      return [month(y, m), endOfDay(today)];
    case "lastMonth":
      return [month(y, m - 1), monthEnd(y, m - 1)];
    case "last3":
      return [month(y, m - 2), endOfDay(today)];
    case "last6":
      return [month(y, m - 5), endOfDay(today)];
    case "h1":
      return [month(year, 0), monthEnd(year, 5)];
    case "h2":
      return [month(year, 6), monthEnd(year, 11)];
    case "thisYear":
      return [month(y, 0), endOfDay(today)];
    case "lastYear":
      return [month(y - 1, 0), monthEnd(y - 1, 11)];
    default:
      return null;
  }
};
