import React,{useState,useEffect} from "react";
import { map } from "lodash";
import "./ListProducts.scss";
import { Products } from "../Products/Products";
import {getProductsCart,getQuantityCart } from "../../../api/cart";
export function ListProducts(props) {
  const { products } = props
  const [quantity, setQuantity]=useState(); 
  const [productCart, setProductCart]=useState(); 



  const getIndex=(id)=>{
    const gpc = getProductsCart();
    const gqc = getQuantityCart()

    const cantidad = gpc.findIndex((element) => element ==id);

   return gqc[cantidad];

 }


  return (
    <div className="list-products-client">
      {map(products, (product) => (
        <Products key={product.id} product={product} quantityCart={getIndex(product.id)}/>
      ))}
    </div>
  );
}

