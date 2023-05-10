import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import StatisticsCSS from "../Styles/Statistics.css";
import { getUsers } from "../Utils/user-axios-utils";
import { getAllProducts } from "../Utils/product-axios-utils";
import { getUnitTypes } from "../Utils/unit-axios-utils";
export default function Statistics() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [userCount, setUserCount] = useState(0);
  const [foodSaved, setFoodSaved] = useState(0);
  const [kgSaved, setKgSaved] = useState(0);
  const [lSaved, setLSaved] = useState(0);
  const [unitSaved, setUnitsSaved] = useState(0);

  const fetchUsers = () => {
    getUsers()
      .then((users) => {
        const filteredUsers = users.filter((user) => user.role !== "admin");
        setUserCount(filteredUsers.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const countCategories = (products) => {
    const categories = {
      Darzoves: 0,
      Gerimai: 0,
      Mesa: 0,
      PienoProduktai: 0,
      Vaisiai: 0,
    };

    products.forEach((product) => {
      switch (product.categoryName) {
        case "Daržovės":
          categories.Darzoves++;
          break;
        case "Gėrimai":
          categories.Gerimai++;
          break;
        case "Mėsa":
          categories.Mesa++;
          break;
        case "Pieno produktai":
          categories.PienoProduktai++;
          break;
        case "Vaisiai":
          categories.Vaisiai++;
          break;
        default:
          break;
      }
    });

    const sortedCategories = Object.entries(categories).sort(
      (a, b) => b[1] - a[1]
    );

    const top3Categories = sortedCategories
      .slice(0, 3)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    return top3Categories;
  };

  const fetchProducts = () => {
    getAllProducts()
      .then((products) => {
        const filteredProductsKg = products.filter(
          (product) => product.unitTypeId === 1
        );
        const totalQuantityKg = filteredProductsKg.reduce(
          (sum, product) => sum + product.quantity,
          0
        );
        setKgSaved(totalQuantityKg);

        const filteredProductsL = products.filter(
          (product) => product.unitTypeId === 2
        );
        const totalQuantityL = filteredProductsL.reduce(
          (sum, product) => sum + product.quantity,
          0
        );
        setLSaved(totalQuantityL);

        const filteredProductsUnits = products.filter(
          (product) => product.unitTypeId === 3
        );
        const totalQuantityUnits = filteredProductsUnits.reduce(
          (sum, product) => sum + product.quantity,
          0
        );
        setUnitsSaved(totalQuantityUnits);
        console.log("CIAAAAAAAAA");
        console.log(countCategories(products));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();

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
        "Rugpjūtis",
        "Rugsėjis",
        "Spalis",
        "Lapkritis",
        "Gruodis",
      ],
      datasets: [
        {
          label: "Naudotojų atiduoti produktai, vnt",
          data: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
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

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <>
      <div className="statistic-card">
        <Chart type="line" data={chartData} options={chartOptions} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2rem 8rem",
        }}
      >
        <div className="small-statistic-card">
          <p style={{ fontSize: "xx-large" }}>Prisiregistravusių naudotojų:</p>
          <p style={{ fontSize: "xxx-large", fontWeight: "bold" }}>
            {userCount}
          </p>
        </div>
        <div className="small-statistic-card">
          <p style={{ fontSize: "xx-large" }}>
            Sistemoje registruotas maisto kiekis:
          </p>
          <p style={{ fontSize: "xxx-large", fontWeight: "bold" }}>
            {foodSaved} Kg
          </p>
        </div>
      </div>
    </>
  );
}
