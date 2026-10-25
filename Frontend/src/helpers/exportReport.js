// Downloads for the sales closing report: Excel (styled, one sheet per section), CSV and PDF.
// exceljs and @react-pdf are loaded only when a download is clicked, to keep the page light.
import { createElement } from "react";
import { formatDay, dayKey } from "./closingReport";

const BRAND = "FF2C698D";
const LIGHT = "FFE3F6F5";
const MONEY = "#,##0.00";
const PCT = "0.0%";
const GROUP_TITLES = { day: "Daily", week: "Weekly", month: "Monthly" };

const shopTitle = (report) => report.shop?.shopName || "POS System";
const rangeText = (report) => `${formatDay(report.from)} to ${formatDay(report.to)}`;

export const reportFileName = (report, ext) => {
  const shop = shopTitle(report).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "");
  return `Sales-Closing_${shop}_${dayKey(report.from)}_to_${dayKey(report.to)}.${ext}`;
};

// Excel stores dates as UTC; keep the local calendar day so sales don't shift to the previous date.
const excelDate = (d) => new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

const saveBlob = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

// ---------------------------------- Excel ----------------------------------

// Adds a titled table to a sheet. columns: [{ header, key, width, fmt }], totals: { key: "sum" | value }.
const addTable = (ws, title, subtitle, columns, rows, totals) => {
  ws.columns = columns.map((c) => ({ key: c.key, width: c.width ?? 14 }));
  const titleRow = ws.addRow([title]);
  titleRow.font = { bold: true, size: 14, color: { argb: BRAND } };
  ws.addRow([subtitle]).font = { italic: true, color: { argb: "FF666666" } };
  ws.addRow([]);

  const header = ws.addRow(columns.map((c) => c.header));
  const headerIndex = header.number;
  header.eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };
    cell.alignment = { vertical: "middle", wrapText: true };
  });
  header.height = 30;

  rows.forEach((r) => ws.addRow(columns.map((c) => r[c.key])));
  const firstData = headerIndex + 1;
  const lastData = headerIndex + rows.length;

  if (totals && rows.length) {
    const totalRow = ws.addRow(
      columns.map((c, i) => {
        const t = totals[c.key];
        if (i === 0) return "Total";
        if (t === "sum") {
          const col = ws.getColumn(i + 1).letter;
          return {
            formula: `SUM(${col}${firstData}:${col}${lastData})`,
            result: rows.reduce((s, r) => s + (Number(r[c.key]) || 0), 0),
          };
        }
        if (typeof t === "function") return t(ws, firstData, lastData, rows);
        return t ?? null;
      })
    );
    totalRow.eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: LIGHT } };
      cell.border = { top: { style: "thin", color: { argb: BRAND } } };
    });
  }

  const lastRow = ws.lastRow.number;
  columns.forEach((c, i) => {
    if (!c.fmt) return;
    for (let r = firstData; r <= lastRow; r++) {
      ws.getRow(r).getCell(i + 1).numFmt = c.fmt;
    }
  });

  ws.views = [{ state: "frozen", ySplit: headerIndex }];
  if (rows.length) {
    ws.autoFilter = {
      from: { row: headerIndex, column: 1 },
      to: { row: lastData, column: columns.length },
    };
  }
};

// Margin of the totals row = total profit / total sales, kept live as a formula.
const marginFormula = (profitKey, salesKey, columns) => (ws, first, last, rows) => {
  const col = (key) => ws.getColumn(columns.findIndex((c) => c.key === key) + 1).letter;
  const p = col(profitKey);
  const s = col(salesKey);
  const total = (key) => rows.reduce((sum, r) => sum + (Number(r[key]) || 0), 0);
  const sales = total(salesKey);
  return {
    formula: `IF(SUM(${s}${first}:${s}${last})=0,0,SUM(${p}${first}:${p}${last})/SUM(${s}${first}:${s}${last}))`,
    result: sales ? total(profitKey) / sales : 0,
  };
};

export const downloadExcel = async (report) => {
  const { default: ExcelJS } = await import("exceljs");
  const wb = new ExcelJS.Workbook();
  wb.creator = "POS System";
  wb.created = new Date();
  wb.calcProperties.fullCalcOnLoad = true;
  const { summary: s } = report;
  const sub = `${shopTitle(report)} · ${rangeText(report)}`;

  // Summary
  const ws = wb.addWorksheet("Summary", { properties: { tabColor: { argb: BRAND } } });
  ws.columns = [{ width: 34 }, { width: 22 }, { width: 50 }];
  ws.addRow([`Sales Closing Report — ${shopTitle(report)}`]).font = {
    bold: true,
    size: 16,
    color: { argb: BRAND },
  };
  ws.addRow([`Period: ${rangeText(report)}`]).font = { bold: true };
  ws.addRow([`Generated: ${report.generatedAt.toLocaleString()}`]).font = {
    italic: true,
    color: { argb: "FF666666" },
  };
  if (report.shop?.shopAdd || report.shop?.contactNo) {
    ws.addRow([[report.shop?.shopAdd, report.shop?.contactNo].filter(Boolean).join(" · ")]);
  }
  ws.addRow([]);
  const head = ws.addRow(["Item", "Amount", "What it means"]);
  head.eachCell((c) => {
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND } };
  });
  const lines = [
    ["Total Sales", s.totalSales, MONEY, "Money from customer invoices in this period"],
    ["Cost of Goods Sold", s.cogs, MONEY, "Cost price of the items that were sold"],
    ["Gross Profit", s.grossProfit, MONEY, "Total Sales − Cost of Goods Sold"],
    ["Profit Margin %", s.margin / 100, PCT, "Gross Profit ÷ Total Sales"],
    ["Markup %", s.markup / 100, PCT, "Gross Profit ÷ Cost of Goods Sold"],
    ["Total Purchases", s.totalPurchases, MONEY, "Money spent on vendor invoices (stock bought)"],
    ["Net Cash (Sales − Purchases)", s.netCash, MONEY, "Cash in minus cash out for stock"],
    ["Sale Invoices", s.saleInvoices, "0", ""],
    ["Purchase Invoices", s.purchaseInvoices, "0", ""],
    ["Units Sold", s.unitsSold, "#,##0", ""],
    ["Units Bought", s.unitsBought, "#,##0", ""],
    ["Average Sale per Invoice", s.avgSale, MONEY, ""],
    ["Opening Stock Value (at cost)", s.openingStockValue, MONEY, "Estimated from current stock and invoices"],
    ["Closing Stock Value (at cost)", s.closingStockValue, MONEY, "Estimated from current stock and invoices"],
  ];
  lines.forEach(([label, value, fmt, note], i) => {
    const row = ws.addRow([label, value, note]);
    row.getCell(2).numFmt = fmt;
    row.getCell(3).font = { color: { argb: "FF666666" } };
    if (i % 2) {
      row.eachCell((c) => {
        c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: LIGHT } };
      });
    }
    if (label === "Gross Profit" || label === "Profit Margin %") row.getCell(2).font = { bold: true };
  });
  if (s.bestPeriod?.sales) ws.addRow(["Best period (by sales)", s.bestPeriod.label]);
  if (s.topProduct) ws.addRow(["Most profitable product", s.topProduct.product]);

  // Breakdown
  const bCols = [
    { header: GROUP_TITLES[report.groupBy] ?? "Period", key: "label", width: 28 },
    { header: "Sale Invoices", key: "saleInvoices", width: 12, fmt: "0" },
    { header: "Total Sales", key: "sales", fmt: MONEY },
    { header: "Cost of Goods Sold", key: "cogs", fmt: MONEY },
    { header: "Gross Profit", key: "profit", fmt: MONEY },
    { header: "Profit Margin %", key: "marginPct", fmt: PCT },
    { header: "Purchases", key: "purchases", fmt: MONEY },
    { header: "Net Cash", key: "netCash", fmt: MONEY },
  ];
  addTable(
    wb.addWorksheet(`${GROUP_TITLES[report.groupBy] ?? "Period"} Breakdown`),
    `${GROUP_TITLES[report.groupBy] ?? "Period"} breakdown`,
    sub,
    bCols,
    report.breakdown.map((r) => ({ ...r, marginPct: r.margin / 100 })),
    {
      saleInvoices: "sum",
      sales: "sum",
      cogs: "sum",
      profit: "sum",
      purchases: "sum",
      netCash: "sum",
      marginPct: marginFormula("profit", "sales", bCols),
    }
  );

  // Sales (date-wise)
  const sCols = [
    { header: "Date", key: "date", width: 13, fmt: "dd-mmm-yyyy" },
    { header: "Customer / Receipt", key: "party", width: 20 },
    { header: "Product", key: "product", width: 26 },
    { header: "Category", key: "category", width: 14 },
    { header: "Units Sold", key: "qty", width: 10, fmt: "#,##0" },
    { header: "Price per Unit", key: "unitPrice", fmt: MONEY },
    { header: "Total Sale", key: "total", fmt: MONEY },
    { header: "Cost per Unit", key: "unitCost", fmt: MONEY },
    { header: "Total Cost", key: "cost", fmt: MONEY },
    { header: "Profit", key: "profit", fmt: MONEY },
    { header: "Margin %", key: "marginPct", width: 10, fmt: PCT },
  ];
  addTable(
    wb.addWorksheet("Sales"),
    "Sales (date-wise)",
    `${sub} · use the filter arrows to sort by date, product or profit`,
    sCols,
    report.sales.map((l) => ({
      ...l,
      date: excelDate(l.date),
      marginPct: l.total ? l.profit / l.total : 0,
    })),
    {
      qty: "sum",
      total: "sum",
      cost: "sum",
      profit: "sum",
      marginPct: marginFormula("profit", "total", sCols),
    }
  );

  // Purchases (date-wise)
  addTable(
    wb.addWorksheet("Purchases"),
    "Purchases (date-wise)",
    sub,
    [
      { header: "Date", key: "date", width: 13, fmt: "dd-mmm-yyyy" },
      { header: "Vendor / Receipt", key: "party", width: 20 },
      { header: "Product", key: "product", width: 26 },
      { header: "Category", key: "category", width: 14 },
      { header: "Units Bought", key: "qty", width: 11, fmt: "#,##0" },
      { header: "Cost per Unit", key: "unitPrice", fmt: MONEY },
      { header: "Total Cost", key: "total", fmt: MONEY },
    ],
    report.purchases.map((l) => ({ ...l, date: excelDate(l.date) })),
    { qty: "sum", total: "sum" }
  );

  // Products
  const pCols = [
    { header: "Product", key: "product", width: 26 },
    { header: "Category", key: "category", width: 14 },
    { header: "Units Sold", key: "unitsSold", width: 10, fmt: "#,##0" },
    { header: "Total Sales", key: "sales", fmt: MONEY },
    { header: "Cost of Goods Sold", key: "cogs", fmt: MONEY },
    { header: "Gross Profit", key: "profit", fmt: MONEY },
    { header: "Profit Margin %", key: "marginPct", fmt: PCT },
    { header: "Share of Sales %", key: "sharePct", fmt: PCT },
    { header: "Units Bought", key: "unitsBought", width: 11, fmt: "#,##0" },
    { header: "Purchase Cost", key: "purchaseCost", fmt: MONEY },
  ];
  addTable(
    wb.addWorksheet("Products"),
    "Profit by product",
    sub,
    pCols,
    report.products.map((r) => ({ ...r, marginPct: r.margin / 100, sharePct: r.share / 100 })),
    {
      unitsSold: "sum",
      sales: "sum",
      cogs: "sum",
      profit: "sum",
      unitsBought: "sum",
      purchaseCost: "sum",
      marginPct: marginFormula("profit", "sales", pCols),
    }
  );

  // Stock movement
  addTable(
    wb.addWorksheet("Stock"),
    "Stock: opening → closing",
    `${sub} · estimated from today's stock and the invoices (manual stock edits are not tracked)`,
    [
      { header: "Product", key: "product", width: 26 },
      { header: "Category", key: "category", width: 14 },
      { header: "Opening Qty", key: "opening", width: 11, fmt: "#,##0" },
      { header: "Bought", key: "bought", width: 10, fmt: "#,##0" },
      { header: "Sold", key: "sold", width: 10, fmt: "#,##0" },
      { header: "Closing Qty", key: "closing", width: 11, fmt: "#,##0" },
      { header: "Cost Price", key: "costPrice", fmt: MONEY },
      { header: "Selling Price", key: "sellingPrice", fmt: MONEY },
      { header: "Opening Value", key: "openingValue", fmt: MONEY },
      { header: "Closing Value", key: "closingValue", fmt: MONEY },
    ],
    report.stock,
    { bought: "sum", sold: "sum", openingValue: "sum", closingValue: "sum" }
  );

  const buffer = await wb.xlsx.writeBuffer();
  saveBlob(
    new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    reportFileName(report, "xlsx")
  );
};

// ----------------------------------- CSV -----------------------------------

export const downloadCsv = (report) => {
  const esc = (v) => {
    const s = v instanceof Date ? formatDay(v) : String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const head = [
    "Date", "Customer", "Product", "Category", "Units Sold", "Price per Unit",
    "Total Sale", "Cost per Unit", "Total Cost", "Profit", "Margin %",
  ];
  const rows = report.sales.map((l) => [
    l.date, l.party, l.product, l.category, l.qty, l.unitPrice.toFixed(2),
    l.total.toFixed(2), l.unitCost.toFixed(2), l.cost.toFixed(2), l.profit.toFixed(2),
    (l.total ? (l.profit / l.total) * 100 : 0).toFixed(1),
  ]);
  const csv = [head, ...rows].map((r) => r.map(esc).join(",")).join("\r\n");
  // BOM so Excel opens the file as UTF-8
  saveBlob(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }), reportFileName(report, "csv"));
};

// ----------------------------------- PDF -----------------------------------

export const downloadPdf = async (report) => {
  const [{ pdf }, { default: ReportPdf }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("../pages/report/reportPdf"),
  ]);
  const blob = await pdf(createElement(ReportPdf, { report })).toBlob();
  saveBlob(blob, reportFileName(report, "pdf"));
};
