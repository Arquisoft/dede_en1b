import "../css/OrderCard.css";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from "react";
import { Box } from "@mui/material";

export default function Order() {
    return (
        // <a id = "cardLink" href="/details?order_id=">
        <Button id = "cardButton">
            <Card id = "orderCard" variant="outlined">
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Order Date
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Order details (Price, Shipping Cost, Total...)
                        </Typography>
                    </CardContent>
            </Card>
        </Button>
        // </a>
    );
}