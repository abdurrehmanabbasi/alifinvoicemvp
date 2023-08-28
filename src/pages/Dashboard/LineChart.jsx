import { Line } from "react-chartjs-2";


function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 className="text-2xl font-bold">Monthly Sales and Expenses</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Monthly Sales Record Year 2022"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;