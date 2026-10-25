import "./dashboard.css";
import { useState } from "react";
import LoaderLayout from "../../components/loaders/loaderLayout";
import GeneralLoader from "../../components/loaders/generalLoader";
import MySelect from "../../components/select/select";
import DashboardCard from "../../components/dashboardCard/dashboardCard";
import { BarChart } from "./barChart";
import { useQuery } from "@tanstack/react-query";
import { faCartShopping, faTruck, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import {
  fetchMonthStates,
  fetchDashboardData,
  fetchYears,
} from "../../functions/dashboard";

const MONTHS = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const money = (n) =>
  Number(n || 0).toLocaleString("en-US", { maximumFractionDigits: 2 });
// % change from `prev` to `curr`; null when there is no previous figure to compare with
const change = (curr, prev) => (prev ? ((curr - prev) / Math.abs(prev)) * 100 : null);
const totals = (res) => {
  const d = res?.data?.data;
  const sales = d?.sales?.[0]?.sum ?? 0;
  const purchases = d?.cost?.[0]?.sum ?? 0;
  return { sales, purchases, net: sales - purchases };
};

const Dashboard = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [barChartYear, setBarChartYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(MONTHS[date.getMonth() + 1]);

  const monthIdx = MONTHS.indexOf(month);
  const prevMonthIdx = monthIdx === 1 ? 12 : monthIdx - 1;
  const prevYear = monthIdx === 1 ? Number(year) - 1 : year;

  const monthStates = useQuery(["fetchMonthlyStates", monthIdx, year], fetchMonthStates);
  const prevMonthStates = useQuery(
    ["fetchMonthlyStates", prevMonthIdx, prevYear],
    fetchMonthStates
  );
  const years = useQuery(["years"], fetchYears);
  const { data, isLoading } = useQuery({
    queryKey: ["dashboardData", barChartYear],
    queryFn: fetchDashboardData,
  });

  if (isLoading || monthStates.isLoading) {
    return (
      <LoaderLayout>
        <GeneralLoader />
      </LoaderLayout>
    );
  }

  let newMonths = [];
  let firstYear = years?.data?.data?.arr[0];
  if (Number(year) === firstYear) {
    if (years?.data?.data?.arr.length === 1) {
      for (let i = years?.data?.data?.month; i <= date.getMonth() + 1; i++) {
        newMonths.push(MONTHS[i]);
      }
    } else {
      for (let i = years?.data?.data?.month; i <= 12; i++) {
        newMonths.push(MONTHS[i]);
      }
    }
  } else {
    newMonths = MONTHS.slice(1);
  }

  const now = totals(monthStates);
  const prev = totals(prevMonthStates);
  const compareHint = `vs ${MONTHS[prevMonthIdx]} ${prevYear}`;
  const sales = data?.data?.sales ?? [];
  const expense = data?.data?.expense ?? [];
  const chartEmpty =
    !sales.some((r) => Number(r.totalSum)) && !expense.some((r) => Number(r.totalSum));
  const yearSales = sales.reduce((s, r) => s + (Number(r.totalSum) || 0), 0);
  const yearPurchases = expense.reduce((s, r) => s + (Number(r.totalSum) || 0), 0);

  return (
    <section className="d_main min-h">
      <div className="d_head">
        <div>
          <h1 className="x-font text-dgreen m-0">Dashboard</h1>
          <p className="d_sub">
            Overview for {month} {year}
          </p>
        </div>
        <div className="d-flex">
          <MySelect
            name="year"
            setter={setYear}
            values={years?.data?.data?.arr}
            curr={year}
          />
          <MySelect
            name="month"
            setter={setMonth}
            values={newMonths}
            curr={month}
          />
        </div>
      </div>

      <div className="d_cards">
        <DashboardCard
          label="Sales"
          value={money(now.sales)}
          icon={faCartShopping}
          tone="sales"
          change={change(now.sales, prev.sales)}
          hint={compareHint}
        />
        <DashboardCard
          label="Purchases"
          value={money(now.purchases)}
          icon={faTruck}
          tone="purchases"
          change={change(now.purchases, prev.purchases)}
          goodWhenUp={false}
          hint={compareHint}
        />
        <DashboardCard
          label="Net (Sales − Purchases)"
          value={money(now.net)}
          icon={faScaleBalanced}
          tone={now.net < 0 ? "neg" : "pos"}
          change={change(now.net, prev.net)}
          hint={compareHint}
        />
      </div>

      <div className="d_panel">
        <div className="d_panel_head">
          <div>
            <h2 className="d_panel_title">Sales vs Purchases</h2>
            <p className="d_sub">
              {barChartYear}: sales {money(yearSales)} · purchases {money(yearPurchases)}
            </p>
          </div>
          <MySelect
            name="year"
            setter={setBarChartYear}
            values={years?.data?.data?.arr}
            curr={barChartYear}
          />
        </div>
        <div className="d_chart">
          <BarChart sales={sales} expense={expense} />
          {chartEmpty && (
            <div className="d_empty">No sales or purchases recorded in {barChartYear} yet.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
