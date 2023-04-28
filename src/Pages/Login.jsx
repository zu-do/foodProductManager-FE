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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

function Login() {

    const [email, setEmail] = useState(User);
    const [password, setPassword] = useState("");
    const navigator = useNavigate();
    const navigateToMain = () => {
      navigator("/main");
    };

    const onSubmit = (event) => {
        event.preventDefault(); // prevent default form submit behavior
    
        const response = loginUser(email, password);
        response.then((result) => {
            if (result !== null){
                sessionStorage.setItem(User.userEmail, email);
                sessionStorage.setItem(User.userID, result.id);
                //console.log(result);
                navigateToMain();
                
            }
            else{
                window.alert("Nepavyko prisijungti")
            }
        });
      };

      const navigateToRegistration = () => {
        navigator("/register");
      }

    return(
        <Grid container component="main" sx={{ height: '50vh', justifyContent:'center', marginTop:'4rem' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={3}
          marginRight={7}
          sx={{
            backgroundImage: 'url(../Pictures/login.gif)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={6} md={3} component={Paper} elevation={false}  square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#29B61D' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Prisijungimas
            </Typography>
            <Box component="form" noValidate onSubmit={(e) => onSubmit(e)}  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="El. pašto adresas"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Slaptažodis"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                style={{backgroundColor:'#29B61D'}}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Prisijungti
              </Button>
              <Grid container>
                <Grid item>
                  <Link onClick={navigateToRegistration} style={{color:'#3F3D56'}} variant="body2">
                    {"Nesate narys? Registruokitės/Test"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    )
}
export default Login;