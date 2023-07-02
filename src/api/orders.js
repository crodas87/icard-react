import { BASE_API, ORDER_STATUS } from "../utils/constants";

export async function getOrdersByTableApi(idTable, status = "", ordering = "") {
  try {
    const tableFilter = `table=${idTable}`;
    const statusFilter = `status=${status}`;
    const closeFilter = "close=False";
    const productFilter="";

    const url = `${BASE_API}/api/orders/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}&${productFilter}`;
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}
export async function getOrdersByTableAndProductApi(idTable, idProduct,close) {
  try {
    let closed="";
    const tableFilter = `table=${idTable}`;
    const productFilter=`product=${idProduct}`;
    if(close==false){closed=`&close=${close}`};

    console.log("closed =>",closed);
    const url = `${BASE_API}/api/orders/?${tableFilter}&${productFilter}${closed}`;
    
    console.log("URL =>",url);
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}


export async function getOrdersRangeDateApi(startDate, EndDate, mesa, producto) {
  try {
    const closed="close=true";
    const startDateFilter =startDate? `&start_date=${startDate}`:"";
    const endDateFilter=EndDate?`&end_date=${EndDate}`:"";
    const tableFilter =mesa?`&table=${mesa}`:"";
    const productFilter =producto?`product=${producto}`:"";


    console.log("closed =>",closed);
    const url = `${BASE_API}/api/orders/?${closed}${startDateFilter}${endDateFilter}${tableFilter}${productFilter}`;
    
    console.log("URL =>",url);
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    throw error;
  }
}


export async function checkDeliveredOrderApi(id) {
  try {
    const url = `${BASE_API}/api/orders/${id}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: ORDER_STATUS.DELIVERED,
      }),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}



export async function addOrderToTableApi(idTable, idProduct, quantity) {
  try {
    console.log('addOrderToTableApi');
    console.log('(',idTable,')(', idProduct,')(', quantity,')');
    const url = `${BASE_API}/api/orders/`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: ORDER_STATUS.PENDING,
        table: idTable,
        product: idProduct,
        quantity:quantity
        
      }),
    };
    await fetch(url, params);
  } catch (error) {
    throw error;
  }
}

export async function addPaymentToOrderApi(idOrder, idPayment) {
  try {
    const url = `${BASE_API}/api/orders/${idOrder}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        payment: idPayment,
      }),
    };
   const result= await fetch(url, params);

  } catch (error) {
    throw error;
  }
}

export async function closeOrderApi(idOrder) {
  try {
    const url = `${BASE_API}/api/orders/${idOrder}/`;
    const params = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        close: true,
      }),
    };
    await fetch(url, params);
  } catch (error) {
    throw error;
  }
}

export async function getOrdersByPaymentApi(idPayment) {
  try {
    const paymentFilter = `payment=${idPayment}`;

    const url = `${BASE_API}/api/orders/?${paymentFilter}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

  export async function updateOrderQuantityApi(idOrder, idTable, idProduct,quantity) {
    try {
      const url = `${BASE_API}/api/orders/${idOrder}/`;
      const params = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          close: false,
          table:idTable,
          product:idProduct,
          quantity:quantity
        }),
      };
      const result= await fetch(url, params);
      return result;
    } catch (error) {
      throw error;
    }
  }