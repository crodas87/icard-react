import React, { useState, useEffect } from 'react'
import { Loader,Menu } from "semantic-ui-react"
import { useLocation,Outlet, Link  } from "react-router-dom";
import { HeaderPage, TableIngredientAdmin, AddEditIngredientForm } from "../../components/Admin"
import { ModalBasic } from "../../components/Common"
import { useIngredient } from "../../hooks"
import "./ProductAdmin.scss";

export function IngredientAdmin() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false)
    const { loading, ingredients, getIngredients, deleteIngredient } = useIngredient();



    useEffect(() => {
      async function fetchIngredients() {
        getIngredients();
      }
      fetchIngredients();
    }, [refetch]);

    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    const addIngredient = () => {
        setTitleModal("Agredar nuevo Ingrediente");
        setContentModal(
          <AddEditIngredientForm onClose={openCloseModal} onRefetch={onRefetch} />
        );
        openCloseModal();
};

const updateIngredient = (data) => {
    setTitleModal("Actualizar Ingrediente");
    setContentModal(
      <AddEditIngredientForm
        onClose={openCloseModal}
        onRefetch={onRefetch}
        ingredient={data}
      />
    );
    openCloseModal();
};

const onDeleteIngredient = async (data) => {
    const result = window.confirm(`¿Eliminar ingrediente ${data.title}?`);
    if (result) {
      console.log('El id a eliminar es ',data.id);
      await deleteIngredient(data.id);
      onRefetch();
    }
};



return (
    <>
        <HeaderPage title="Ingredientes" 
        btnTitle="Nuevo ingrediente"
        btnClick={addIngredient} 
       />

      

        {loading ?(
            <Loader active inline="centered">
                Cargando...
            </Loader> 
            
        ) : (
            <TableIngredientAdmin ingredients={ingredients} updateIngredient={updateIngredient} deleteIngredient={onDeleteIngredient} />
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
