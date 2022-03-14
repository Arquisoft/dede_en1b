import "../css/OrderCard.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Order } from "../shared/shareddtypes";

type OrderCardProps = {
    order: Order;
}

export default function OrderCard(props: OrderCardProps) {
    return (
        // <a id = "cardLink" href="/details?order_id=">
        <Button id="cardButton">
            <Card id="orderCard" variant="outlined">
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Order Date
                    </Typography>
                    Items:
                    {props.order.products.map(product => (
                        <Typography variant="caption" color="text.secondary">
                            {product},
                        </Typography>
                    ))}
                    <Typography variant="body2" color="text.secondary">
                        Total: {props.order.subTotal} €
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Shipping cost: {props.order.deliveryPrice} €
                    </Typography>
                </CardContent>
            </Card>
        </Button>
        // </a>
    );
}