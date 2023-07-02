import React, { useState, useEffect } from "react";
import { Image, Button, Icon } from "semantic-ui-react";
import { map, forEach,size } from "lodash";
import { useParams, useNavigate } from "react-router-dom";
import { useOrder, useTable } from "../../../hooks"
import { removeProductCartApi, cleanProductCartApi } from "../../../api/cart";
import "./ListProductCart.scss";

export function ListProductCart(props) {
  const { products, quantity,onReloadCart } = props;
  const [total, setTotal] = useState(0);
  const { addOrderToTable,getOrdersByTableAndProduct,updateQuantity } = useOrder();
  const { getTableByNumber } = useTable();
  const { tableNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let totalTemp = 0;
    forEach(products, (product,index) => {
      totalTemp += parseInt(product.price)*parseInt(quantity[index]);
    });
    setTotal(totalTemp.toFixed(0));
  }, [products]);

  const removeProduct = (index) => {
    removeProductCartApi(index);
    onReloadCart();
  };

  const createOrder= async()=>{
    const tableData = await getTableByNumber(tableNumber);
    const idTable = tableData[0].id;

    products.map(async(product, index) => {
      let close=false;
      const response = await getOrdersByTableAndProduct(idTable,product.id,close);

      if(size(response)>0){
          for await (const order of response) {
              const cantidad=order.quantity+quantity[index];
              await updateQuantity(order.id,idTable,product.id,cantidad);
          }
      }else{
              await addOrderToTable(idTable,product.id,quantity[index]);
      }
    })
    
    cleanProductCartApi();
    navigate(`/client/${tableNumber}/orders`);

  };

  return (
    <div className="list-product-cart">
      {map(products, (product, index) => (
        <div key={index} className="list-product-cart__product">
          <div>
            <Image src={product.image} avatar />
            <span className="title">{product.title}</span>
          </div>
          <div>
            <span className="quantity">{quantity[index]}</span>
          </div>
          <span>{FormatoNumerico(product.price*quantity[index])} Gs</span>
          <Icon name="close" onClick={() => removeProduct(index)} />
        </div>
      ))}

      <Button primary fluid onClick={createOrder}>
        Realizar pedido ( {FormatoNumerico(total)} Gs.)
      </Button>
    </div>
  );
}
function FormatoNumerico(valor){

  let numero= new Intl.NumberFormat('es-ES').format(valor)

  return numero;
}