import React, { useState, useEffect, useCallback } from 'react'
import { Form, Image, Button, Dropdown,Loader,Dimmer  } from "semantic-ui-react"
import { map } from 'lodash';
import axios from 'axios';
import { useDropzone } from "react-dropzone"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useCategory, useIngredient,useProveedores } from "../../../../hooks"
import {UPLOAD_IMAGE,IMAGE_API_KEY} from './../../../../utils/constants'
import "./AddEditIngredientForm.scss"

export function AddEditIngredientForm(props) {
    const { onClose, onRefetch, ingredient } = props
    const [categoriesFormat, setCategoriesFormat] = useState([]);
    const [proveedoresFormat, setProveedoresFormat] = useState([]);
    const [previewImage, setPreviewImage] = useState(ingredient ? ingredient?.image : null);
    const { categories, getCategories } = useCategory();
    const { proveedores, getProveedores } = useProveedores();
    const { addIngredient, updateIngredient } = useIngredient()
    const [isLoading, setIsLoading] = useState(false);


    console.log('ingredient ',ingredient);
    
    useEffect(() => {
        getCategories("ING");
    }, []);

    useEffect(() => {
        setCategoriesFormat(formatDropdownData(categories));
      }, [categories]);

      useEffect(() => {
        getProveedores();
    }, []);

    useEffect(() => {
        setProveedoresFormat(formatDropdownDataProveedores(proveedores));
      }, [proveedores]);
    
    const formik = useFormik({
        initialValues: initialValues(ingredient),
        validationSchema: Yup.object(ingredient ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            console.log(formValue);
            if (ingredient) await updateIngredient(ingredient.id, formValue);
            else await addIngredient(formValue);

            onRefetch();
            onClose();
        },
    });

    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append("key", IMAGE_API_KEY); // Reemplaza con tu clave de API
        formData.append("image", image);
      
        const response = await axios.post(UPLOAD_IMAGE, formData);
      
        if (response.data.success) {
          return response.data;
        }
      
        throw new Error("Error al cargar la imagen en el servidor");
      };

      const onDrop = useCallback(async (acceptedFile) => {
        const file = acceptedFile[0];
        await formik.setFieldValue('image', file);
        setPreviewImage(URL.createObjectURL(file));
        setIsLoading(true);
        
        try {
          const imageUrl = await uploadImage(file);
          await formik.setFieldValue('image', imageUrl.data.image.url)

        } catch (error) {
          console.log('Error al subir la imagen:', error.message);
        } finally{
          setIsLoading(false);

        }
      }, []);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png'],
           },
        noKeyboard: true,
        multiple: false,
        onDrop,
      });
    
  
    return (
        <Form className="add-edit-product-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
                name="title" 
                placeholder="Nombre del ingrediente" 
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.errors.title}
             />
            <Form.Input 
                type="number" 
                name="price" 
                placeholder="Precio"
                value={formik.values.price}
                error={formik.errors.price}
                onChange={formik.handleChange}
             
             />
            <Form.Input 
                type="number" 
                name="stock" 
                placeholder="Stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                error={formik.errors.stock}
             />

            <Form.Input 
                name="um" 
                placeholder="Unidad de Medida"
                value={formik.values.um}
                onChange={formik.handleChange}
                error={formik.errors.um}
             />

            <Dropdown 
                placeholder="Categoría" 
                fluid 
                selection 
                search 
                options={categoriesFormat}
                value={formik.values.category}
                error={formik.errors.category}
                onChange={(_, data) => formik.setFieldValue('category', data.value)}
             />
            <Dropdown 
                placeholder="Proveedor" 
                fluid 
                selection 
                search 
                options={proveedoresFormat}
                value={formik.values.proveedor}
                error={formik.errors.proveedor}
                onChange={(_, data) => formik.setFieldValue('proveedor', data.value)}
             />

            <Button
                type="button"
                fluid
                {...getRootProps()}
                color={formik.errors.image && "red"}
                
            >
                {previewImage ? "Cambiar imagen" : "Subir imagen"}
            </Button>
            <input {...getInputProps()} />
            <Image src={previewImage} />
            {isLoading ? (
                  <Dimmer active inverted>
                    <Loader inverted>Cargando</Loader>
                  </Dimmer>
           ) : (

            <Button type='submit' primary fluid content={ingredient ? "Actualizar" : "Crear"} />   
           )}      

                 
        </Form>
    )
}

function formatDropdownData(data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.title,
        value: item.id
    }))
}
function formatDropdownDataProveedores(data) {
    return map(data, (item) => ({
        key: item.id,
        text: item.nombre,
        value: item.id
    }))
}

function initialValues(data) {
    return {
      title: data?.title || "",
      stock: data?.stock || "",
      um: data?.um || "",
      price: data?.price || "",
      category: data?.category || "",
      proveedor: data?.proveedor || "",
      image: "",
    };
}

function newSchema() {
    return {
      title: Yup.string().required(true),
      stock: Yup.number(),
      um: Yup.string(),
      price: Yup.number(),
      category: Yup.number().required(true),
      proveedor: Yup.number().required(true),
      image: Yup.string().required(true),
    };
}

function updateSchema() {
    return {
      title: Yup.string().required(true),
      stock: Yup.number(),
      um: Yup.string(),
      price: Yup.number(),
      category: Yup.number().required(true),
      proveedor: Yup.number().required(true),
      image: Yup.string(),
    };
}
