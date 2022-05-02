import { ItemCart } from "../../shared/shareddtypes";

import { baseApiEndPoint, getProductImages } from '../../api/api';
import { useState, useEffect } from 'react';
import './../../css/CheckoutItem.css'
type CheckoutItemProps = {
    item: ItemCart;
};

function CheckoutItem(props: CheckoutItemProps) {
    const [imgPath, setImgPath] = useState<string>("");

    const getImage = async () => {
        setImgPath(baseApiEndPoint + (await getProductImages(props.item.product.id) as string[])[0]);
    };

    useEffect(() => {
        getImage();
    }, []);

    return (
        <div className="card-item" style={{

        }}>
            <img className="item-img" src={imgPath} alt={props.item.product.name} />

            <div className="item-info">

                <div className="item-name" >
                    {props.item.product.name}

                </div>

                <div className="item-price-quantity"  >

                    <p>{props.item.quantity} Unit(s)</p>
                    <p>Price: {props.item.product.price.toString().concat(" €")}</p>
                </div>


            </div>

        </div>
    );

}

export default CheckoutItem;
