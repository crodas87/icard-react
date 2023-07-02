import { BASE_API } from "../utils/constants"

export async function getIngredienteProductoApi(id) {
    try {
      let val = "";
      if (id) val="?idProducto="+id; 

        const url = `${BASE_API}/api/ingredienteProducto/${val}`;
        console.log('URL ',url);
        const response = await fetch(url);
        const resul = await response.json();
        console.log('RESULT  ',resul);
        return resul
    } catch (error) {
        throw error;
    }
}


export async function addIngredienteProductoApi(data, token) {
    try {

      const formData = new FormData();
      formData.append("idProducto", data.idProducto);
      formData.append("idIngrediente", data.idIngrediente);
      formData.append("cantidad", data.cantidad);
 
      for (var value of formData.values()) {
        console.log(value);
     }

      const url = `${BASE_API}/api/ingredienteProducto/`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };
  
      const response = await fetch(url, params);
      console.log(response);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  export async function updateIngredienteProductoApi(id, data, token) {
    try {
      const formData = new FormData();
      formData.append("idProducto", data.idProducto);
      formData.append("idIntegrante", data.idIntegrante);
      formData.append("cantidad", data.cantidad);
     
  
      const url = `${BASE_API}/api/ingredienteProducto/${id}/`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };
  
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  export async function deleteIngredienteProductoApi(idProducto,idIngrediente, token) {
    try {
      const url = `${BASE_API}/api/ingredienteProducto/${idProducto}/${idIngrediente}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(url);
      console.log(params);
      const response = await fetch(url, params);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  export async function getIngredienteProductoByIdApi(id){

    try {
      const url = `${BASE_API}/api/ingredienteProducto/${id}/`;
      const response = await fetch(url);
      const result = await response.json();
      
      return result;
    } catch (error) {
      throw error;
    }
  }
  