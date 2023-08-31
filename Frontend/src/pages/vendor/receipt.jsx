import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    flexGrow: 1,
  },
});

// Create Document Component
const VendorReceipt = () => {
  const l = "lol";
  return (
    <PDFViewer width={400} height={600}>
      <Document
        title="Receipt"
        author="Subhan Shop"
        subject="vendor receipt"
        language="English"
        producer="Dev Team"
        pageMode="useAttachments"
      >
        <Page
          bookmark="POS System"
          orientation="potrait"
          size={227}
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            margin: "0",
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
        >
          <View style={styles.section}>
            <Text
              style={{
                textAlign: "center",
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              Vendor Receipt
            </Text>
            <Text style={{ textAlign: "center", fontSize: "16px" }}>
              Subhan Bhai Shop
            </Text>
            <Text
              wrap={true}
              style={{
                textAlign: "center",
                fontSize: "12px",
                marginTop: "4px",
              }}
            >
              Address: North Karachi, L1, Karachi, Pakistan.
            </Text>
            <Text
              wrap={true}
              style={{
                textAlign: "center",
                fontSize: "12px",
                marginTop: "4px",
                marginBottom: "4px",
              }}
            >
              --------------------------------------------------
            </Text>
            <Text
              wrap={true}
              style={{
                textAlign: "center",
                fontSize: "12px",
                marginTop: "4px",
                marginBottom: "4px",
              }}
            >
              8-30-2023 01:50:21 Am
            </Text>
            <View
              wrap={true}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: "11px",
                marginTop: "4px",
                marginBottom: "0px",
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>QTY</Text>
                <Text style={{ marginLeft: "5px" }}> PRODUCT</Text>
              </View>
              <Text>AMT</Text>
            </View>

            <Text style={{ margin: "0", padding: "0", fontSize: "12px" }}>
              -----------------------------------------------------
            </Text>

            <View
              wrap={true}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: "12px",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>1</Text>
                <Text style={{ marginLeft: "15px", width: "181px" }}>
                  {" "}
                  Some product
                </Text>
              </View>
              <Text>200</Text>
            </View>
            <View
              wrap={true}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: "12px",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text>1</Text>
                <Text style={{ marginLeft: "15px", width: "181px" }}>
                  {" "}
                  Some Other Product
                </Text>
              </View>
              <Text>200</Text>
            </View>
            <Text style={{ margin: "0", padding: "0", fontSize: "12px" }}>
              -----------------------------------------------------
            </Text>
            <View
              wrap={true}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: "12px",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              <Text style={{ fontSize: "14px", fontWeight: "bold" }}>
                Total
              </Text>

              <Text style={{ fontSize: "14px", fontWeight: "bold" }}>400</Text>
            </View>
            <View
              wrap={true}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: "12px",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>Cash</Text>

              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>500</Text>
            </View>
            <View
              wrap={true}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                fontSize: "12px",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                Change
              </Text>

              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>100</Text>
            </View>
            <Text
              style={{
                textAlign: "center",
                fontSize: "14px",
                marginBottom: "12px",
                marginTop: "4px",
              }}
            >
              Thank You!
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default VendorReceipt;
