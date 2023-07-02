import React, { useEffect } from 'react';
import { Loader,Label } from "semantic-ui-react"
import { HeaderPage, TablesListAdmin } from "../../components/Admin"
import { useTable } from "../../hooks"

export function OrdersAdmin() {
  const { loading, tables, getTables } = useTable();

  useEffect(() => {getTables();}, [])

  return (
    <>
    <div className='label-order-state'>
                    <Label color="black" key='black'>
                            {_.capitalize('Vacio')}
                    </Label>
                    <Label color="red" key='red'>
                            {_.capitalize('Pedido')}
                    </Label>
                    <Label color="brown" key='brown'>
                            {_.capitalize('Ocupado')}
                    </Label>
                    <Label color="green" key='green'>
                            {_.capitalize('Cuenta')}
                    </Label>

        </div>
        <HeaderPage title="" />
        {loading ? (
          <Loader active inline="centered">
            Cargando...
          </Loader>
        ) : (
          <TablesListAdmin tables={tables} />
        )}
    </>
  )
}
