import React from "react";
import "./Styles/LandingPage.css";
import gif from "./Pictures/Groceryshopping.gif";
import gif1 from "./Pictures/Grocery_shopping1.gif";
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
import { purple } from '@mui/material/colors';
import { styled } from '@mui//material/styles';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';





function LandingPage() {
  const navigator = useNavigate();
  const navigateToStatistics = () => {
    navigator("/statistics");
  };


  const color = red[400];

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: color,
    '&:hover': {
      backgroundColor: red[900],
    },
  }));
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h2" sx={{ fontStyle: 'bold', fontWeight: 700
        }} color="text.primary" gutterBottom>
        Registruok savo maisto produktus lengvai
        </Typography>
        
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Užsiregistruok jau dabar
        </Typography>
        <CardActions>
        <ColorButton variant="contained" size="small">Užsiregistruok</ColorButton>
          
          <Button  color="secondary" variant="outlined" size="small">Prisijunk</Button>
        </CardActions>
      </CardContent>
    </React.Fragment>
  );
  return (
    <div>
      <div className="grid-container">
     
            <Card sx={{ height: 540,
              fontStyle: 'bold',
              maxWidth: 400,border: "none", boxShadow: "none" }}  >{card}</Card>
            <Card sx={{ maxWidth: 700,border: "none", boxShadow: "none" }}>
              <CardMedia
                component="img"
                height="80%"
                image={gif}
                alt="Your image title"
              />
            </Card>
            
            
        </div>
    </div>


  );
}
export default LandingPage;
