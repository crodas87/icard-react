import { BASE_API } from "../utils/constants"

export async function getProveedoresApi() {
    try {

        const url = `${BASE_API}/api/proveedores/`
        const response = await fetch(url)
        const result = await response.json()
        return result        
    } catch (error) {
        throw error
    }
}

export async function addProveedoresApi(data, token) {
    try {
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("direccion", data.direccion);
      formData.append("telefono", data.telefono);
      formData.append("correo_electronico", data.correo_electronico);
  
      const url = `${BASE_API}/api/proveedores/`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };
  
      const response = await fetch(url, params);
      const result = await response.json();
      //console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  export async function updateProveedoresApi(id, data, token) {
    try {
      const formData = new FormData();
      formData.append("nombre", data.nombre);
      formData.append("direccion", data.direccion);
      formData.append("telefono", data.telefono);
      formData.append("correo_electronico", data.correo_electronico);
  
      const url = `${BASE_API}/api/proveedores/${id}/`;
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

  export async function deleteProveedoresApi(id, token) {
    try {
      const url = `${BASE_API}/api/proveedores/${id}/`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }