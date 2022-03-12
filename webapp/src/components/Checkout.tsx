import React, { useState } from 'react';

import { Product, User } from '../shared/shareddtypes';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';


type CheckoutListProps = {
    products: Product[];
    user: User;
}

function Checkout(props: CheckoutListProps): JSX.Element {
    return (
        <>
            
            <h2>{props.user.name}</h2>
            <p>{props.user.email}</p>
           
            <List>
                {props.products.map((product, i) => {
                    return (
                        <ListItem key={product.name}>
                            <img src={product.image} alt={product.name} />
                            <ListItemText primary={product.name} secondary={product.price + '€'} />
                        </ListItem>
                    )
                })}
            </List>
        </>

    );
}

export default Checkout;