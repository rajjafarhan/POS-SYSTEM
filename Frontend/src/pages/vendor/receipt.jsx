import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { useOutletContext } from "react-router-dom";

// 80mm thermal-printer receipt (227pt wide) for customer and vendor receipts.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const num = (v) => {
  const n = Number(v);
  return isFinite(n) ? n : 0;
};
const money = (n) => num(n).toLocaleString("en-US", { maximumFractionDigits: 2 });
const pad = (n) => String(n).padStart(2, "0");

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontFamily: "Helvetica",
    fontSize: 8,
    color: "#111111",
  },
  center: { textAlign: "center" },
  shop: { fontSize: 13, fontFamily: "Helvetica-Bold", textAlign: "center" },
  small: { fontSize: 7.5, textAlign: "center", color: "#333333", marginTop: 1 },
  title: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginTop: 6,
    paddingVertical: 2,
    borderTop: "1pt solid #111111",
    borderBottom: "1pt solid #111111",
    letterSpacing: 1,
  },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 2 },
  muted: { color: "#555555" },
  rule: { borderBottom: "0.75pt dashed #777777", marginVertical: 4 },
  head: { flexDirection: "row", fontFamily: "Helvetica-Bold", fontSize: 7.5 },
  row: { flexDirection: "row", marginTop: 3 },
  cItem: { flex: 1, paddingRight: 3 },
  cQty: { width: 22, textAlign: "right" },
  cRate: { width: 44, textAlign: "right" },
  cAmt: { width: 50, textAlign: "right" },
  note: { fontSize: 6.5, color: "#555555" },
  totRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 2 },
  grand: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
    paddingVertical: 3,
    borderTop: "1pt solid #111111",
    borderBottom: "1pt solid #111111",
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  bold: { fontFamily: "Helvetica-Bold" },
  thanks: { textAlign: "center", fontFamily: "Helvetica-Bold", fontSize: 9, marginTop: 8 },
});

const VendorReceipt = ({ data, type }) => {
  const [, , basicInfoData] = useOutletContext();
  const isVendor = type === "Vendor Receipt";
  const date = new Date(data?.date);
  const validDate = !isNaN(date.getTime());

  const items = (data?.product ?? []).map((prod) => {
    const qty = num(prod?.productQty);
    const list = num(isVendor ? prod?.product?.costPrice : prod?.product?.sellingPrice);
    let rate = list;
    if (!isVendor && prod?.unitPrice !== undefined && prod?.unitPrice !== "") rate = num(prod.unitPrice);
    else if (qty && num(prod?.totalPrice)) rate = num(prod.totalPrice) / qty;
    const amount = num(prod?.totalPrice) || rate * qty;
    return { name: prod?.product?.label ?? "Item", qty, list, rate, amount };
  });
  const listTotal = items.reduce((s, i) => s + i.list * i.qty, 0);
  const total = num(data?.total) || items.reduce((s, i) => s + i.amount, 0);
  const discount = isVendor ? 0 : listTotal - total;
  const units = items.reduce((s, i) => s + i.qty, 0);
  const hasCash = data?.cash !== undefined && data?.cash !== "" && data?.cash !== null;
  const cash = num(data?.cash);
  const receiptNo = data?._id ? String(data._id).slice(-6).toUpperCase() : null;

  // page height grows with the number of lines (long names wrap onto a second line)
  const itemLines = items.reduce((s, i) => s + Math.ceil(i.name.length / 20) + (i.rate < i.list ? 1 : 0), 0);
  const height = 215 + itemLines * 11 + (discount > 0 ? 24 : 0) + (data?.rDesc ? 12 : 0);

  return (
    <PDFViewer width={400} height={600}>
      <Document title={isVendor ? "Purchase Receipt" : "Sales Receipt"} author={basicInfoData?.shopName ?? "POS System"}>
        <Page size={[227, height]} style={styles.page}>
          <Text style={styles.shop}>{basicInfoData?.shopName || "POS System"}</Text>
          {basicInfoData?.shopAdd ? <Text style={styles.small}>{basicInfoData.shopAdd}</Text> : null}
          {basicInfoData?.contactNo ? <Text style={styles.small}>Phone: {basicInfoData.contactNo}</Text> : null}

          <Text style={styles.title}>{isVendor ? "PURCHASE RECEIPT" : "SALES RECEIPT"}</Text>

          <View style={styles.metaRow}>
            <Text>
              <Text style={styles.muted}>Date: </Text>
              {validDate
                ? `${pad(date.getDate())}-${MONTHS[date.getMonth()]}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`
                : "-"}
            </Text>
            {receiptNo ? (
              <Text>
                <Text style={styles.muted}>No: </Text>
                {receiptNo}
              </Text>
            ) : null}
          </View>
          {data?.rName ? (
            <Text style={{ marginTop: 2 }}>
              <Text style={styles.muted}>{isVendor ? "Vendor: " : "Customer: "}</Text>
              {data.rName}
            </Text>
          ) : null}
          {data?.rDesc ? (
            <Text style={{ marginTop: 2 }}>
              <Text style={styles.muted}>Note: </Text>
              {data.rDesc}
            </Text>
          ) : null}

          <View style={styles.rule} />
          <View style={styles.head}>
            <Text style={styles.cItem}>Item</Text>
            <Text style={styles.cQty}>Qty</Text>
            <Text style={styles.cRate}>Rate</Text>
            <Text style={styles.cAmt}>Amount</Text>
          </View>
          <View style={styles.rule} />

          {items.map((i, index) => (
            <View key={index} style={styles.row} wrap={false}>
              <View style={styles.cItem}>
                <Text>
                  {index + 1}. {i.name}
                </Text>
                {i.rate < i.list ? <Text style={styles.note}>List {money(i.list)}</Text> : null}
              </View>
              <Text style={styles.cQty}>{i.qty}</Text>
              <Text style={styles.cRate}>{money(i.rate)}</Text>
              <Text style={styles.cAmt}>{money(i.amount)}</Text>
            </View>
          ))}

          <View style={styles.rule} />
          <View style={styles.totRow}>
            <Text style={styles.muted}>
              Items: {items.length} · Units: {units}
            </Text>
          </View>
          {discount > 0 ? (
            <>
              <View style={styles.totRow}>
                <Text>Subtotal</Text>
                <Text>{money(listTotal)}</Text>
              </View>
              <View style={styles.totRow}>
                <Text>Discount</Text>
                <Text>- {money(discount)}</Text>
              </View>
            </>
          ) : null}
          <View style={styles.grand}>
            <Text>TOTAL</Text>
            <Text>Rs {money(total)}</Text>
          </View>
          {hasCash ? (
            <>
              <View style={styles.totRow}>
                <Text>Cash</Text>
                <Text>{money(cash)}</Text>
              </View>
              <View style={styles.totRow}>
                <Text style={styles.bold}>{cash >= total ? "Change" : "Balance due"}</Text>
                <Text style={styles.bold}>{money(Math.abs(cash - total))}</Text>
              </View>
            </>
          ) : null}

          <Text style={styles.thanks}>Thank you!</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default VendorReceipt;
