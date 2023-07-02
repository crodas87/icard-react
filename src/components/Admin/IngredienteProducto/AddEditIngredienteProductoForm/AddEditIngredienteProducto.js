import React, { useState, useEffect } from 'react'
import { Form, Button, Dropdown } from "semantic-ui-react"
import { map } from 'lodash';
import { useFormik } from "formik"
import * as Yup from "yup"
import { useIngredient, useIngredienteProducto } from "../../../../hooks"
import "./AddEditIngredienteProducto.scss"

export function AddEditIngredienteProducto(props) {
    const { onClose,ingredient,onRefetch } = props
    const [ingredienteFormat, setIngredienteFormat] = useState([]);
    const { addIngredienteProducto, updateIngredienteProducto } = useIngredienteProducto();
    const { ingredients, getIngredients } = useIngredient();
    


    useEffect(() => {
       getIngredients();
      }, []);

    useEffect(() => {
        setIngredienteFormat(formatDropdownDataIngrediente(ingredients));
      }, [ingredients]);


    const formik = useFormik({
        initialValues: initialValues(ingredient),
        validationSchema: Yup.object(ingredient ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            console.log('ingredient '.ingredient);
            if (ingredient) await updateIngredienteProducto(ingredient.id, formValue);
            else await addIngredienteProducto(formValue);

           // localStorage.removeItem("idt");
           // localStorage.removeItem("idp");
            onRefetch();

            onClose();
        },
    });


    const productName = (localStorage.getItem('idt') || '').replace(/"/g, '');

    return (
        <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>


            <Form.Input
                name="producto"
                value={productName}
                readOnly 
            
           />

            <Dropdown 
                placeholder="Ingrediente" 
                fluid 
                selection 
                search 
                options={ingredienteFormat}
                value={formik.values.idIngrediente}
                error={formik.errors.idIngrediente}
                onChange={(_, data) => formik.setFieldValue('idIngrediente', data.value)}
             />
              <Form.Input 
                type="number" 
                name="cantidad" 
                placeholder="cantidad"
                value={formik.values.cantidad}
                onChange={formik.handleChange}
                error={formik.errors.cantidad}
             /> 

           
            <Button type='submit' primary fluid content={ingredient ? "Actualizar" : "Crear"} />        
        </Form>
    )
}


function formatDropdownDataIngrediente(data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.title,
        value: item.id
    }))
}

function initialValues(data) {
    return {
      idProducto: data?.idProducto || localStorage.getItem('idp'),
      idIngrediente: data?.id || "",
      cantidad: data?.cantidad || "",

    };
}

function newSchema() {
    return {
        idProducto: Yup.number().required(true),
        idIngrediente: Yup.number().required('Debe elegir un ingrediente'),
        cantidad: Yup.number('Debe cargar la cantidad del ingrediente que utiliza el producto')
    };
}

function updateSchema() {
    return {
        idProducto: Yup.number().required(true),
        idIngrediente: Yup.number().required(true),
        cantidad: Yup.number()       
    };
}
