import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import { usePayment, useOrder, useIngredient } from "../../../../hooks";
import {LOCAL_API,LOGO} from '../../../../utils/constants'
import { size } from "lodash";
import moment from 'moment';
import 'moment/locale/es';
import  './paymetDetailTicket.scss';
export function PaymentDetailTicket(props) {
    const {orders,payment,openCloseModal,onReloadOrders} = props;

    if(size(orders)==0){
       onReloadOrders();   
    }
    const total = orders.reduce((acc, product) => acc + parseInt(product.product_data.price)*parseInt(product.quantity), 0);
    const date = moment().locale('es').format('D [de] MMMM [de] YYYY [a las] h:mm a');
    const {closePayment}=usePayment();
    const {closeOrder}=useOrder();
    const {updateIngredientStock,error} = useIngredient();

    console.log('orders ',orders);
    const onCloseTable = async () => {
      try {
        const pay = await closePayment(payment.id);
        console.log("PAY ", pay);
        if (pay.status == 200) {
          const closePromises = orders.map(async (order) => {
            try {
              const close = await closeOrder(order.id);
              if (close.status == 200) {
                try {
                  const result =await updateIngredientStock(order.id);
                  if(result.error){
                    window.alert(result.error);
                  }
                  
                } catch (error) {
                  console.error("Error al descontar el stock de la orden:",order.id," Error:", error);
                }
               
              }
            } catch (error) {
              console.error("Error al cerrar orden:", error);
              // Puedes agregar lógica adicional en caso de error
            }
          });
          await Promise.all(closePromises);
        }
        openCloseModal();
        onReloadOrders();
        window.print();
        redirectPage();
        // window.location.reload();
      } catch (error) {
        throw error;
      }
    };
    

  return (
    
    <div className="ticket">
       <div className="ticket-header">
        <img src={LOGO} alt="Parador Liza" className="ticket-logo" />
        <h1 className="ticket-title">Parador Liza</h1>
      </div>
      <div className="ticket-contact">
      <p className="ticket-contact-item">Pirayu - Paraguay</p>
        <p className="ticket-contact-item">(0986) 342 071</p>
        <p className="ticket-contact-item">moodparadorliza@gmail.com</p>
      </div>
      <div className="ticket-body">
        <div className="ticket-table-number">Pedido Nro. {orders[0].table_data.number}</div>
        <table className="ticket-products">
          <thead>
            <tr>
              <th>Cant</th>
              <th>Desc</th>
              <th>PUnit</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
          {orders.map(product => (
              <tr key={product.id}>
                <td>{product.quantity}</td>
                <td>{product.product_data.title}</td>
                <td>{FormatoNumerico(parseInt(product.product_data.price))}</td>
                <td>{FormatoNumerico(parseInt(product.product_data.price)*parseInt(product.quantity))}</td>
              </tr>
            ))}

      </tbody>
        </table>
      </div>

      <Header as='h3'>Total: {FormatoNumerico(total)} Gs.</Header>
      <div className="ticket-footer">
        <p className="ticket-date">{date}</p>
        <p className="ticket-message">¡Gracias por su visita!</p>
      </div>
      <div className="ticket-print"> 
        <Button primary onClick={onCloseTable}>Imprimir</Button>
      </div>
     
    </div>
  );

}

function FormatoNumerico(valor){

    let numero= new Intl.NumberFormat('es-ES').format(valor)

    return numero;
  }
  function redirectPage() {
    var initialPage = '/admin';
    location.replace(LOCAL_API + initialPage);
  }