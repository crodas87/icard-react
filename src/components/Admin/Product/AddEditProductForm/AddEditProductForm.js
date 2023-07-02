import React, { useState, useEffect, useCallback } from 'react'
import { Form, Image, Button, Dropdown, Checkbox,Loader,Dimmer } from "semantic-ui-react"
import axios from 'axios';
import { map } from 'lodash';
import { useDropzone } from "react-dropzone"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useCategory, useProduct } from "../../../../hooks"
import {UPLOAD_IMAGE,IMAGE_API_KEY} from './../../../../utils/constants'
import "./AddEditProductForm.scss"

export function AddEditProductForm(props) {
    const { onClose, onRefetch, product } = props
    const [categoriesFormat, setCategoriesFormat] = useState([]);
    const [previewImage, setPreviewImage] = useState(product ? product?.image : null);
    const { categories, getCategories } = useCategory();
    const { addProduct, updateProduct } = useProduct()
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        getCategories();
    }, []);

    useEffect(() => {
        setCategoriesFormat(formatDropdownData(categories));
      }, [categories]);
    
    const formik = useFormik({
        initialValues: initialValues(product),
        validationSchema: Yup.object(product ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            console.log('FORMIK VALUE ',formValue);
            if (product) await updateProduct(product.id, formValue);
            else await addProduct(formValue);

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
                placeholder="Nombre del producto" 
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
                name="codbarra" 
                placeholder="Código Barra"
                value={formik.values.codbarra}
                onChange={formik.handleChange}
                error={formik.errors.codbarra}
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

            <div className='add-edit-product-form__active'>
                <Checkbox 
                    toggle 
                    checked={formik.values.active} 
                    onChange={(_, data) => formik.setFieldValue('active', data.checked)}
                 />
                Producto activo
            </div>

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

                    <Button type='submit' primary fluid content={product ? "Actualizar" : "Crear"} />  
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

function initialValues(data) {
    return {
      title: data?.title || "",
      stock: data?.stock || "",
      codbarra: data?.codbarra || "",
      price: data?.price || "",
      category: data?.category || "",
      active: data?.active ? true : false,
      image: "",
    };
}

function newSchema() {
    return {
      title: Yup.string().required(true),
      stock: Yup.number(),
      codbarra: Yup.string(),
      price: Yup.number(),
      category: Yup.number().required(true),
      active: Yup.boolean().required(true),
      image: Yup.string().required(true),
    };
}

function updateSchema() {
    return {
      title: Yup.string().required(true),
      stock: Yup.number(),
      codbarra: Yup.string(),
      price: Yup.number(),
      category: Yup.number().required(true),
      active: Yup.boolean().required(true),
      image: Yup.string(),
    };
}
