import {useState} from 'react';
import {useQuery} from 'react-query'

//  components
import Item from "./Item/Item";
import Drawer from "@mui/material/Drawer";
import LinearProgress from "@mui/material/LinearProgress";
import { AddShoppingCart } from '@mui/icons-material';
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Cart from './Cart/Cart';

// styles
import { StyledButton, Wrapper } from './App.styles';

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
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  
  const {data, isLoading, error} = useQuery<CartItemType[]>('products', getProducts);
  console.log(data);

  const getTotalItems = (items: CartItemType[]) => (
    items.reduce((ack: number, item) => ack + item.amount, 0) 
  );

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      if(isItemInCart) {
        return prev.map(item => 
          item.id === clickedItem.id 
          ? {...item, amount: item.amount + 1} 
          : item
        )
      }
      return [...prev, {...clickedItem, amount: 1}]
    })
  };   

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => (
      prev.reduce((ack: CartItemType[], item) => {
        if(item.id === id) {
          if(item.amount === 1) return ack;
          return [...ack, {...item, amount: item.amount - 1}]
        } else {
          return [...ack, item];
        }
      }, [])
    ))
  };

  if(isLoading) return <LinearProgress />

  if(error) return <div>Something Went Wrong</div>
  return (
    <>
      <Wrapper>
        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
          <Cart
            cartItems={cartItems} 
            addToCart={handleAddToCart} 
            removeFromCart={handleRemoveFromCart}
            />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
            <AddShoppingCart />
          </Badge>
        </StyledButton>
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


