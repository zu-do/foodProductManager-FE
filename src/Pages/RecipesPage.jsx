import React, { useState } from "react";
import "primereact/resources/primereact.min.css";
import "../Styles/Register.css"
import { useNavigate } from "react-router-dom";
import {loginUser} from "../Utils/user-axios-utils"
import { User } from "../User/User";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function RecipesPage() {

    return(
        <Grid container component="main" sx={{ height: '50vh', justifyContent:'center', marginTop:'4rem' }}>
            Receptai
      </Grid>
    )
}
export default RecipesPage;