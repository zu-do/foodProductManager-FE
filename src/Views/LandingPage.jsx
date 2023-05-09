import React from "react";
import { Fragment } from "react";
import "../Styles/LandingPage.css";
import gif from "../Pictures/Groceryshopping.gif";
import book from "../Pictures/book.gif";
import eco from "../Pictures/eco.gif";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-purple/theme.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui//material/styles";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function LandingPage() {
  const navigator = useNavigate();
  const navigateToLogin = () => {
    navigator("/login");
  };
  const navigateToRegister = () => {
    navigator("/register");
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[400]),
    backgroundColor: red[400],
    "&:hover": {
      backgroundColor: red[900],
    },
  }));
  const theme = createTheme();

  theme.typography.h2 = {
    fontSize: "4rem",
    fontWeight: 600,
    "@media (min-width:0px) and (max-width: 850px)": {
      fontSize: "2rem",
      fontWeight: 600,
      fontWeight: "bold",
    },
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <ThemeProvider theme={theme}>
          <Typography Wrap variant="h2" color="text.primary" gutterBottom>
            Registruok savo maisto produktus lengvai
          </Typography>
        </ThemeProvider>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Užsiregistruok jau dabar. Food can also be a source of creativity and
          innovation, with chefs and home cooks alike experimenting with new
          flavors, techniques, and ingredients to push the boundaries of what we
          know and love about food.
        </Typography>
        <CardActions>
          <ColorButton variant="contained" size="medium" onClick={()=> navigateToRegister()}>
            Užsiregistruok
          </ColorButton>
          <Button color="error" variant="outlined" size="medium" onClick={()=> navigateToLogin()}>
            Prisijunk
          </Button>
        </CardActions>
      </CardContent>
    </React.Fragment>
  );
  const secondcard = (
    <Fragment>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontStyle: "oblique", fontWeight: 700, paddingTop: 10 }}
          color="text.primary"
          gutterBottom
        >
          Gauk receptų pasiūlymus
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Food is an essential part of our daily lives, providing us with the
          nutrients and energy we need to function and thrive. Not only does
          food nourish our bodies, but it also plays an important role in our
          social and cultural experiences.
        </Typography>
      </CardContent>
    </Fragment>
  );
  const thirdcard = (
    <Fragment>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontStyle: "oblique", fontWeight: 700, paddingTop: 10 }}
          color="text.primary"
          gutterBottom
        >
          Galite atiduoti savo produktus bei taip pat pasiimti kitų atiduodamus
          produktus
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          There is an incredible variety of food available from different
          cultures and regions, each with their own unique flavors, ingredients,
          and cooking techniques. Some foods are more popular in certain regions
          or countries, while others have become beloved staples around the
          world.
        </Typography>
      </CardContent>
    </Fragment>
  );

  return (
    <div>
      <Grid
        container
        rowSpacing={1}
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        sx={{ scrollBehavior: "smooth" }}
      >
        <Grid
          container
          item
          xs={12}
          direction="row"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item lg={6} md={6} p={5} sx={{ height: "auto" }}>
            <Card sx={{ border: "none", boxShadow: "none", paddingLeft: 3 }}>
              {card}
            </Card>
          </Grid>
          <Grid item lg={6} md={6}>
            <Card
              sx={{
                maxWidth: 800,
                border: "none",
                boxShadow: "none",
                padding: 5,
              }}
            >
              <CardMedia
                component="img"
                sx={{ maxWidth: "100%", height: "auto" }}
                image={gif}
                alt="Your image title"
              />
            </Card>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          direction="row"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item lg={6} md={6}>
            <Card
              sx={{
                border: "none",
                boxShadow: "none",
                maxWidth: 750,
                padding: 5,
              }}
            >
              <CardMedia
                component="img"
                height="100%"
                image={book}
                alt="Your image title"
              />
            </Card>
          </Grid>
          <Grid item lg={6} md={6} p={10}>
            <Card sx={{ border: "none", boxShadow: "none" }}>{secondcard}</Card>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          direction="row"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Grid item lg={6} md={6} p={10}>
            <Card sx={{ border: "none", boxShadow: "none" }}>{thirdcard}</Card>
          </Grid>
          <Grid item lg={6} md={6}>
            <Card
              sx={{
                border: "none",
                boxShadow: "none",
                maxWidth: 700,
                padding: 5,
              }}
            >
              <CardMedia
                component="img"
                height="50%"
                image={eco}
                alt="Your image title"
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
export default LandingPage;
