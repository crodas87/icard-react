import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import * as XLSX from 'xlsx';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { Dropdown, Table, Container, Icon } from 'semantic-ui-react';
import './ReporteVentas.scss';
import { map } from "lodash"
import { getOrdersRangeDateApi } from "../../../api/orders";

export function ReporteVentas() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [fechaInicial, setFechaInicial] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);
  const [tipoPago, setTipoPago] = useState('Todos');
  const [data, setData] = useState([]);
  const [totalVenta, setTotalVenta] = useState(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (fechaInicial && fechaFinal) {
      getOrders();
    }
  }, [fechaInicial, fechaFinal]);

  const getOrders = async () => {
    const fechaIn = format(fechaInicial, 'yyyy-MM-dd');
    const fechaFin = format(fechaFinal, 'yyyy-MM-dd');
    const response = await getOrdersRangeDateApi(fechaIn, fechaFin);
    setOrders(response);
  };

  const handleSearch = () => {
    if (startDate && endDate) {
      setFechaInicial(startDate);
      setFechaFinal(endDate);
    } else {
      // Mostrar un mensaje de error o realizar alguna otra acción
      console.log('Por favor, seleccione un rango de fechas válido');
    }
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.table_to_book(document.getElementById('table'));
                  XLSX.writeFile(workbook, 'reporte_ventas.xlsx');
  };

  useEffect(() => {
    const sumaImportes = orders.reduce(
      (total, { product_data, quantity }) =>
        parseInt(total) + parseInt(product_data.price) * parseInt(quantity),
      0
    );
    setTotalVenta(sumaImportes);
    setData(orders);
  }, [orders]);

  return (
    <div className="reporte-ventas-container">
      <h2>Reporte de Ventas</h2>
      <div className="date-range-container">
        <h3>Rango de Fechas</h3>
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setDateRange(update);
          }}
          isClearable={true}
        />
      </div>
      <div className="payment-type-container">
        <h3>Tipo de Pago</h3>
        <Dropdown
          placeholder="Tipo de Pago"
          selection
          options={[
            { key: 'Todos', value: 'Todos', text: 'Todos' },
            { key: 'Efectivo', value: 'Efectivo', text: 'Efectivo' },
            { key: 'Tarjeta', value: 'Tarjeta', text: 'Tarjeta' },
          ]}
          value={tipoPago}
          onChange={(e, { value }) => setTipoPago(value)}
        />
      </div>
      <div className="button-container">
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={exportToExcel}>XLSX</button>
      </div>
      {data.length > 0 && (
        <div>
          <Container className="total-venta-container">
            <Icon name="cart" size="big" />
            <span>Total Venta: {totalVenta}</span>
          </Container>
          <div className="table-container">
            <Table id="table">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nro de Orden</Table.HeaderCell>
                  <Table.HeaderCell>Fecha</Table.HeaderCell>
                  <Table.HeaderCell>Producto</Table.HeaderCell>
                  <Table.HeaderCell>Importe</Table.HeaderCell>
                  <Table.HeaderCell>Cantidad</Table.HeaderCell>
                  <Table.HeaderCell>Total</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {map(data, (item, index) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.id}</Table.Cell>
                    <Table.Cell>{format(new Date(item.created_at), 'dd/MM/yyyy HH:mm:ss')}</Table.Cell>
                    <Table.Cell>{item.product_data.title}</Table.Cell>
                    <Table.Cell>{item.product_data.price}</Table.Cell>
                    <Table.Cell>{item.quantity}</Table.Cell>
                    <Table.Cell>{parseInt(item.product_data.price) * parseInt(item.quantity)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};
