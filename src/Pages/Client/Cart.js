import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { Link, useParams } from "react-router-dom";
import { size } from "lodash";
import { useProduct } from "../../hooks";
import { getProductsCart ,getQuantityCart} from "../../api/cart";
import { ListProductCart } from "../../components/Client";

export function Cart() {
  const { getProductById } = useProduct();
  const [reloadCart, setReloadCart] = useState(false);
  const [products, setProducts] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const { tableNumber } = useParams();

  useEffect(() => {
    (async () => {
      const idProductsCart = getProductsCart();
      const Quantity = getQuantityCart();
      setQuantity(Quantity);
      const productsArray = [];
      for await (const idProduct of idProductsCart) {
        const response = await getProductById(idProduct);
        productsArray.push(response);
      }
      setProducts(productsArray);
    })();
  }, [reloadCart]);

  const onReloadCart = () => setReloadCart((prev) => !prev);

  return (
    <div>
      <h1>Carrito</h1>
      {!products ? (
        <p>Cargando...</p>
      ) : size(products) === 0 ? (
        <div style={{ textAlign: "center" }}>
          <p>Tu carrito está vacío</p>
          <Link to={`/client/${tableNumber}/orders`}>
            <Button primary>Ver pedidos</Button>
          </Link>
        </div>
      ) : (
        <ListProductCart quantity={quantity} products={products} onReloadCart={onReloadCart} />
      )}
    </div>
  );
}
