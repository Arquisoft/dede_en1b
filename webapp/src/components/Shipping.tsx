
import { Component } from "react";
import { Card, CardContent, Box, Divider, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";

import "../css/Shipping.css";

export default function Shipping() {
    return (
        <Box justifyContent="center">
                <Typography component="h1" variant="h3" >
                    Shipping
                </Typography>
                <Divider/>      
            </Box>
    );
}