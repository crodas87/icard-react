import React, { useEffect, useState } from 'react'
import { Table, Image, Button, Icon,Dropdown } from "semantic-ui-react"
import { map } from "lodash"
import {useIngredienteProducto} from '../../../../hooks'
import "./TableIngredienteProductoAdmin.scss"

export function TableIngredienteProductoAdmin(props) {
  const { products, updateIngredienteProducto, deleteIngredienteProducto,addIngredienteProducto } = props;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {ingredienteProducto,getIngredienteProducto} = useIngredienteProducto();
  const [disableBtn, setDisableBtn] = useState(true);
  const [ingredienteFormat, setIngredienteFormat] = useState([]);
  
  
  const handleProductChange = (event, { value }) => {
    const valor = products.find(p => p.id === value);
    localStorage.setItem('idp', JSON.stringify(valor.id));
    localStorage.setItem('idt', JSON.stringify(valor.title));
    setSelectedProduct(valor.id);

  };

  useEffect(() => {
    setIngredienteFormat(formatDropdownData(products));
  }, [products]);

  useEffect(() => {
    const selectedProductId = localStorage.getItem('idp');
    if (selectedProduct) {
      if (selectedProduct) {
        getIngredienteProducto(selectedProduct);
        setDisableBtn(false); // Activar el botón "Agregar ingredientes"
      } else {
        setDisableBtn(true); // Desactivar el botón "Agregar ingredientes"
      }
    }else if(selectedProductId){
      setSelectedProduct(parseInt(selectedProductId));

    }
  }, [selectedProduct]);
        console.log('ingredienteProducto ',ingredienteProducto);

  return (
    <>
    <Button
        positive
        onClick={addIngredienteProducto}
        disabled={disableBtn}>
      Agregar ingredientes
    </Button>
    <Dropdown
        placeholder='Seleccionar producto'
        fluid
        selection
        options={ingredienteFormat}
        onChange={handleProductChange}
        value={selectedProduct}
      />
    
      {!ingredienteProducto ? (
        <p>No hay ingredientes asociados al producto seleccionado</p>
      ) : (
    <Table className="table-product-admin">
      <Table.Header>
        <Table.Row>
        <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Ingrediente</Table.HeaderCell>
          <Table.HeaderCell>Cantidad</Table.HeaderCell>
          <Table.HeaderCell>UM</Table.HeaderCell>
          <Table.HeaderCell>Acciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(ingredienteProducto, (ingrediente, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={ingrediente.ingrediente_data.image} />
            </Table.Cell>
            <Table.Cell>{ingrediente.ingrediente_data.title}</Table.Cell>
            <Table.Cell>{ingrediente.cantidad}</Table.Cell>
            <Table.Cell>{ingrediente.ingrediente_data.um}</Table.Cell>
            <Table.Cell className="status">
              
            </Table.Cell>

             <Actions
              ingredienteProducto={ingrediente}
              updateIngredienteProducto={updateIngredienteProducto}
              deleteIngredienteProducto={deleteIngredienteProducto}
            />
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
    
  )}
  </>
  )
}

function Actions(props) {
    const { ingredienteProducto, updateIngredienteProducto, deleteIngredienteProducto } = props;
  
    return (
      <Table.Cell textAlign="right">
        <Button icon onClick={() => updateIngredienteProducto(ingredienteProducto)}>
          <Icon name="pencil" />
        </Button>
        <Button icon negative onClick={() => deleteIngredienteProducto(ingredienteProducto)}>
          <Icon name="close" />
        </Button>
      </Table.Cell>
    );
  }

  function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.title,
        value: item.id
    }))
}

