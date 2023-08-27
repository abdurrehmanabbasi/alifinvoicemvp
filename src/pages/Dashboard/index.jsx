import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import LineChart from "./LineChart";
import { useState } from "react";

Chart.register(CategoryScale);

function Dashboard() {
  const [lastInvocies, setLastInvoice] = useState([
    { id: "12skksdja", name: "Abdullah", amount: 26, type: "sales" },
    { id: "12skksdja", name: "Ab Rehman", amount: 18, type: "sales" },
    { id: "12skksdja", name: "MBM", amount: 22, type: "expense" },
    { id: "12skksdja", name: "Mubeen", amount: 20, type: "sales" },
    { id: "12skksdja", name: "KT traders", amount: 100, type: "expense" },
    { id: "12skksdja", name: "Hyder Ali", amount: 18, type: "sales" },
    { id: "12skksdja", name: "Bilal", amount: 21, type: "sales" },
    { id: "12skksdja", name: "HT Trader", amount: 42, type: "expense" },
    { id: "12skksdja", name: "Furqan", amount: 37, type: "sales" },
    { id: "12skksdja", name: "Ibad Ali", amount: 48, type: "sales" },
  ]);

  return (
    <div className="w-full h-screen p-4">
      <h2 className="text-3xl">Dashboard</h2>
      <h3 className="mt-5 mb-2 text-xl font-bold">Sales Overview</h3>
      <hr className="mt-3 mb-3" />
      <div className="flex flex-col gap-4 p-2 md:flex-row ">
        <div className="rounded-md bg-green-400 text-white flex flex-col items-center justify-evenly max-w-sm md:w-1/5 py-20 w-full h-16 shadow-lg">
          <span className="text-2xl font-bold">$20020</span>
          <span className="text-sm">Total Sales</span>
        </div>
        <div className="rounded-md bg-blue-400 text-white flex flex-col items-center justify-evenly max-w-sm md:w-1/5 py-20 w-full h-16 shadow-lg">
          <span className="text-2xl font-bold">$6020</span>
          <span className="text-sm">Monthly Sales</span>
        </div>
        <div className="rounded-md bg-red-400 text-white flex flex-col items-center justify-evenly max-w-sm md:w-1/5 py-20 w-full h-16 shadow-lg">
          <span className="text-2xl font-bold">$3020</span>
          <span className="text-sm">Expense</span>
        </div>
        <div className="rounded-md bg-cyan-400 text-white flex flex-col items-center justify-evenly max-w-sm md:w-1/5 py-20 w-full h-16 shadow-lg">
          <span className="text-2xl font-bold">23</span>
          <span className="text-sm">No of Customers</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row mt-16 justify-start gap-x-10 w-full">
        <div className="max-w-sm w-full md:max-w-xl">
          <LineChart
            chartData={{
              labels: [
                "Jan, Feb",
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
              ],
              datasets: [
                {
                  fill: false,
                  borderColor: "green",
                  id: 1,
                  label: "Sales",
                  data: [
                    1800, 1600, 1500, 1800, 2100, 2200, 3030, 1800, 2100, 2200,
                    3030, 3021,
                  ],
                },
                {
                  fill: false,
                  borderColor: "red",
                  id: 1,
                  label: "Expense",
                  data: [
                    280, 660, 450, 180, 910, 620, 903, 280, 710, 420, 503, 602,
                  ],
                },
              ],
            }}
          />
        </div>
        <div className="max-w-sm w-full md:max-w-xl">
          <h2 className="font-bold text-2xl">Recent Invoices</h2>
          
          <div className="text-md">
            {lastInvocies.length > 0 &&
              lastInvocies.map((invoice, i) => (
                <div key={i} className="flex border-b-2 border-t-2 justify-around">
                  <span>{invoice?.type=="sales"?<ArrowUpIcon className="w-4 text-green-500"/>:<ArrowDownIcon className="w-4 text-red-500"/>}</span>
                  <span>{invoice?.id}</span>
                  <span>{invoice?.name}</span>
                  <span>{invoice?.amount}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
