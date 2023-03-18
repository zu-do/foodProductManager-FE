import React, { useState } from "react";
import "primereact/resources/primereact.min.css";
import { useNavigate } from "react-router-dom";
import ApexCharts from "apexcharts";
import ReactDOM from "react-dom";
function Statistics() {
  // create a basic apex chart
  const options = {
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],

    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
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
      ],
    },
  };

  const [chart, setChart] = useState(null);

  const chartRef = React.useRef(null);

  React.useEffect(() => {
    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
      setChart(chart);
    }
  }, [chartRef]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <div ref={chartRef} />
        </div>
      </div>
    </div>
  );
}
export default Statistics;
