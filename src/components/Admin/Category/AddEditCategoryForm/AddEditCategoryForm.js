import React, {  useState, useCallback } from 'react'
import { Form, Image, Button,Dropdown,Loader,Dimmer  } from "semantic-ui-react";
import axios from 'axios';
import { useDropzone } from "react-dropzone"
import slugify from 'react-slugify';
import { useFormik } from "formik"
import * as Yup from "yup"
import { useCategory } from "../../../../hooks"
import {UPLOAD_IMAGE,IMAGE_API_KEY} from './../../../../utils/constants'
import "./AddEditCategoryForm.scss";

export function AddEditCategoryForm(props) {
    const { onClose, onRefetch, category } = props
    const [previewImage, setPreviewImage] = useState(category?.image || null);
    const { addCategory, updateCategory } = useCategory()
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(category),
        validationSchema: Yup.object(category ? updateSchema() : newSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {

            try {
                if(category) await updateCategory(category.id, formValue)
                else await addCategory(formValue)

                console.log('Valores para la categoria ',formValue);

                onRefetch()
                onClose()

            } catch (error) {
                console.log(error);
            }
        }
    })


    const TypeCategory = [
        {
          key: 'PRO',
          text: 'PRODUCTO',
          value: 'PRO',
       
        },
        {
          key: 'ING',
          text: 'INGREDIENTE',
          value: 'ING',
         
        }];

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
        onDrop
    })

  return (
    <Form className='add-edit-category-form' onSubmit={formik.handleSubmit}>
        <Form.Input 
            name="title" 
            placeholder="Nombre de la categoría" 
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.errors.title}
        />
         <Dropdown
                placeholder='Tipo de Categoria'
                fluid
                selection
                options={TypeCategory}
                value={formik.values.categoryType}
                error={formik.errors.categoryType}
                onChange={(_, data) => formik.setFieldValue('categoryType', data.value)}
            />
        
        <Button 
            type="button" 
            fluid
            color={formik.errors.image && "red"}
            {...getRootProps()} 
        >            
            {previewImage ? "Cambiar imagen" : "Subir imagen"}
        </Button>

        <input {...getInputProps()} />
        <Image src={previewImage} fluid />

        {isLoading ? (
                  <Dimmer active inverted>
                    <Loader inverted>Cargando</Loader>
                  </Dimmer>
           ) : (

            <Button type="submit" primary fluid content={category ? "Actualizar" : "Crear"}></Button>  
           )}      

        
    </Form>
  )
}

function initialValues(data) {
    return {
        title: data?.title || "",
        image: "",
        categoryType: data?.categoryType || "PRO",

    }
}

function newSchema() {
    return {
        title: Yup.string().required(true),
        image: Yup.string().required(true),
        categoryType: Yup.string().required(true),

    }
}

function updateSchema() {
    return {
        title: Yup.string().required(true),
        image: Yup.string(),
        categoryType:  Yup.string().required(true),
    }
}