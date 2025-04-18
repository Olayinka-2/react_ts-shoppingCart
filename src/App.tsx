import {useState} from 'react';
import {useQuery} from 'react-query'

//  components
import Item from "./Item/Item";
import Drawer from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import { AddShoppingCart } from '@mui/icons-material';
import Badge from "@mui/material/Badge";

// styles
import Wrapper from './App.styles'; 

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}


const getProducts = async (): Promise<CartItemType[]>  => {
  const response = await fetch('https://fakestoreapi.com/products');
  return await response.json();
} 

function App() {
  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts);
  console.log(data);

  const getTotalItems = () => null;

  const handleAddToCart = (clickedItem: CartItemType) => null;   

  const handleRemoveFromCart = () => null; 

  if(isLoading) return <LinearProgress />

  if(error) return <div>Something Went Wrong</div>
  return (
    <>
      <Wrapper>
        <Grid container spacing={3}>
          {data?.map(item => (
              <Item item={item} handleAddToCart = {handleAddToCart} key={item.id}/>
          ))}
        </Grid>
      </Wrapper>
    </>
  )
}

export default App
