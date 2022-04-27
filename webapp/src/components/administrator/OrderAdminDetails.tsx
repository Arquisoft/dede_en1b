

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';

import { baseApiEndPoint } from '../../api/api';

import { ProductOrdered } from "../../shared/shareddtypes";

import "../../css/OrderDetails.css";
import { Grid} from '@mui/material';

type ProductCardAdminProps = {
    productOrdered: ProductOrdered;
    orderId: string;
}
export default function OrderAdminDetails(props: ProductCardAdminProps) {  
    
    console.log(props);
    const imgAdminPath = baseApiEndPoint + "/cars/" + props.productOrdered.product.image + "/" + props.productOrdered.product.image + " (1).jpg"
    return (
        <Card id="mainAdminCard">
            <Grid container spacing={2}>
                <Grid item xs={2.5}>
                    <CardHeader
                        title={props.productOrdered.product.name}
                        subheader={"Price: " + props.productOrdered.product.price + "€/unit Quantity:  " + props.productOrdered.quantity}

                    />
                </Grid>

                <Grid item xs={8}>
                    <CardMedia
                        id="cardImg"
                        component="img"
                        height="194"
                        image={imgAdminPath}
                        alt={props.productOrdered.product.name}
                    />
                </Grid>
            </Grid>

        </Card>
    );
}