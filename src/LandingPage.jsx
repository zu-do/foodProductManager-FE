import React from "react";
import "./Styles/LandingPage.css";
import gif from "./Pictures/Groceryshopping.gif";
import gif1 from "./Pictures/Grocery_shopping1.gif";
import recbook from "./Pictures/Recipe_book.gif";
import bookloop from "./Pictures/bookloop.gif";
import eco from "./Pictures/eco.gif";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-purple/theme.css";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { red } from "@mui/material/colors";
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui//material/styles';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';


function LandingPage() {
  const navigator = useNavigate();
  const navigateToStatistics = () => {
    navigator("/statistics");
  };
  const colorr=red[400];
  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[400]),
    backgroundColor: red[400],
    '&:hover': {
      backgroundColor: red[900],
    },
  }));
  
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography Wrap variant="h2" sx={{ fontStyle: 'bold', fontWeight: 600, fontSize: '4rem' }} color="text.primary" gutterBottom>
        Registruok savo maisto produktus lengvai
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Užsiregistruok jau dabar
        </Typography>
        <CardActions>
          <ColorButton variant="contained" size="medium">Užsiregistruok</ColorButton>
          <Button color='error' variant="outlined" size="medium">Prisijunk</Button>
        </CardActions>
      </CardContent>
    </React.Fragment>
  );
  const secondcard = (
    <React.Fragment>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' , alignContent: "center", alignItems:"center"}}>
        <Typography variant="h3" sx={{ fontStyle: 'oblique', fontWeight: 700, paddingTop:10
        }} color="text.primary" gutterBottom>
        Gauk receptų pasiūlymus
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const thirdcard = (
    <React.Fragment>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' , alignContent: "center", alignItems:"center"}}>
        <Typography variant="h3" sx={{ fontStyle: 'oblique', fontWeight: 700, paddingTop:10
        }} color="text.primary" gutterBottom>
        Galite atiduoti savo produktus bei taip pat pasiimti kitų atiduodamus produktus
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  
  return (
    <div>
      <Grid container rowSpacing={1} 
          direction="column" justifyContent="space-between" alignItems="center" >
        <Grid container item xs={12}  direction="row"  >
          <Grid item lg={6} md={6} p={10} sx={{ height: 'auto' }} >
            <Card sx={{ border: "none", boxShadow: "none" }}>{card}</Card> 
          </Grid>
          <Grid item lg={6} md={6} >
            <Card sx={{ maxWidth: 800,border: "none", boxShadow: "none", paddingLeft:10 }}>
              <CardMedia
                component="img"
                sx={{ maxWidth: '100%', height: 'auto' }}
                image={gif}
                alt="Your image title"/>
            </Card>
          </Grid>
        </Grid>
        <Grid container item xs={12} direction="row">
          <Grid item lg={6} md={6}   >
            <Card sx={{ border: "none", boxShadow: "none", maxWidth: 800, paddingLeft:10 }}>
                <CardMedia
                  component="img"
                  height="200%"
                  image={bookloop}
                  alt="Your image title"/>
              </Card>
          </Grid>
          <Grid item lg={6} md={6} p={10}  >
            <Card sx={{  border: "none", boxShadow: "none"}}  >{secondcard}</Card>
          </Grid>
        </Grid>
        <Grid container item xs={12} direction="row">
          
          <Grid item lg={6} md={6} p={10}  >
            <Card sx={{  border: "none", boxShadow: "none"}}  >{thirdcard}</Card>
          </Grid>
          <Grid item lg={6} md={6}   >
            <Card sx={{ border: "none", boxShadow: "none", maxWidth: 700, paddingLeft:10 }}>
                <CardMedia
                  component="img"
                  height="50%"
                  image={eco}
                  alt="Your image title"/>
              </Card>
          </Grid>
        </Grid>
      </Grid>
      
    </div>


  );
}
export default LandingPage;
