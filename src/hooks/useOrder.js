import { useState } from "react";
import {
  getOrdersByTableApi,
  checkDeliveredOrderApi,
  addOrderToTableApi,
  closeOrderApi,
  addPaymentToOrderApi,
  getOrdersByPaymentApi,
  getOrdersByTableAndProductApi,
  updateOrderQuantityApi,
} from "../api/orders";

export function useOrder() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orders, setOrders] = useState(null);


  const getOrdersByTable = async (idTable, status, ordering) => {
    try {
      setLoading(true);
      const response = await getOrdersByTableApi(idTable, status, ordering);
      setLoading(false);
      setOrders(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };
  const getOrdersByTableAndProduct = async (idTable, idProduct, close) => {
    try {
      const response = await getOrdersByTableAndProductApi(idTable,idProduct,close);
      return response;

    } catch (error) {
      setError(error);
    }
  };

  const checkDeliveredOrder = async (idOrder) => {
    try {
      await checkDeliveredOrderApi(idOrder);
    } catch (error) {
      setError(error);
    }
  };

  const addOrderToTable = async (idTable, idProduct,quantity) => {
    try {
      await addOrderToTableApi(idTable, idProduct,quantity);
    } catch (error) {
      setError(error);
    }
  };
  const addPaymentToOrder = async (idOrder, idPayment) => {
    try {
      await addPaymentToOrderApi(idOrder, idPayment);
    } catch (error) {
      setError(error);
    }
  };
  const closeOrder = async (idOrder) => {
    try {
      await closeOrderApi(idOrder);
    } catch (error) {
      setError(error);
    }
  };
  const getOrdersByPayment = async (idPayment) => {
    try {
      return await getOrdersByPaymentApi(idPayment);
    } catch (error) {
      setError(error);
    }
  };

  
  const updateQuantity = async (idOrder, idTable, idProduct,quantity) => {
    try {
      setLoading(true);
      const response = await updateOrderQuantityApi(idOrder, idTable, idProduct,quantity);
      console.log('response',response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return {
    
    loading,
    error,
    orders,
    getOrdersByTable,
    checkDeliveredOrder,
    addOrderToTable,
    addPaymentToOrder,
    closeOrder,
    getOrdersByPayment,
    getOrdersByTableAndProduct,
    updateQuantity
  };
}
