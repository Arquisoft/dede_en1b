import { useState, useEffect } from 'react';
import { ItemCart, Product } from "../../shared/shareddtypes";
import { addToCart, apiEndPoint, baseApiEndPoint, getProductImages } from '../../api/api';

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Card, CardContent, Box, Divider, CardMedia } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './../../css/CartItem.css'
type CartItemProps = {
    item: ItemCart;
    updateTotal: () => void;
    deleteItem: (product: Product) => void;
    refreshCartList: () => void;
};

function CartItem(props: CartItemProps) {
    const [quantity, setQuantity] = useState<number>(props.item.quantity);
    const [imgPath, setImgPath] = useState<string>("");

    async function changeQuantityBy(item: ItemCart, factor: number): Promise<void> {
        item.quantity += factor;
        setQuantity(item.quantity);
        addToCart(item, factor);
        props.updateTotal();
        props.refreshCartList();

    };

    const getImage = async () => {
        setImgPath(baseApiEndPoint + (await getProductImages(props.item.product.id) as string[])[0]);
    };

    useEffect(() => {
        setQuantity(props.item.quantity);
        getImage();
    }, [props.item.quantity]);



    return (

        // <div className="card-item">
        <Card id="card-item">
            <img className="item-img" src={imgPath} alt={props.item.product.name} />
            <div className="item-info">

                <div className='item-name'>
                    {props.item.product.name}
                </div>
                <div className='item-description'>
                    {props.item.product.description}
                </div>
                <div className="item-price">
                    {props.item.product.price.toString().concat(" €")}
                </div>
                <div className="item-buttons" style={{ display: 'flex', justifyContent: 'left', margin: 15 }}>


                    <Button size="small"
                        disabled={props.item.quantity === 1}
                        onClick={() => changeQuantityBy(props.item, -1)}
                        style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px' }}
                    >
                        -
                    </Button>
                    <Typography component="h4" align="center">
                        {quantity}
                    </Typography>
                    <Button size="small"
                        onClick={() => changeQuantityBy(props.item, 1)}
                        style={{ maxWidth: '20px', maxHeight: '20px', minWidth: '20px', minHeight: '20px' }}>
                        +
                    </Button>

                    <Button
                        onClick={() => props.deleteItem(props.item.product)}
                        color="error" size="medium" startIcon={<DeleteIcon />}
                    >
                        Delete
                    </Button>

                </div>
            </div>




        </Card>
        /* </div> */

    );
}

export default CartItem;