import {useState} from 'react';
import {useQuery} from 'react-query'

//  components
import Item from "./Item/Item";
import Drawer from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import { AddShoppingCart } from '@mui/icons-material';
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";

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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
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
        <Box 
          display="flex" 
          flexWrap="wrap" 
          gap={2}
          padding={2}
        >
          {data?.map((item) => (
            <Box 
              key={item.id}
              sx={{
                flexGrow: 1,
                flexBasis: {
                  xs: '100%',    // Full width on extra small
                  sm: 'calc(50% - 16px)',   // Account for gap (8px*2)
                  md: 'calc(33.333% - 16px)',
                  lg: 'calc(25% - 16px)'
                },
                minWidth: {
                  xs: '100%',
                  sm: 'calc(50% - 16px)',
                  md: 'calc(33.333% - 16px)',
                  lg: 'calc(25% - 16px)'
                },
                maxWidth: '100%'
              }}
            >
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Box>
          ))}
        </Box>
      </Wrapper>
    </>
  )
}

export default App;


