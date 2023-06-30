import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { forEach, size } from "lodash";
import { HeaderPage, AddOrderForm } from "../../components/Admin";
import { ModalBasic } from "../../components/Common";
import {
  ListOrderAdmin,
  PaymentDetailTicket
} from "../../components/Admin/TableDetails";
import { useOrder, useTable, usePayment} from "../../hooks";


export function TableDetailsAdmin() {
  const [reloadOrders, setReloadOrders] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const { id } = useParams();
  const { loading, orders, getOrdersByTable, addPaymentToOrder} = useOrder();
  const { table, getTable } = useTable();
  const {createPayment,getPaymentByTable} = usePayment();
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
      getOrdersByTable(id, "", "ordering=-status, created_at");

  }, [id, reloadOrders]);

  useEffect(() => {getTable(id);}, [id]);

  useEffect(() => {
    (async () => {
      
      const response = await getPaymentByTable(id);
      if (size(response) > 0) setPaymentData(response[0])

    })();
  }, [reloadOrders]);


  const onReloadOrders = () => setReloadOrders((prev) => !prev);
  const openCloseModal = () => setShowModal((prev) => !prev);

  const oncreatePayments = async()=> {

    if(size(orders)>0){
    const result=confirm('Estas seguro que deseas pasarle la cuenta?');
    if (result){
      let totalPayment = 0;
      forEach(orders,(order)=>{
        totalPayment+=Number(order.product_data.price)
      });
       const paymentData={
        table:id,
        totalPayment:totalPayment,
        paymentType:"CASH",
        statusPayment:"PENDING"
       };
       try {
        const payment = await createPayment(paymentData);

            if(payment!=undefined){
                for await(const order of orders){
                    const val = await addPaymentToOrder(order.id, payment.id)
      
                  }
          }

            onReloadOrders();
       } catch (error) {
        throw error;
       }
       
      }
    }else{
      alert('!No ha generado Pedidos')
    }

  };


  return (
    <>
      <HeaderPage
        title={`Pedido Nro ${table?.number || ""}`}
        btnTitle={paymentData&&size(orders)>0?"Ver Cuenta":"Añadir pedido"}
        btnClick={openCloseModal}
        btnTitleTwo={!paymentData?"Pedir Cuenta":null}
        btnClickTwo={oncreatePayments}
      />
      {loading ? (
        <Loader active inline="centered">
          Cargando...
        </Loader>
      ) : (
        <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
      )}
    
          <ModalBasic
            show={showModal}
            onClose={openCloseModal}
            title="">
            {(paymentData)?(
                 
                 <PaymentDetailTicket 
                 payment={paymentData}
                 products={orders}
                 openCloseModal={openCloseModal}
                 onReloadOrders={onReloadOrders}
               />

             ):
             (
                 <AddOrderForm orders = {orders} idTable={id} openCloseModal={openCloseModal} onReloadOrders={onReloadOrders}/>
             )}
            </ModalBasic>
    
    </>
  );
}
