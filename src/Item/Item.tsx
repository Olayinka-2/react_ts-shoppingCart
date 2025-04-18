import Button from "@mui/material/Button";  

// Types
import {CartItemType}  from "../App";

// styles
import {Wrapper} from "./Item.styles";
import React from "react";

type Props = {
   item: CartItemType;  
   handleAddToCart: (clickedItem: CartItemType) => void
}

const Item: React.FC<Props> = ({item, handleAddToCart}) => (
   <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
         <h3>{item.title}</h3>
         <p>{item.description}</p>
         <p>{item.price}</p>
      </div>
      <Button onClick={() =>handleAddToCart(item)}>Add to cart</Button>
   </Wrapper>
)

export default Item;