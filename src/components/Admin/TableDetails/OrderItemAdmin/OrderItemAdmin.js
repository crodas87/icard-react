import React from 'react'
import { Button, Image,Label,Grid } from "semantic-ui-react"
import classNames from "classnames"
import { useOrder } from "../../../../hooks"
import { ORDER_STATUS } from "../../../../utils/constants"
import "./OrderItemAdmin.scss"
import moment from "moment"
import "moment/locale/es"

export function OrderItemAdmin(props) {
    const { order, onReloadOrders } = props
    const { title, image } = order.product_data;
    const { checkDeliveredOrder } = useOrder();

    const onCheckDeliveredOrder = async () => {
        await checkDeliveredOrder(order.id);
        onReloadOrders();
    };
    
    return (
        <div className={classNames("order-item-admin", {
            [order.status.toLowerCase()]: true,

        })}>
            <div className='order-item-admin__time'>
                <span>{moment(order.created_at).format("HH:mm")}</span> {" - "}
                <span>{moment(order.created_at).startOf('seconds').fromNow()}</span>
            </div>

            <div className='order-item-admin__product'>

                <Image src={image} circular />
                <p>{title}</p>
            </div>
            <div className='order-item-admin__quantity'>
                    <Label color="red" key='red'>
                           Cantidad: {_.capitalize(order.quantity)}
                    </Label>

            </div>

            {order.status === ORDER_STATUS.PENDING && (
                <Button primary onClick={onCheckDeliveredOrder}>
                    Marcar entregado
                </Button>
            )}
        </div>
    )
}
