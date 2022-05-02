import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { getProducts } from '../../api/api';
import { Product } from '../../shared/shareddtypes';
import ProductCard from './ProductCard';
import '../../css/MainProducts.scss'
import Grid from "@mui/material/Grid";

import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Brightness1Icon from '@mui/icons-material/Brightness1';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { IconButton, MenuItem, Rating, Select, Slider, Typography } from '@mui/material';

import { yellow, orange, red, green, blue } from '@mui/material/colors';

import React from 'react';

import "../../css/MainProducts.css";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

type MainProductsProps = {
  refreshCartList: () => void;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function MainProducts(props: MainProductsProps): JSX.Element {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [color, setColor] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(0);
  const [minRating, setMinRating] = React.useState(0);



  function computeQueryParams(): string {
    let queryParams = "";
    if (color !== "") {
      queryParams += "&color[eq]=" + color;
    }
    if (brand !== "") {
      queryParams += "&brand[eq]=" + brand;
    }
    if (minPrice !== 0) {
      queryParams += "&price[gte]=" + minPrice;
    }
    if (maxPrice !== 0) {
      queryParams += "&price[lte]=" + maxPrice;
    }
    if (minRating !== 0) {
      queryParams += "&rating[gte]=" + minRating;
    }
    return queryParams;
  }




  function filterColor(color: string) {
    if (color == "All") {
      setColor("");
    } else {
      setColor(color);
    }
    (document.getElementById("colorChooser") as HTMLDivElement).textContent = color;
  }

  function filterBrand(brand: string) {
    if (brand == "All") {
      setBrand("");
    } else {
      setBrand(brand);
    }
    (document.getElementById("brandChooser") as HTMLDivElement).textContent = brand;
  }

  function filterMinPrice(price: number) {
    setMinPrice(price);
  }

  function filterMaxPrice(price: number) {
    setMaxPrice(price);
  }

  function filterRating(rating: number) {
    setMinRating(rating);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);

  const refreshProductList = async (query: string) => {
    if (searchParams.get("q") !== null)
      query += "&name[eq]=" + searchParams.get("q");
    setProducts(await getProducts(query));
  }

  useEffect(() => {

    refreshProductList(computeQueryParams());
  }, [color, brand, minPrice, maxPrice, minRating]);

  return (
    <>
      <div className='main-products'>
        <div className='main-filter'>
          <IconButton
            data-testid="openFilterBtn"
            id="openFilterButton"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }), backgroundColor: ' purple' }}
          >
            <MenuIcon /><Typography>FILTER</Typography>
          </IconButton>
        </div>

        <div className="products-container">


          {products.length > 0 ? products.map((p, _i) => (
            <div data-testid="products-retrieved">
              <ProductCard key={p.id} product={p} refreshCartList={props.refreshCartList} />
            </div>
          )) : <Typography data-testid="loader">Loading products!!
            <LinearProgress color="success" />
          </Typography>
          }
        </div>
      </div>
      <Drawer
        data-testid="drawer-filter"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}

      >
        <div id="filterDrawer">
          <DrawerHeader>
            <Typography variant='h4' id="filterTitle">Filter</Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider /><br />

          <Typography variant='h5' style={{ float: "left" }}>Color</Typography>

          <br />
          <Select
            data-testid="colorPanel"
            id="colorChooser"
            sx={{ width: 200 }}
            defaultValue="all"
            label="color-filter"
          >
            <MenuItem>
              <ListItem button data-testid="all-color" key="all" onClick={() => { filterColor("All") }}>
                <ListItemIcon>
                  <ListItemText primary="All" />
                </ListItemIcon>
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem button data-testid="yellow" key="yellow" onClick={() => { filterColor("yellow") }}>
                <ListItemIcon>
                  <Brightness1Icon sx={{ color: yellow[500] }}></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="yellow" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem button data-testid="orange" key="orange" onClick={() => { filterColor("orange") }}>
                <ListItemIcon>
                  <Brightness1Icon sx={{ color: orange[500] }}></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="orange" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem button data-testid="red" key="red" onClick={() => { filterColor("red") }}>
                <ListItemIcon>
                  <Brightness1Icon sx={{ color: red[500] }}></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="red" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem button data-testid="gray" key="gray" onClick={() => { filterColor("gray") }}>
                <ListItemIcon>
                  <Brightness1Icon></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="gray" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem button data-testid="green" key="green" onClick={() => { filterColor("green") }}>
                <ListItemIcon>
                  <Brightness1Icon sx={{ color: green[500] }}></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="green" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem button data-testid="blue" key="blue" onClick={() => { filterColor("blue") }}>
                <ListItemIcon>
                  <Brightness1Icon sx={{ color: blue[500] }}></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="blue" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem id="white" data-testid="white" button key="white" onClick={() => { filterColor("white") }}>
                <ListItemIcon>
                  <Brightness1Icon id="whiteIcon"></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="white" />
              </ListItem>
            </MenuItem>
            <br></br>
            <MenuItem>
              <ListItem id="black" button data-testid="black" key="black" onClick={() => { filterColor("black") }}>
                <ListItemIcon>
                  <Brightness1Icon id="blackIcon"></Brightness1Icon>
                </ListItemIcon>
                <ListItemText primary="black" />
              </ListItem>
            </MenuItem>
          </Select>

          <br /><br /><Divider /><br />

          <Typography variant='h5' style={{ float: "left" }}>Brand</Typography>

          <br />

          <Select
            data-testid="brandPanel"
            id="brandChooser"
            sx={{ width: 200 }}
          >
            <div data-testid="brandOptions" id="brandChooserDiv">
              {['All', 'Toyota', 'Volvo', 'Renault', 'Nissan', 'Plymouth', 'BMW', 'Subaru', 'Honda', 'Lamborghini', 'Volkswagen', 'Chevy', 'Polestar', 'Porsche'].map((text, index) => (
                <div>
                  <MenuItem>
                    <ListItem button data-testid={text} key={text} onClick={() => { filterBrand(text) }} id={"li" + index}>
                      <ListItemIcon>
                        <DirectionsCarIcon />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </MenuItem>
                  <br></br>
                </div>

              ))}
            </div>


          </Select>

          <br /><br /><Divider /><br />

          <Typography variant='h5' style={{ float: "left" }}>Min Price</Typography>

          <Slider
            size="small"
            defaultValue={29.99}
            aria-label="Small"
            valueLabelDisplay="auto"
            id="minPrice"
            min={29.99}
            max={420.0}
            onChangeCommitted={(_e, value) => { filterMinPrice(value as number) }}
            data-testid="minPricePanel"
          />

          <br /><Divider /><br />

          <Typography variant='h5' style={{ float: "left" }}>Max Price</Typography>

          <Slider
            size="small"
            defaultValue={420.0}
            aria-label="Small"
            valueLabelDisplay="auto"
            id="maxPrice"
            min={29.99}
            max={420.0}
            onChangeCommitted={(_e, value) => { filterMaxPrice(value as number) }}
            data-testid="maxPricePanel"
          />

          <br /><Divider /><br />

          <Typography variant='h5' style={{ float: "left" }}>Rating</Typography>

          <Grid container spacing={0} id="ratingFilter">

            <Rating name="no-value" data-testid="ratingPanel" value={minRating} size="large" onChange={(event, value) => {
              filterRating(value as number)

            }} />
          </Grid>
          <br></br>
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </>

  );
};
export default MainProducts;