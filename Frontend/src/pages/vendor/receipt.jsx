import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { useOutletContext } from "react-router-dom";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  section: {
    flexGrow: 1,
  },
});

const VendorReceipt = ({ data, type }) => {
  const [, , basicInfoData] = useOutletContext();
  console.log(basicInfoData);
  const date = new Date(data?.date);
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
              {type}
            </Text>
            <Text style={{ textAlign: "center", fontSize: "16px" }}>
              {basicInfoData?.shopName}
            </Text>
            <Text
              wrap={true}
              style={{
                textAlign: "center",
                fontSize: "12px",
                marginTop: "4px",
              }}
            >
              Address: {basicInfoData?.shopAdd}
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
              {`${date?.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`}
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
                <Text>no</Text>
                <Text style={{ marginLeft: "5px", width: "89px" }}>
                  {" "}
                  PRODUCT
                </Text>
                <Text style={{ marginLeft: "17px" }}> Price</Text>
                <Text style={{ marginLeft: "5px" }}> Qty</Text>
              </View>
              <Text>AMT</Text>
            </View>

            <Text style={{ margin: "0", padding: "0", fontSize: "12px" }}>
              -----------------------------------------------------
            </Text>
            {data?.product?.map((prod, index) => {
              return (
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
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "10px",
                    }}
                  >
                    <Text>{index + 1}</Text>
                    <Text style={{ marginLeft: "15px", width: "100px" }}>
                      {" "}
                      {prod?.product?.label}
                    </Text>
                    <Text style={{ marginLeft: "25px", width: "40px" }}>
                      {" "}
                      {type === "Vendor Receipt"
                        ? prod?.product?.costPrice
                        : prod?.product?.sellingPrice}
                    </Text>
                    <Text style={{ marginLeft: "5px", width: "40px" }}>
                      {" "}
                      {prod?.productQty}
                    </Text>
                  </View>
                  <Text style={{ fontSize: "10px" }}>{prod?.totalPrice}</Text>
                </View>
              );
            })}

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

              <Text style={{ fontSize: "14px", fontWeight: "bold" }}>
                {data?.total}
              </Text>
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

              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                {data?.cash}
              </Text>
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

              <Text style={{ fontSize: "12px", fontWeight: "bold" }}>
                {data?.change}
              </Text>
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
