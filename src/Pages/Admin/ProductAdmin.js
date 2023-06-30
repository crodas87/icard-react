import React, { useState, useEffect } from 'react'
import { Loader,Menu } from "semantic-ui-react"
import { useLocation,Outlet, Link  } from "react-router-dom";
import { HeaderPage, TableProductAdmin, AddEditProductForm } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { useProduct } from "../../hooks"
import "./ProductAdmin.scss";

export function ProductAdmin() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false)
    const { loading, products, getProducts, deleteProduct } = useProduct();



    useEffect(() => {
      async function fetchProducts() {
        getProducts(1);
      }
      fetchProducts();
    }, [refetch]);

    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    const addProduct = () => {
        setTitleModal("Nuevo producto");
        setContentModal(
          <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} />
        );
        openCloseModal();
};

const updateProduct = (data) => {
    setTitleModal("Actualizar producto");
    setContentModal(
      <AddEditProductForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        product={data}
      />
    );
    openCloseModal();
};

const onDeleteProduct = async (data) => {
    const result = window.confirm(`¿Eliminar producto ${data.title}?`);
    if (result) {
      console.log('El id a eliminar es ',data.id);
      await deleteProduct(data.id);
      onRefetch();
    }
};
console.log('Productos: ',products);


return (
    <>
        <HeaderPage title="Productos" 
        btnTitle="Nuevo producto"
        btnClick={addProduct} 
       />

      

        {loading ?(
            <Loader active inline="centered">
                Cargando...
            </Loader> 
            
        ) : (
            <TableProductAdmin products={products} updateProduct={updateProduct} deleteProduct={onDeleteProduct} />
        )}

        <ModalBasic 
            show={showModal} 
            onClose={openCloseModal} 
            title={titleModal} 
            children={contentModal}
         />
    </>
  )
}
