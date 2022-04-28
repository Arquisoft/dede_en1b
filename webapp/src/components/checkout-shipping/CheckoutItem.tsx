import { ItemCart } from "../../shared/shareddtypes";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Box, CardMedia } from "@mui/material";
import { baseApiEndPoint, getProductImages } from '../../api/api';
import { useState,useEffect } from 'react';

type CheckoutItemProps = {
    item: ItemCart;
    updateTotal: () => void;
};

function CheckoutItem(props: CheckoutItemProps) {
    const [imgPath, setImgPath] = useState<string>("");

    const getImage = async () => {
        setImgPath(baseApiEndPoint+(await getProductImages(props.item.product.id)as string[])[0]);
      }; 

    useEffect(() => {
        getImage();
    }, []);


    return (
        <Card variant="elevation" sx={{ display: 'flex', marginBottom: 5 }}>
            <CardMedia
                component="img"
                image={imgPath}
                sx={{ height: 260, width: 100, margin: 3 }}
                style={{ flex: 2 }} />
            <Box style={{ flex: 3, display: 'flex', flexDirection: 'column' }}
                justifyContent='space-between'>
                <CardContent>
                    <Typography component="h2" variant="h3">
                        {props.item.product.name}

                    </Typography>
                    <Typography component="h3" variant="h4">

                        <p>x{props.item.quantity}</p>
                        <p>Price: {props.item.product.price.toString().concat(" €")}</p>
                    </Typography>
                </CardContent>

            </Box>

        </Card>
    );
}

export default CheckoutItem;
