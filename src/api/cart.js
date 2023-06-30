import { map } from "lodash";
import { toast } from "react-toastify";

const PRODUCT_CART = "productsCart";
const PRODUCT_QUANTITY = "productQuantity";


export function getProductsCart() {
  const response = localStorage.getItem(PRODUCT_CART);
  return JSON.parse(response || "[]");
}
export function getQuantityCart() {
  const response = localStorage.getItem(PRODUCT_QUANTITY);
  return JSON.parse(response || "[]");
}

export function addProductCart(id) {
   let existe = 0;
   let lugar=null;
  const products = getProductsCart();
  const quantity = getQuantityCart();
  map(products, (product,index) => {
      if(id===product){
        existe++;
        lugar=index;
      }   
  })
    if(existe===0){
      products.push(id);
      localStorage.setItem(PRODUCT_CART, JSON.stringify(products));
      quantity.push(1);
      localStorage.setItem(PRODUCT_QUANTITY, JSON.stringify(quantity));
    }else{
      quantity[lugar]=quantity[lugar]+1
      localStorage.setItem(PRODUCT_QUANTITY, JSON.stringify(quantity));
    }
}

export function removeQuantityCart(val) {
  let existe = 0;
  let lugar=null;
 const products = getProductsCart();
 const quantity = getQuantityCart();
 map(products, (product,index) => {
     if(val.id==product){
      console.log('ENTRO O NO AQUI?')
       existe++;
       lugar=index;
     }   
 })
 console.log("Existe ",existe);
   if(existe>0){
    if(quantity[lugar]>1){
      quantity[lugar]=quantity[lugar]-1
      localStorage.setItem(PRODUCT_QUANTITY, JSON.stringify(quantity));
    }else if(quantity[lugar]===1){
      removeProductCartApi(val);
    }
   }else{
    console.log("ENTRO AQUI");
      toast.warning('este producto no se encuentra en el carrito');
   }
}


export function removeProductCartApi(index) {
  const idProducts = getProductsCart();
  const quantity = getQuantityCart();
  idProducts.splice(index, 1);
  quantity.splice(index, 1);
  localStorage.setItem(PRODUCT_CART, JSON.stringify(idProducts));
  localStorage.setItem(PRODUCT_QUANTITY, JSON.stringify(quantity));
}

export function cleanProductCartApi() {
  localStorage.removeItem(PRODUCT_CART);
  localStorage.removeItem(PRODUCT_QUANTITY);
}
