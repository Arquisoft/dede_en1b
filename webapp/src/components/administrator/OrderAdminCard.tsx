import "../../css/OrderCard.css";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Order } from "../../shared/shareddtypes";
import OrderAdminDetails from "./OrderAdminDetails";
import React from "react";
import { CardActions, Collapse, IconButton, IconButtonProps } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type OrderAdminCardProps = {
    order: Order;
}

interface ExpandMoreAdminProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMoreAdmin = styled((props: ExpandMoreAdminProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function OrderAdminCard(props: OrderAdminCardProps) {

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    return (
        <Card id="orderAdminCard" variant="outlined" style={{"margin":"5px"}}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Order {props.order.createdAt.toString().substring(0, 10)}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    {props.order.userId.toString()}
                </Typography>
                Items:
                <CardActions disableSpacing>
                    <ExpandMoreAdmin
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMoreAdmin>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {props.order.products.map(product => (                            
                            <OrderAdminDetails orderId={props.order.id} productOrdered={product}></OrderAdminDetails>
                        ))}
                    </CardContent>
                </Collapse>

                <Typography variant="body2" color="text.secondary">
                    Total: {props.order.subTotal} €
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Shipping cost: {props.order.deliveryPrice} €
                </Typography>
            </CardContent>
        </Card>
    );
}