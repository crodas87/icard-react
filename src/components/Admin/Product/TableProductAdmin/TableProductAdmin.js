import React from 'react'
import { useState,useEffect } from 'react';
import { Table, Image, Button, Icon, Pagination  } from "semantic-ui-react"
import { useProduct } from "../../../../hooks"
import "./TableProductAdmin.scss"

export function TableProductAdmin(props) {
  const { updateProduct, deleteProduct } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const {products, getProducts} = useProduct();
  const [refetch, setRefetch] = useState(false)

  const handlePageChange = (_, { activePage }) => {
    setCurrentPage(activePage);
    onRefetch();
  };

  useEffect(() => {
    getProducts(currentPage);
  }, [currentPage, refetch]);

    const onRefetch = () => setRefetch((prev) => !prev);

  return (
    <div className="table-container">
    <Table className="table-product-admin">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Imagen</Table.HeaderCell>
          <Table.HeaderCell>Producto</Table.HeaderCell>
          <Table.HeaderCell>Stock</Table.HeaderCell>
          <Table.HeaderCell>CodBarra</Table.HeaderCell>
          <Table.HeaderCell>Precio</Table.HeaderCell>
          <Table.HeaderCell>Categoria</Table.HeaderCell>
          <Table.HeaderCell>Activo</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        { products?(products.results.map((product, index) => (
          <Table.Row key={index}>
            <Table.Cell width={2}>
              <Image src={product.image} />
            </Table.Cell>
            <Table.Cell>{product.title}</Table.Cell>
            <Table.Cell>{product.stock}</Table.Cell>
            <Table.Cell>{product.codbarra}</Table.Cell>
            <Table.Cell>{FormatoNumerico(product.price)} Gs</Table.Cell>
            <Table.Cell>{product.category_data.title}</Table.Cell>
            <Table.Cell className="status">
              {product.active ? <Icon name="check" /> : <Icon name="close" />}
            </Table.Cell>

             <Actions
              product={product}
              updateProduct={updateProduct}
              deleteProduct={deleteProduct}
            />
          </Table.Row>
        ))) : (
          <Table.Row>
            <Table.Cell colSpan="8">No hay productos disponibles.</Table.Cell>
          </Table.Row>
        )
      }
      
      </Table.Body>

    </Table>
    {products && (
      <Pagination
        activePage={currentPage}
        totalPages={products.total_pages}
        onPageChange={handlePageChange}
      />
    )}
   </div>
     
  )
}

function Actions(props) {
    const { product, updateProduct, deleteProduct } = props;



      return (
      <Table.Cell textAlign="right">
        <Button icon onClick={() => updateProduct(product)}>
          <Icon name="pencil" />
        </Button>
        <Button icon negative onClick={() => deleteProduct(product)}>
          <Icon name="close" />
        </Button>
      </Table.Cell>
    );
  }

  function FormatoNumerico(valor){

    let numero= new Intl.NumberFormat('es-ES').format(valor)

    return numero;
  }