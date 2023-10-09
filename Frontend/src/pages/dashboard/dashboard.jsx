import "./dashboard.css";
import {useState} from "react";
import LoaderLayout from "../../components/loaders/loaderLayout";
import GeneralLoader from "../../components/loaders/generalLoader";
import MySelect from "../../components/select/select";
import DashboardCard from "../../components/dashboardCard/dashboardCard";
import {BarChart, Area} from "./barChart";
import {useQuery} from "@tanstack/react-query";
import {fetchMonthStates, fetchDashboardData, fetchYears} from "../../functions/dashboard";
import {refine} from "../../helpers/refine";

const Dashboard = () => {
    const date = new Date()
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
        "Dec"
    ]
    const [year, setYear] = useState(date.getFullYear())
    const [barChartYear, setBarChartYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(MONTHS[date.getMonth() + 1])

    const monthStates = useQuery(['fetchMonthlyStates', MONTHS.indexOf(month), year], fetchMonthStates)
    const years = useQuery(['years'], fetchYears)
    const {data, isLoading} = useQuery({
        queryKey: ['dashboardData', barChartYear],
        queryFn: fetchDashboardData,
    })

    console.log(monthStates, years ,data)
    if (isLoading  || monthStates.isLoading) {
        return (
            <LoaderLayout>
                <GeneralLoader />
            </LoaderLayout>
        )
    }

    let newMonths = []
    let firstYear = years?.data?.data?.arr[0]
    if (Number(year) === firstYear) {
        if (years?.data?.data?.arr.length === 1) {
            for (let i = years?.data?.data?.month; i <= date.getMonth() + 1; i++) {
                newMonths.push(MONTHS[i])
            }
        }
        else {
            for (let i = years?.data?.data?.month; i <= 12; i++) {
                newMonths.push(MONTHS[i])
            }

        }
    } else {
        newMonths = MONTHS
    }
    let refinedData = refine(data?.data)
    console.log(refinedData)
    return (
        <section className="d_main min-h">
            <div className="d-flex justify-content-between  align-items-center px-5">
                <h1 className="x-font text-dgreen">Dashboard</h1>
                <div>
                    <div className="d-flex ">


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
            </div>
            <div>
                <div className="container d-flex flex-wrap justify-content-">
                    <DashboardCard heading={"Profit"} data={monthStates?.data?.data?.profit ?? 0} theme={"c3"} />
                    <DashboardCard heading={"Sales"} data={monthStates?.data?.data?.sales[0]?.sum ?? 0} theme={"c2"} />
                    <DashboardCard heading={"Cost"} data={monthStates?.data?.data?.cost[0]?.sum ?? 0} theme={"c4"} />
                </div>
            </div>
            <h1 className="x-font text-dgreen text-center my-5">
                Sales Vs Expenses Bar Chart
            </h1>
            <div className="container d-flex justify-content-end p-0 m-0">

                <div className="w-12">


                    <MySelect
                        name="year"
                        setter={setBarChartYear}
                        values={years?.data?.data?.arr}
                        curr={barChartYear}
                    />
                </div>
            </div>

            <div className="mx-5 px-5 d-flex w-100vh flex-column">
                <BarChart barChartData={refinedData} MONTHS={MONTHS} />
            </div>
        </section>
    );
};

export default Dashboard;
