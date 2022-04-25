import "../../css/OrderCard.css";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Order } from "../../shared/shareddtypes";
import OrderDetails from "./OrderDetails";
import React from "react";
import { CardActions, Collapse, IconButton, IconButtonProps } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type OrderCardProps = {
    order: Order;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function OrderCard(props: OrderCardProps) {

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    return (
        <Card id="orderCard" variant="outlined">
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Order {props.order.createdAt.toString().substring(0, 10)}
                </Typography>
                Items:
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {props.order.products.map(product => (
                            // <Typography variant="caption" color="text.secondary">

                            //     {"\t"}
                            //     {product.product.name},
                            // </Typography>
                            <OrderDetails product={product}></OrderDetails>
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