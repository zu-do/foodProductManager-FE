import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import StatisticsCSS from "../Styles/Statistics.css";
export default function Statistics() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: [
        "Jūsų išsaugotas maistas, kg",
        "Kitų naudotojų išsaugotas maistas, kg",
      ],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: "60%",
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  const [lineChartData, setLineChartData] = useState({});
  const [lineChartOptions, setLineChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: [
        "Sausis",
        "Vasaris",
        "Kovas",
        "Balandis",
        "Gegužė",
        "Birželis",
        "Liepa",
      ],
      datasets: [
        {
          label: "Jūsų išsaugotas maistas, kg",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setLineChartData(data);
    setLineChartOptions(options);
  }, []);

  return (
    <>
      <div className="card111">
        <Chart type="line" data={lineChartData} options={lineChartOptions} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2rem 8rem",
        }}
      >
        <div
          className="smallCard111"
          style={{
            width: "30%",
          }}
        >
          <Chart
            type="doughnut"
            data={chartData}
            options={chartOptions}
            className="w-full md:w-30rem"
          />
        </div>
        <div className="smallCard111">
          <p style={{ fontSize: "xx-large", marginBottom: "2rem" }}>
            Naudotojo Jonas Balionas statistika
          </p>
          <i style={{ fontSize: "6rem" }} className="pi pi-chart-bar"></i>
        </div>
        <div className="smallCard111">
          <p style={{ fontSize: "xx-large" }}>
            Išsaugotas maistas per šią savaitę
          </p>
          <p style={{ fontSize: "xxx-large", fontWeight: "bold" }}>300 Kg</p>
        </div>
      </div>
    </>
  );
}
