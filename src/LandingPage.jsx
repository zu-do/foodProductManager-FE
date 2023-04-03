import React from "react";
import "./Styles/LandingPage.css";
import photo1 from "./Pictures/a.jpg";
import photo2 from "./Pictures/av.jpg";
import photo3 from "./Pictures/b.jpg";
import photo4 from "./Pictures/c.jpg";
import photo5 from'./Pictures/p.jpg';
import photo6 from "./Pictures/s.jpg";

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

function LandingPage() {
  const navigator = useNavigate();
  const navigateToStatistics = () => {
    navigator("/statistics");
  };
  const header = <img className="image" alt="apple" src={photo1} />;
  const header1 = <img className="image" alt="avocado" src={photo2} />;
  const header2 = <img className="image" alt="banana" src={photo3} />;
  const header3 = <img className="image" alt="cherry" src={photo4} />;
  const header4 = <img className="image" alt="tomato" src={photo5} />;
  const header5 = <img className="image" alt="suchi" src={photo6} />;
  
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Container maxWidth="sm">
      <Container maxWidth="sm">
        <Box sx={{ minWidth: 275 }}>
          <Card classname ="primary-card" variant="outlined">{card}</Card>
        </Box>
      
      </Container>
    </Container>

  );
}
export default LandingPage;
