import React, { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import ApexCharts from "apexcharts";
import StatisticsCSS from "../Styles/Statistics.css";
import { getUsers } from "../Utils/user-axios-utils";
import { getAllProducts } from "../Utils/product-axios-utils";
import ScaleIcon from "@mui/icons-material/Scale";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import EggIcon from "@mui/icons-material/Egg";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DvrIcon from "@mui/icons-material/Dvr";
import { Egg } from "@mui/icons-material";
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

    return categories;
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
            text: "Produktų kiekis pagal kategorijas",
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
            labels: {
              style: {
                fontSize: "16px",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                fontSize: "16px",
              },
            },
          },
          plotOptions: {
            bar: {
              dataLabels: {
                style: {
                  fontSize: "16px",
                },
              },
            },
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
      {chartData.categories && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <div ref={chartRef} style={{ width: "87%", margin: "0 auto" }} />
        </div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "2rem 8rem",
        }}
      >
        <Card
          raised={true}
          sx={{
            padding: "2rem",
            height: "fit-content",
            marginBottom: "2rem",
            minHeight: "20rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AccountBoxIcon sx={{ fontSize: "5rem" }} />
          <p
            style={{
              fontSize: "xx-large",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Sistemoje prisiregistravusių naudotojų:
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
        </Card>

        <Card
          raised={true}
          sx={{
            padding: "2rem",
            height: "fit-content",
            marginBottom: "2rem",
            minHeight: "20rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DvrIcon sx={{ fontSize: "5rem" }} />
          <p
            style={{
              fontSize: "xx-large",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            Sistemoje registruotas maisto kiekis:
          </p>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div
              style={{
                fontSize: "xxx-large",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WaterDropIcon sx={{ fontSize: "3rem", color: "blue" }} />
              <b>{lSaved}&nbsp;L</b>
            </div>
            <div
              style={{
                fontSize: "xxx-large",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ margin: "0 0.5rem" }}>&nbsp;|&nbsp;</span>
              <ScaleIcon sx={{ fontSize: "3rem", color: "#F16E5A" }} />
              <b>{kgSaved}&nbsp;Kg</b>
            </div>
            <div
              style={{
                fontSize: "xxx-large",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ margin: "0 0.5rem" }}>&nbsp;|&nbsp;</span>
              <EggIcon sx={{ fontSize: "3.5rem", color: "#ffa631" }} />
              <b>{unitSaved}&nbsp;Vnt</b>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
