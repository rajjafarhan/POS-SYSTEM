import "./report.css";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faFilePdf,
  faFileCsv,
  faArrowDownWideShort,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import LoaderLayout from "../../components/loaders/loaderLayout";
import GeneralLoader from "../../components/loaders/generalLoader";
import { fetchClosingReport } from "../../functions/report";
import {
  PRESETS,
  presetRange,
  autoGroupBy,
  buildClosingReport,
  startOfDay,
  endOfDay,
  formatDay,
  money,
  pct,
} from "../../helpers/closingReport";
import { downloadExcel, downloadPdf, downloadCsv } from "../../helpers/exportReport";

const ROW_LIMIT = 200;

const Dropdown = ({ label, value, onChange, options }) => (
  <FormControl size="small" sx={{ minWidth: 170 }}>
    <InputLabel>{label}</InputLabel>
    <Select value={value} label={label} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <MenuItem key={o.value} value={o.value}>
          {o.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const Stat = ({ label, value, hint, tone }) => (
  <div className={`r_stat ${tone ?? ""}`}>
    <p className="r_stat_label">{label}</p>
    <p className="r_stat_value">{value}</p>
    {hint && <p className="r_stat_hint">{hint}</p>}
  </div>
);

const signTone = (n) => (n < 0 ? "r_neg" : "");

const ReportPage = () => {
  const today = new Date();
  const [preset, setPreset] = useState("thisMonth");
  const [halfYear, setHalfYear] = useState(today.getFullYear());
  const [customFrom, setCustomFrom] = useState(dayjs().startOf("month"));
  const [customTo, setCustomTo] = useState(dayjs());
  const [groupChoice, setGroupChoice] = useState("auto");
  const [newestFirst, setNewestFirst] = useState(false);
  const [hideEmpty, setHideEmpty] = useState(true);
  const [busy, setBusy] = useState("");

  const [from, to] = useMemo(() => {
    if (preset === "custom") {
      return [
        startOfDay(customFrom?.toDate() ?? today),
        endOfDay(customTo?.toDate() ?? today),
      ];
    }
    return presetRange(preset, Number(halfYear));
  }, [preset, halfYear, customFrom, customTo]);

  const validRange = from <= to;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["closingReport", from.toISOString(), to.toISOString()],
    queryFn: fetchClosingReport,
    enabled: validRange,
    // fresh numbers each time the page is opened, but no refetch on every window focus
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const groupBy = groupChoice === "auto" ? autoGroupBy(from, to) : groupChoice;
  const report = useMemo(
    () => (data?.data ? buildClosingReport(data.data, { from, to, groupBy }) : null),
    [data, from, to, groupBy]
  );

  const download = async (kind) => {
    if (!report) return;
    setBusy(kind);
    try {
      if (kind === "excel") await downloadExcel(report);
      if (kind === "pdf") await downloadPdf(report);
      if (kind === "csv") downloadCsv(report);
      toast.success("Report downloaded!");
    } catch (e) {
      console.log(e);
      toast.error("Ops error! Report could not be downloaded");
    }
    setBusy("");
  };

  const s = report?.summary;
  const salesRows = report
    ? (newestFirst ? [...report.sales].reverse() : report.sales).slice(0, ROW_LIMIT)
    : [];
  const maxSales = Math.max(1, ...(report?.breakdown ?? []).map((r) => r.sales));
  const breakdownRows = (report?.breakdown ?? []).filter(
    (r) => !hideEmpty || r.sales || r.purchases
  );
  const years = [];
  for (let y = today.getFullYear(); y >= today.getFullYear() - 5; y--) {
    years.push({ value: y, label: String(y) });
  }

  return (
    <section className="d_main r_main">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 my-3">
        <div>
          <h1 className="x-font text-dgreen m-0">Sales Closing</h1>
          <p className="r_muted m-0">
            {formatDay(from)} to {formatDay(to)}
          </p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn r_btn r_excel"
            disabled={!report || !!busy}
            onClick={() => download("excel")}
          >
            <FontAwesomeIcon icon={faFileExcel} />{" "}
            {busy === "excel" ? "Preparing..." : "Download Excel"}
          </button>
          <button
            className="btn r_btn r_pdf"
            disabled={!report || !!busy}
            onClick={() => download("pdf")}
          >
            <FontAwesomeIcon icon={faFilePdf} />{" "}
            {busy === "pdf" ? "Preparing..." : "Download PDF"}
          </button>
          <button
            className="btn r_btn r_csv"
            disabled={!report || !!busy}
            onClick={() => download("csv")}
          >
            <FontAwesomeIcon icon={faFileCsv} /> CSV
          </button>
        </div>
      </div>

      <div className="r_filters d-flex flex-wrap align-items-center gap-3 p-3 mb-4">
        <Dropdown label="Period" value={preset} onChange={setPreset} options={PRESETS} />
        {(preset === "h1" || preset === "h2") && (
          <Dropdown label="Year" value={halfYear} onChange={setHalfYear} options={years} />
        )}
        {preset === "custom" && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From"
              value={customFrom}
              onChange={setCustomFrom}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="To"
              value={customTo}
              onChange={setCustomTo}
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>
        )}
        <Dropdown
          label="Breakdown"
          value={groupChoice}
          onChange={setGroupChoice}
          options={[
            { value: "auto", label: "Automatic" },
            { value: "day", label: "Daily" },
            { value: "week", label: "Weekly" },
            { value: "month", label: "Monthly" },
          ]}
        />
        {!validRange && <span className="text-danger fw-bold">"From" must be before "To"</span>}
      </div>

      {isLoading && validRange && (
        <LoaderLayout>
          <GeneralLoader />
        </LoaderLayout>
      )}
      {isError && (
        <p className="text-danger fw-bold fs-5 text-center my-5">
          Ops error! The report could not be loaded.
        </p>
      )}

      {report && (
        <>
          <div className="r_stats mb-4">
            <Stat label="Total Sales" value={money(s.totalSales)} hint={`${s.saleInvoices} sale invoices`} />
            <Stat label="Cost of Goods Sold" value={money(s.cogs)} hint="Cost price of items sold" />
            <Stat
              label="Gross Profit"
              value={money(s.grossProfit)}
              hint="Sales − cost of goods sold"
              tone={s.grossProfit < 0 ? "r_neg" : "r_pos"}
            />
            <Stat
              label="Profit Margin"
              value={pct(s.margin)}
              hint={`Markup ${pct(s.markup)} on cost`}
              tone={s.margin < 0 ? "r_neg" : "r_pos"}
            />
            <Stat label="Total Purchases" value={money(s.totalPurchases)} hint={`${s.purchaseInvoices} vendor invoices`} />
            <Stat
              label="Net Cash"
              value={money(s.netCash)}
              hint="Sales − purchases"
              tone={signTone(s.netCash)}
            />
            <Stat label="Units Sold" value={s.unitsSold.toLocaleString()} hint={`Avg sale ${money(s.avgSale)}`} />
            <Stat
              label="Closing Stock Value"
              value={money(s.closingStockValue)}
              hint={`Opening ${money(s.openingStockValue)}`}
            />
          </div>

          {(s.bestPeriod?.sales > 0 || s.topProduct) && (
            <div className="r_insights mb-4">
              {s.bestPeriod?.sales > 0 && (
                <span>
                  Best period: <b>{s.bestPeriod.label}</b> ({money(s.bestPeriod.sales)} sales)
                </span>
              )}
              {s.topProduct && (
                <span>
                  Most profitable: <b>{s.topProduct.product}</b> ({money(s.topProduct.profit)} profit,{" "}
                  {pct(s.topProduct.margin)} margin)
                </span>
              )}
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="text-dgreen m-0">
              {{ day: "Daily", week: "Weekly", month: "Monthly" }[groupBy]} breakdown
            </h3>
            <label className="r_muted d-flex align-items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hideEmpty}
                onChange={(e) => setHideEmpty(e.target.checked)}
              />
              Hide periods with no activity
            </label>
          </div>
          <div className="r_table_wrap mb-5">
            <table className="r_table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th className="r_n">Invoices</th>
                  <th className="r_n">Sales</th>
                  <th className="r_n">Cost</th>
                  <th className="r_n">Profit</th>
                  <th className="r_n">Margin %</th>
                  <th className="r_n">Purchases</th>
                  <th className="r_n">Net Cash</th>
                </tr>
              </thead>
              <tbody>
                {breakdownRows.map((r) => (
                  <tr key={r.key} className={r.sales || r.purchases ? "" : "r_empty"}>
                    <td>
                      {r.label}
                      <div className="r_bar" style={{ width: `${(r.sales / maxSales) * 100}%` }} />
                    </td>
                    <td className="r_n">{r.saleInvoices}</td>
                    <td className="r_n">{money(r.sales)}</td>
                    <td className="r_n">{money(r.cogs)}</td>
                    <td className={`r_n ${signTone(r.profit)}`}>{money(r.profit)}</td>
                    <td className={`r_n ${signTone(r.margin)}`}>{pct(r.margin)}</td>
                    <td className="r_n">{money(r.purchases)}</td>
                    <td className={`r_n ${signTone(r.netCash)}`}>{money(r.netCash)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td className="r_n">{s.saleInvoices}</td>
                  <td className="r_n">{money(s.totalSales)}</td>
                  <td className="r_n">{money(s.cogs)}</td>
                  <td className="r_n">{money(s.grossProfit)}</td>
                  <td className="r_n">{pct(s.margin)}</td>
                  <td className="r_n">{money(s.totalPurchases)}</td>
                  <td className="r_n">{money(s.netCash)}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <h3 className="text-dgreen mb-3">Profit by product</h3>
          <div className="r_table_wrap mb-5">
            <table className="r_table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th className="r_n">Units Sold</th>
                  <th className="r_n">Sales</th>
                  <th className="r_n">Cost</th>
                  <th className="r_n">Profit</th>
                  <th className="r_n">Margin %</th>
                  <th className="r_n">Share of Sales</th>
                  <th className="r_n">Units Bought</th>
                </tr>
              </thead>
              <tbody>
                {report.products.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center p-4 text-dgreen fw-bold">
                      No sales or purchases in this period
                    </td>
                  </tr>
                )}
                {report.products.map((r) => (
                  <tr key={r.key}>
                    <td>{r.product}</td>
                    <td>{r.category}</td>
                    <td className="r_n">{r.unitsSold}</td>
                    <td className="r_n">{money(r.sales)}</td>
                    <td className="r_n">{money(r.cogs)}</td>
                    <td className={`r_n ${signTone(r.profit)}`}>{money(r.profit)}</td>
                    <td className={`r_n ${signTone(r.margin)}`}>{pct(r.margin)}</td>
                    <td className="r_n">{pct(r.share)}</td>
                    <td className="r_n">{r.unitsBought}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="text-dgreen m-0">Sales (date-wise)</h3>
            <button className="btn r_btn r_sort" onClick={() => setNewestFirst(!newestFirst)}>
              <FontAwesomeIcon icon={newestFirst ? faArrowDownWideShort : faArrowUpWideShort} />{" "}
              {newestFirst ? "Newest first" : "Oldest first"}
            </button>
          </div>
          <div className="r_table_wrap mb-2">
            <table className="r_table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th className="r_n">Qty</th>
                  <th className="r_n">Price</th>
                  <th className="r_n">Sale</th>
                  <th className="r_n">Cost</th>
                  <th className="r_n">Profit</th>
                  <th className="r_n">Margin %</th>
                </tr>
              </thead>
              <tbody>
                {salesRows.length === 0 && (
                  <tr>
                    <td colSpan={9} className="text-center p-4 text-dgreen fw-bold">
                      No sales in this period
                    </td>
                  </tr>
                )}
                {salesRows.map((l, i) => (
                  <tr key={`${l.invoiceId}-${i}`}>
                    <td>{formatDay(l.date)}</td>
                    <td>{l.party}</td>
                    <td>{l.product}</td>
                    <td className="r_n">{l.qty}</td>
                    <td className="r_n">{money(l.unitPrice)}</td>
                    <td className="r_n">{money(l.total)}</td>
                    <td className="r_n">{money(l.cost)}</td>
                    <td className={`r_n ${signTone(l.profit)}`}>{money(l.profit)}</td>
                    <td className={`r_n ${signTone(l.profit)}`}>
                      {pct(l.total ? (l.profit / l.total) * 100 : 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {report.sales.length > ROW_LIMIT && (
            <p className="r_muted mb-5">
              Showing {ROW_LIMIT} of {report.sales.length} sale lines. The download has all of them.
            </p>
          )}
          <p className="r_muted mt-4 mb-5">
            The Excel file also has Purchases and Stock (opening → closing) sheets. Stock is estimated from
            today's quantities and the invoices, so manual stock edits are not included.
          </p>
        </>
      )}
    </section>
  );
};

export default ReportPage;
