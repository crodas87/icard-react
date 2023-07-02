import React from 'react'
import { useState,useEffect } from 'react';
import { Table, Image, Button, Icon, Pagination } from "semantic-ui-react"
import { map } from "lodash"
import "./TableIngredientAdmin.scss"
import { useIngredient } from '../../../../hooks';

export function TableIngredientAdmin(props) {
  const {updateIngredient, deleteIngredient} = props;
  const [currentPage, setCurrentPage] = useState(1);
  const {ingredients, getIngredients} = useIngredient();
  const [refetch, setRefetch] = useState(false)


  const handlePageChange = (_, { activePage }) => {
    setCurrentPage(activePage);
    onRefetch();
  };

  useEffect(() => {
    getIngredients(currentPage);
  }, [currentPage, refetch]);


    const onRefetch = () => setRefetch((prev) => !prev);

  return (
    <div className="table-container">
    <Table className="table-ingredient-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Ingrediente</Table.HeaderCell>
          <Table.HeaderCell>Stock</Table.HeaderCell>
          <Table.HeaderCell>Unidad de Medida</Table.HeaderCell>
          <Table.HeaderCell>Precio</Table.HeaderCell>
          <Table.HeaderCell>Categoria</Table.HeaderCell>
          <Table.HeaderCell>Proveedor</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {ingredients?map(ingredients.results, (ingredient, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={ingredient.image} />
            </Table.Cell>
            <Table.Cell>{ingredient.title}</Table.Cell>
            <Table.Cell>{ingredient.stock}</Table.Cell>
            <Table.Cell>{ingredient.um}</Table.Cell>
            <Table.Cell>{FormatoNumerico(ingredient.price)} Gs</Table.Cell>
            <Table.Cell>{ingredient?.category_data.title}</Table.Cell>
            <Table.Cell>{ingredient?.proveedores_data.nombre}</Table.Cell>

             <Actions
              ingredient={ingredient}
              updateIngredient={updateIngredient}
              deleteIngredient={deleteIngredient}
            />
          </Table.Row>
        )) : (
          <Table.Row>
            <Table.Cell colSpan="8">No hay productos disponibles.</Table.Cell>
          </Table.Row>
        )
        }
      </Table.Body>
      </Table>
      {ingredients && (
      <Pagination
        activePage={currentPage}
        totalPages={ingredients.total_pages}
        onPageChange={handlePageChange}
      />
    )}
   </div>
    
  )
}

function Actions(props) {
    const { ingredient, updateIngredient, deleteIngredient } = props;
  
    return (
      <Table.Cell textAlign="right">
        <Button icon onClick={() => updateIngredient(ingredient)}>
          <Icon name="pencil" />
        </Button>
        <Button icon negative onClick={() => deleteIngredient(ingredient)}>
          <Icon name="close" />
        </Button>
      </Table.Cell>
    );
  }

  function FormatoNumerico(valor){

    let numero= new Intl.NumberFormat('es-ES').format(valor)

    return numero;
  }