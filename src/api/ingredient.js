import { BASE_API } from "../utils/constants"

export async function getIngredientsApi(page) {
    try {
        const psize = (page)?`?page_size=10`:'';
        const pagina = (page)?`&page=${page}`:'';
        const url = `${BASE_API}/api/ingredients/${psize}${pagina}`;
        console.log('URL ',url);
        const response = await fetch(url);
        const resul = await response.json();
        return resul
    } catch (error) {
        throw error;
    }
}


export async function addIngredientApi(data, token) {
    try {


      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image);
      formData.append("um", data.um);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("proveedor", data.proveedor);
 
      for (var value of formData.values()) {
        console.log(value);
     }


      const url = `${BASE_API}/api/ingredients/`;
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

  export async function updateIngredientApi(id, data, token) {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image);
      formData.append("um", data.um);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("proveedor", data.proveedor);
      formData.append("stock", data.stock);
      if (data.image) formData.append("image", data.image);
  
      const url = `${BASE_API}/api/ingredients/${id}/`;
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
  export async function updateIngredientStockApi(id, token) {
    try {
      const formData = new FormData();
      formData.append("idOrder", id);
      
      const url = `${BASE_API}/api/ingredients/update_stock`;
      const params = {
        method: "POST",
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

  export async function deleteIngredientApi(id, token) {
    try {
      const url = `${BASE_API}/api/ingredients/${id}/`;
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

  export async function getIngredientByIdApi(id){

    try {
      const url = `${BASE_API}/api/ingredients/${id}/`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
export async function getIngredientsByCategoryApi() {
    try {

      const categoryFilter = `category=${idCategory}`;
      const url = `${BASE_API}/api/ingredients/?${categoryFilter}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
  