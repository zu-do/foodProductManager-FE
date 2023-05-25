import React, { useState, useEffect } from "react";
import "primereact/resources/primereact.min.css";
import "../Styles/Register.css"
import {getRecipes} from "../Utils/recipe-axios-util"
import {Grid, Box} from '@mui/material';
import { User } from "../User/User";
import {RecipeCard} from "../Views/RecipeCard"


const UserEmail = sessionStorage.getItem(User.userEmail);

function Recipes() {
    
    const [recipes, setRecipes] = useState(null);


    useEffect(() => {
        getRecipes(UserEmail).then((data) => {
          setRecipes(data);
        });
      },[]);

      if (recipes === null) {
        return <div>Loading...</div>;
      }
    return(
        <Box sx={{ display: 'flex', justifyContent: 'center', margin:'1rem' }}>
        <Grid container spacing={3}>
          {recipes.map((item, index) => (
            <Grid item xs={10} md={3} key={index}>
              <RecipeCard recipe={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    )
}
export default Recipes;