import React, { useState, useEffect } from "react";
import { Form, Image, Button, Dropdown,Input } from "semantic-ui-react";
import { map,size } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useProduct, useOrder } from "../../../../hooks";
import "./AddOrderForm.scss";

export function AddOrderForm(props) {
  const { idTable, openCloseModal, onReloadOrders,orders } = props;
  const [productsFormat, setProductsFormat] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const { products, getProducts, getProductById } = useProduct();
  const { addOrderToTable,updateQuantity,getOrdersByTableAndProduct} = useOrder();


  useEffect(() => {
    console.log('getProduct');
    getProducts();

  }, 
    []);  

  console.log('Cargo Productos? ',products);

  useEffect(() => {
    
    setProductsFormat(formatDropdownData(products))
  }, [products]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
        addOrUpdate();
 
      //onReloadOrders();
      openCloseModal();
    },
  });


  useEffect(() => {

    addProductList();
  }, [formik.values]);



 const addList=async () => {
        try {
          
            const productsId = formik.values.products;
            const arrayTemp = [];
            for await (const idProduct of productsId) {
              const response = await getProductById(idProduct);
              console.log('response addlist=>',response);
              arrayTemp.push(response);
            }
              setProductsData(arrayTemp);
          
        } catch (error) {
          throw error;
        }
};



const addProductList = () => {
      console.log('se ejecuto addProductList');
      console.log('addProductList ',formik.values);
      const productos=formik.values.products
      const idCounts = {};
      let existingIndex=null;
      let indexProduct=null;
         productos.map((product, index) => {
        
            const count = idCounts[product] || 0;
            idCounts[product] = count + 1;
            indexProduct = index;
          }); 
        
          existingIndex= hasDuplicates(productos);
          console.log('existingIndex ',existingIndex);   


      if (!existingIndex) {
        console.log('Entro aqui por que es menor a 0 ');
        addList();
             
      }else{
         let indexQ =null;
        for (var i = 0; i < productos.length; i++) {
             if(idCounts[productos[i]]>1){
                indexQ = i;
                break;
              }
        }; 
        console.log('indexQ ',indexQ);
        EditQuantity(indexQ);
      }

  };

  const addOrUpdate= async()=>{
    const productsId = formik.values.products;
    const quantity = formik.values.quantity;
    await Promise.all(
    productsId.map(async(idProduct, index) => {
      let close=false; // me tiene que traer productos que no estan pagados
      const response = await getOrdersByTableAndProduct(idTable,idProduct,close);

      if(size(response)>0){
          for await (const order of response) {

            const cantidad=order.quantity+quantity[index];

            await updateQuantity(order.id,idTable,idProduct,cantidad);
          }
      }else{

            await addOrderToTable(idTable,idProduct,quantity[index]);
      }

    })
    );
    onReloadOrders();

  };

  const removeProductList = (index) => {
    const idProducts = [...formik.values.products];
    idProducts.splice(index, 1);
    formik.setFieldValue("products", idProducts);
  };

  const removeQuantityList = (index) => {

    formik.setFieldValue("quantity", formik.values.quantity.splice(index, 1))
  };

  const EditQuantity = (index) => {

    removeQuantityList(size(formik.values.quantity)-1);
    removeProductList(size(formik.values.products)-1);
    
    const idQuantity = [...formik.values.quantity];
    idQuantity.splice(index, 1, idQuantity[index]+1);
    formik.setFieldValue("quantity", idQuantity);

  };

  const AddQuantity = (index,valor) => {

        console.log('Cambio la cantidad del index ',index,' al valor ',valor);
        const idQuantity = [...formik.values.quantity];
        idQuantity.splice(index, 1, parseInt(valor));
        formik.setFieldValue("quantity", idQuantity);

  };

  return (
    <Form className="add-order-form" onSubmit={formik.handleSubmit}>
  <Dropdown
    placeholder="Productos"
    fluid
    selection
    search
    options={productsFormat}
    value={null}
    onChange={(_, data) =>
      formik.setFieldValue("products", [...formik.values.products, data.value],
      formik.setFieldValue("quantity", [...formik.values.quantity, 1])
    )
    }
  />

<div className="add-order-form__list">
        {map(productsData, (product, index) => (
          <div className="add-order-form__list-product" key={index}>
            <div>
              <Image src={product.image} avatar size="tiny" />
              <span>{product.title}</span>
            </div>
            <div>
            <Form.Input
                name="quantity"
                min={1}
                onChange={(e,data)=>AddQuantity(index,data.value)} 
                value={formik.values.quantity[index]}
                type="number"  
            />

            </div>
            <Button
              type="button"
              content="Eliminar"
              basic
              color="red"
              onClick={() => removeProductList(index)}
            />
          </div>
        ))}
      </div>

      <Button
        type="submit"
        primary
        fluid
        content="Añadir productos a la mesa"
      />
</Form>
  );
}

function formatDropdownData(data) {
  console.log('data es ',data)
  return map(data, (item) => ({
    key: item.id,
    text: item.title,
    value: item.id,
  }));
}

function initialValues() {
  console.log('Se inicializa los valores');
  return {
    products: [],
    quantity: [],
  };
}

function validationSchema() {
  return {
    products: Yup.array().required(true),
  };
}

function hasDuplicates(array) {
  var set = new Set(array);
  return set.size !== array.length;
}
