import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import ApexCharts from "apexcharts";
import StatisticsCSS from "../Styles/Statistics.css";
import { getUsers } from "../Utils/user-axios-utils";
import { getAllProducts } from "../Utils/product-axios-utils";

export default function Statistics() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [userCount, setUserCount] = useState(0);
  const [kgSaved, setKgSaved] = useState(0);
  const [lSaved, setLSaved] = useState(0);
  const [unitSaved, setUnitsSaved] = useState(0);
  const chartRef = useRef(null);

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
        setKgSaved(totalQuantityKg.toFixed(1));

        const filteredProductsL = products.filter(
          (product) => product.unitTypeId === 2
        );
        const totalQuantityL = filteredProductsL.reduce(
          (sum, product) => sum + product.quantity,
          0
        );

        setLSaved(totalQuantityL.toFixed(1));

        const filteredProductsUnits = products.filter(
          (product) => product.unitTypeId === 3
        );
        const totalQuantityUnits = filteredProductsUnits.reduce(
          (sum, product) => sum + product.quantity,
          0
        );
        setUnitsSaved(totalQuantityUnits);

        const categories = countCategories(products);

        Object.keys(categories).forEach((key) => {
          switch (key) {
            case "Darzoves":
              categories["Daržovės"] = categories[key];
              delete categories[key];
              break;
            case "Gerimai":
              categories["Gėrimai"] = categories[key];
              delete categories[key];
              break;
            case "Mesa":
              categories["Mėsa"] = categories[key];
              delete categories[key];
              break;
            case "PienoProduktai":
              categories["Pieno produktai"] = categories[key];
              delete categories[key];
              break;

            default:
              break;
          }
        });

        const data = generateChartData(categories);

        setChartData(data);

        const options = {
          chart: {
            type: "bar",
            height: 400,
          },
          title: {
            text: "TOP 3 produktų kategorijos sistemoje",
          },
          series: [
            {
              name: "Produktų kiekis sistemoje",
              data: data.values,
              color: "#F16E5A",
            },
          ],
          xaxis: {
            categories: data.categories,
          },
        };

        setChartOptions(options);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const generateChartData = (categories) => {
    const chartCategories = Object.keys(categories);
    const chartData = Object.values(categories);

    return {
      categories: chartCategories,
      values: chartData,
    };
  };

  useEffect(() => {
    if (
      chartRef.current &&
      chartData.categories &&
      Object.keys(chartOptions).length > 0
    ) {
      const chart = new ApexCharts(chartRef.current, chartOptions);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [chartData.categories, chartOptions]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2rem 8rem",
        }}
      >
        <Card
          raised={true}
          sx={{ padding: "2rem", height: "fit-content", marginBottom: "2rem" }}
        >
          <div>
            <p style={{ fontSize: "xx-large" }}>
              Prisiregistravusių naudotojų:
            </p>
            <div
              style={{
                fontSize: "xxx-large",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {userCount}
            </div>
          </div>
        </Card>
        <Card
          sx={{ padding: "2rem", height: "fit-content", marginBottom: "2rem" }}
          raised={true}
        >
          <p style={{ fontSize: "xx-large" }}>
            Sistemoje registruotas maisto kiekis:
          </p>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div style={{ fontSize: "xxx-large" }}>
              <b>{lSaved}&nbsp;L</b>&nbsp;|&nbsp;
            </div>
            <div style={{ fontSize: "xxx-large" }}>
              <b>{kgSaved}&nbsp;Kg</b>&nbsp;|&nbsp;
            </div>
            <div style={{ fontSize: "xxx-large" }}>
              <b>{unitSaved}&nbsp;Vnt</b>
            </div>
          </div>
        </Card>
      </div>
      {chartData.categories && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <div
            ref={chartRef}
            style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}
          />
        </div>
      )}
    </>
  );
}
