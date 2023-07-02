import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";
import { usePayment, useOrder } from "../../../../hooks";

import "./PaymentDetail.scss";

export function PaymentDetail(props) {
  const { payment, orders, openCloseModal, onReloadOrders } = props;
  const { closePayment } = usePayment();
  const { closeOrder } = useOrder();

  const getIconPayment = (key) => {
    if (key === "CARD") return "credit card outline";
    if (key === "CASH") return "money bill alternate outline";
    return null;
  };


 

  const onCloseTable = async () => {
    const result = window.confirm(
      "¿Cerrar mesa para ser ocupada por otros clientes?"
    );
    if (result) {
      await closePayment(payment.id);

      for await (const order of orders) {
        await closeOrder(order.id);
      }

      onReloadOrders();
      openCloseModal();
    }
  };

  return (
    <div className="payment-detail">
      <Table striped>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Mesa:</Table.Cell>
            <Table.Cell>{payment.table_data.number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Total:</Table.Cell>
            <Table.Cell>{FormatoNumerico(payment.totalPayment)} Gs.</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Forma de pago</Table.Cell>
            <Table.Cell>
              <Icon name={getIconPayment(payment.paymentType)} />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Button primary fluid onClick={onCloseTable}>
       Generar Ticket
      </Button>
    </div>
  );
}
function FormatoNumerico(valor){

  let numero= new Intl.NumberFormat('es-ES').format(valor)

  return numero;
}