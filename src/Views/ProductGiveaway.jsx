import { useEffect, useState, useRef } from "react";
import { getGiveableProducts } from "../Utils/product-axios-utils";
import { getAddressByID } from "../Utils/address-axios-utils";
import Map from "../Pages/Map";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { reserveProduct } from "../Utils/product-axios-utils";
import { User } from "../User/User";

function ProductGiveaway() {
  const [products, setProducts] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [mergedData, setMergedData] = useState([]);
  const toast = useRef(null);

  useEffect(() => {
    getGiveableProducts()
      .then(async (data) => {
        setProducts(data);
        const addressPromises = data.map((product) =>
          getAddressByID(product.addressId).then((response) => response)
        );

        const addresses = await Promise.all(addressPromises);
        const mergedData = data.map((product, index) => ({
          ...product,
          address: addresses[index],
        }));

        setMergedData(mergedData);
      })
      .catch((err) => console.error(err));
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#29B61D",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  });
  const ContentContainer = styled("div")({
    display: "grid",
    gridTemplateColumns: "1fr",
    justifyContent: "center",
    gap: "2rem",
    width: "100%",

    "@media (min-width: 768px)": {
      gridTemplateColumns: "1fr 1fr",
      justifyContent: "space-between",
      alignItems: "flex-start",
      fontSize: 9,
    },
  });
  const TableWrapper = styled("div")({
    flex: "1 1 50%",
  });
  const MapWrapper = styled("div")({
    width: "37%",
    marginLeft: "14rem",
    flex: "1 1 50%",
    marginRight: "11rem",

    "@media (max-width: 768px)": {
      width: "60%",
      marginLeft: "8rem",
      flex: "1 1 100%",
    },
  });
  const ResponsiveTableContainer = styled(TableContainer)({
    overflowY: "auto",

    width: "100%",
    marginLeft: "7rem",
    gridTemplateColumns: "1fr",
    justifyContent: "center",
    "@media (max-width: 768px)": {
      width: "50%",
      fontSize: 9,
      marginLeft: "12rem",
    },
  });
  const confirmReservation = (event, rowData) => {
    console.log(sessionStorage.getItem(User.userID));
    event.preventDefault();
    confirmPopup({
      target: event.currentTarget,
      message: "Ar norite rezervuoti šį produktą?",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      acceptLabel: "Taip",
      rejectLabel: "Ne",
      accept: () => handleProductReservation(rowData.id),
    });
  };
  const handleProductReservation = (id) => {
    reserveProduct(id, sessionStorage.getItem(User.userID))
      .then((response) => {
        if (response === true) {
          toast.current.show({
            severity: "info",
            summary: "Patvirtinta",
            detail: "Sėkmingai rezervavote maisto produktą",
            life: 5000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 600);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.current.show({
          severity: "error",
          summary: "Klaida",
          detail: "Nepavyko rezervuoti maisto produkto",
          life: 3000,
        });
      });
  };

  return (
    <Container>
      <h1 style={{ textAlign: "center" }}>Produktų atiduotuvė</h1>
      <ContentContainer>
        <TableWrapper>
          <ResponsiveTableContainer component={Paper}>
            <ConfirmPopup />
            <Toast ref={toast} />
            <Table sx={{ maxWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Pavadinimas</StyledTableCell>
                  <StyledTableCell align="right">Kiekis</StyledTableCell>
                  <StyledTableCell align="right">Vienetai</StyledTableCell>
                  <StyledTableCell align="right">Galioja iki </StyledTableCell>
                  <StyledTableCell align="right">Adresas </StyledTableCell>
                  <StyledTableCell align="right"> </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => {
                  const mergedItem = mergedData.find(
                    (item) => item.id === product.id
                  );
                  const address = mergedItem ? mergedItem.address : "";
                  return (
                    <StyledTableRow
                      key={product.id}
                      onClick={() => setSelectedRowIndex(product.id)}
                      selected={selectedRowIndex === product.id}
                    >
                      <StyledTableCell component="th" scope="row">
                        {product.productName}
                      </StyledTableCell>

                      <StyledTableCell align="right">
                        {product.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.unitTypeId === 1
                          ? "Kilogramai"
                          : product.unitTypeId === 2
                          ? "Litrai"
                          : "Vienetai"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.expirationTime.substring(5, 10)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {address ? address.name : ""}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Button
                          onClick={(e) => {
                            confirmReservation(e, product);
                          }}
                          style={{ color: "#29B61D" }}
                        >
                          {" "}
                          Rezervuoti
                        </Button>{" "}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ResponsiveTableContainer>
        </TableWrapper>

        <MapWrapper>
          <Map mergedData={mergedData} selectedRowIndex={selectedRowIndex} />
        </MapWrapper>
      </ContentContainer>
    </Container>
  );
}

export default ProductGiveaway;
