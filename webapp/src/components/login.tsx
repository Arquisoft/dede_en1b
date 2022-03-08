import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';

export default function Login() {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}
    style = {{textAlign: "center"}}>
        
    <form style={{width: "50vw"}} action="/" method="get">
        <InputLabel htmlFor="login" style = {{textAlign: "left", marginLeft: "1%"}}>
          Enter your POD URL:
        </InputLabel>

        <TextField
            variant="outlined"
            type="text"
            id="login"
            placeholder="https://pod.inrupt.com/username/profile/card#me"
            name="login" 
            style={{width: "58vw", padding: "1%"}}
            sx={{ input: { color: '#7c4dff' } }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                    <AccountCircle />
                    </InputAdornment>
                ),
                }}
        />
            
        <Button type="submit" variant="contained" style = {{color: "white", padding: "1%", marginLeft: "2%", marginTop: "1.5%", backgroundColor: "#F23005", borderRadius: "8px"}}>Connect</Button>
    </form>
    </Box>
  );
}
