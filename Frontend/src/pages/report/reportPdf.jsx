import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { formatDay, money, pct } from "../../helpers/closingReport";

const BRAND = "#2c698d";

const styles = StyleSheet.create({
  page: { padding: 28, fontSize: 8.5, fontFamily: "Helvetica", color: "#272643" },
  title: { fontSize: 18, color: BRAND, fontFamily: "Helvetica-Bold" },
  muted: { color: "#666666", marginTop: 2 },
  h2: { fontSize: 12, color: BRAND, fontFamily: "Helvetica-Bold", marginTop: 16, marginBottom: 6 },
  cards: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
  card: {
    width: "31.5%",
    marginRight: "1.8%",
    marginBottom: 6,
    padding: 7,
    backgroundColor: "#e3f6f5",
    borderLeft: `3pt solid ${BRAND}`,
  },
  cardLabel: { color: "#555555", fontSize: 7.5 },
  cardValue: { fontSize: 12, fontFamily: "Helvetica-Bold", marginTop: 2 },
  row: { flexDirection: "row", borderBottom: "0.5pt solid #d6e4ec" },
  head: { flexDirection: "row", backgroundColor: BRAND, color: "#ffffff", fontFamily: "Helvetica-Bold" },
  total: { flexDirection: "row", backgroundColor: "#e3f6f5", fontFamily: "Helvetica-Bold" },
  cell: { padding: 4, flex: 1 },
  num: { padding: 4, flex: 1, textAlign: "right" },
  footer: { position: "absolute", bottom: 14, left: 28, right: 28, color: "#999999", fontSize: 7, flexDirection: "row", justifyContent: "space-between" },
});

// columns: [{ title, get, num, flex }]
const Table = ({ columns, rows, totals }) => (
  <View>
    <View style={styles.head} fixed>
      {columns.map((c) => (
        <Text key={c.title} style={[c.num ? styles.num : styles.cell, { flex: c.flex ?? 1 }]}>
          {c.title}
        </Text>
      ))}
    </View>
    {rows.map((r, i) => (
      <View key={i} style={[styles.row, i % 2 ? { backgroundColor: "#f7fbfb" } : {}]} wrap={false}>
        {columns.map((c) => (
          <Text key={c.title} style={[c.num ? styles.num : styles.cell, { flex: c.flex ?? 1 }]}>
            {c.get(r)}
          </Text>
        ))}
      </View>
    ))}
    {totals && (
      <View style={styles.total} wrap={false}>
        {columns.map((c, i) => (
          <Text key={c.title} style={[c.num ? styles.num : styles.cell, { flex: c.flex ?? 1 }]}>
            {i === 0 ? "Total" : totals[c.title] ?? ""}
          </Text>
        ))}
      </View>
    )}
  </View>
);

const ReportPdf = ({ report }) => {
  const s = report.summary;
  const shop = report.shop?.shopName || "POS System";
  const cards = [
    ["Total Sales", money(s.totalSales)],
    ["Cost of Goods Sold", money(s.cogs)],
    ["Gross Profit", money(s.grossProfit)],
    ["Profit Margin", pct(s.margin)],
    ["Total Purchases", money(s.totalPurchases)],
    ["Net Cash (Sales - Purchases)", money(s.netCash)],
    ["Sale Invoices", String(s.saleInvoices)],
    ["Units Sold", String(s.unitsSold)],
    ["Closing Stock Value", money(s.closingStockValue)],
  ];
  return (
    <Document title={`Sales Closing ${formatDay(report.from)} - ${formatDay(report.to)}`} author={shop}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Sales Closing Report</Text>
        <Text style={{ fontSize: 11, marginTop: 4 }}>{shop}</Text>
        <Text style={styles.muted}>
          Period: {formatDay(report.from)} to {formatDay(report.to)} · Generated{" "}
          {report.generatedAt.toLocaleString()}
        </Text>

        <View style={styles.cards}>
          {cards.map(([label, value]) => (
            <View key={label} style={styles.card}>
              <Text style={styles.cardLabel}>{label}</Text>
              <Text style={styles.cardValue}>{value}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.h2}>
          {{ day: "Daily", week: "Weekly", month: "Monthly" }[report.groupBy]} breakdown
        </Text>
        <Table
          columns={[
            { title: "Period", get: (r) => r.label, flex: 1.8 },
            { title: "Sales", get: (r) => money(r.sales), num: true },
            { title: "Cost", get: (r) => money(r.cogs), num: true },
            { title: "Profit", get: (r) => money(r.profit), num: true },
            { title: "Margin", get: (r) => pct(r.margin), num: true, flex: 0.7 },
            { title: "Purchases", get: (r) => money(r.purchases), num: true },
          ]}
          rows={report.breakdown}
          totals={{
            Sales: money(s.totalSales),
            Cost: money(s.cogs),
            Profit: money(s.grossProfit),
            Margin: pct(s.margin),
            Purchases: money(s.totalPurchases),
          }}
        />

        <Text style={styles.h2}>Profit by product</Text>
        <Table
          columns={[
            { title: "Product", get: (r) => r.product, flex: 2 },
            { title: "Units", get: (r) => String(r.unitsSold), num: true, flex: 0.6 },
            { title: "Sales", get: (r) => money(r.sales), num: true },
            { title: "Cost", get: (r) => money(r.cogs), num: true },
            { title: "Profit", get: (r) => money(r.profit), num: true },
            { title: "Margin", get: (r) => pct(r.margin), num: true, flex: 0.7 },
          ]}
          rows={report.products.filter((r) => r.unitsSold > 0)}
        />

        <Text style={styles.h2} break={report.sales.length > 25}>
          Sales (date-wise)
        </Text>
        <Table
          columns={[
            { title: "Date", get: (r) => formatDay(r.date), flex: 1.1 },
            { title: "Customer", get: (r) => r.party, flex: 1.2 },
            { title: "Product", get: (r) => r.product, flex: 1.8 },
            { title: "Qty", get: (r) => String(r.qty), num: true, flex: 0.5 },
            { title: "Sale", get: (r) => money(r.total), num: true },
            { title: "Cost", get: (r) => money(r.cost), num: true },
            { title: "Profit", get: (r) => money(r.profit), num: true },
          ]}
          rows={report.sales}
          totals={{
            Qty: String(s.unitsSold),
            Sale: money(s.totalSales),
            Cost: money(s.cogs),
            Profit: money(s.grossProfit),
          }}
        />

        <View style={styles.footer} fixed>
          <Text>{shop} · Sales Closing Report</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
};

export default ReportPdf;
