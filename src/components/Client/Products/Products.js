import React,{useState,useEffect} from "react";
import { Image, Button, Icon,Input } from "semantic-ui-react";
import { map } from "lodash";
import { toast } from "react-toastify";
import { addProductCart,removeQuantityCart,getProductsCart,getQuantityCart } from "../../../api/cart";
import './Products.scss';

export function Products(props) {
  const { product,quantityCart } = props
  const [quantity , setQuantity] =useState(quantityCart || 0);

console.log(quantityCart);
  const addCart = (product) => {
    addProductCart(product.id);
    toast.success(`${product.title} añadido a su orden`);
    setQuantity(quantity+1);

  };
  const removeCart = (product) => {
    removeQuantityCart(product);
    if(quantity >0){
        toast.warning(`quitando orden: ${product.title}`);
        setQuantity(quantity-1);
    } 
  };

  return (
        <div className="list-products-client__product">
          <div>
            <Image src={product.image} />
            <span>{product.title}</span>
           
          </div>
          <div>
          <Button circular primary icon onClick={() => removeCart(product)}>
              <Icon name="minus" />
            </Button>
            <Input key={product.id}
                   type="number"
                   value={quantity}
            />
            <Button circular primary icon onClick={() =>addCart(product) }>
              <Icon name="add" />
            </Button>
          </div>
        </div>
  );
}

