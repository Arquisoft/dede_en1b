import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { baseApiEndPoint } from '../../api/api';

import { Product, ProductOrdered } from "../../shared/shareddtypes";

import "../../css/OrderDetails.css";
import { Grid, Typography } from '@mui/material';
import AddReviewCard from '../products/addReviewCard';

type ProductCardProps = {
    productOrdered: ProductOrdered;
    orderId: string;
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

export default function OrderDetails(props: ProductCardProps) {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    console.log(props);

    const imgPath = baseApiEndPoint + "/cars/" + props.productOrdered.product.image + "/" + props.productOrdered.product.image + " (1).jpg"

    return (
        <Card id="mainCard">
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
                        image={imgPath}
                        alt={props.productOrdered.product.name}
                    />
                </Grid>
            </Grid>


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
                    {!props.productOrdered.reviewed ?
                    <AddReviewCard setExpanded={setExpanded} orderId={props.orderId} productOrdered={props.productOrdered} userId={localStorage.getItem("webId") as string}></AddReviewCard>
                    :
                    <Typography variant="caption" color="text.secondary">
                        You have already reviewed this product .
                    </Typography>
                    }
                </CardContent>
            </Collapse>
        </Card>
    );
}