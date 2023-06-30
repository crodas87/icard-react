import React, { useState, useEffect } from 'react'
import { Loader } from "semantic-ui-react"
import {TableIngredienteProductoAdmin, AddEditIngredienteProducto } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { useIngredienteProducto, useProduct , useIngredient} from "../../hooks"
import "./IngredienteProductoAdmin.scss";

export function IngredienteProductoAdmin() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false)
    const { loading,ingredienteProducto, getIngredienteProducto, deleteIngredienteProducto } = useIngredienteProducto();
    const {products,getProducts}=useProduct();
    const {ingredients,getIngredients}=useIngredient();


    useEffect(() => {
      async function fetchIngredienteProducto() {
        getIngredienteProducto();
      }
      fetchIngredienteProducto();

    }, []);


    useEffect(() => {
        async function fetchProducts() {
          getProducts();
        }
        fetchProducts();
      }, [refetch]);

      useEffect(() => {
        async function fetchIngredients() {
          getIngredients();
        }
        fetchIngredients();
      }, [refetch]);
    

    const openCloseModal = () => setShowModal((prev) => !prev);
   // const onRefetch = () => setRefetch((prev) => !prev);
    const onRefetch = () => setRefetch(true);

const addIngredienteProducto = () => {
        setTitleModal("Agregar Ingrediente");
        setContentModal(
          <AddEditIngredienteProducto ingredients={ingredients} onClose={openCloseModal} onRefetch={onRefetch} />
        );
        openCloseModal();
};

const updateIngredienteProducto  = (data) => {
    setTitleModal("Actualizar producto");
    setContentModal(
      <AddEditIngredienteProducto
        onClose={openCloseModal}
        onRefetch={onRefetch}
        ingredient={data}
      />
    );
    openCloseModal();
};

const onDeleteIngredienteProducto = async (data) => {
    const result = window.confirm(`¿Quitar ingrediente ${data.ingrediente_data.title}?`);
    if (result) {

      await deleteIngredienteProducto(data.idProducto,data.idIngrediente);
      onRefetch();
    }
};

useEffect(() => {
  if (refetch) {
    getIngredienteProducto(); // Vuelve a obtener los datos de ingredienteProducto
    setRefetch(false); // Reinicia el valor de refetch a false
  }
}, [refetch, getIngredienteProducto]);

return (
    <>

        {loading ?(
            <Loader active inline="centered">
                Cargando...
            </Loader> 
            
        ) : (
            <TableIngredienteProductoAdmin 
                  ingredients={ingredients} 
                  products={products} 
                  ingredienteProducto={ingredienteProducto}
                  addIngredienteProducto={addIngredienteProducto}
                  updateIngredienteProducto={updateIngredienteProducto} 
                  deleteIngredienteProducto={onDeleteIngredienteProducto} 
                  />
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
