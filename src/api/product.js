import { BASE_API } from "../utils/constants"

export async function getProductsApi(page) {
    try {
      const psize = (page)?`?page_size=10`:'';
      const pagina = (page)?`&page=${page}`:'';

        const url = `${BASE_API}/api/products/${psize}${pagina}`;
        console.log('URL ',url);
        const response = await fetch(url);
        const resul = await response.json();
        return resul
    } catch (error) {
        throw error;
    }
}
export async function getProductsIngredientsApi() {
  try {
      const url = `${BASE_API}/api/products/?productType=ING`;
      const response = await fetch(url);
      const resul = await response.json();
      return resul;
  } catch (error) {
      throw error;
  }
}

export async function addProductApi(data, token) {
    try {

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("codbarra", data.codbarra);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("active", data.active);
      formData.append("image", data.image);
      if(data.productType){
        formData.append("productType", data.productType);
      }else{
        formData.append("productType", "PRO");
      }
 
      for (var value of formData.values()) {
        console.log(value);
     }


      const url = `${BASE_API}/api/products/`;
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

  export async function updateProductApi(id, data, token) {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("codbarra", data.codbarra);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("active", data.active);
      formData.append("image", data.image);
      formData.append("productType", data.productType);
  
      const url = `${BASE_API}/api/products/${id}/`;
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

  export async function deleteProductApi(id, token) {
    try {
      const url = `${BASE_API}/api/products/${id}/`;
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

  export async function getProductByIdApi(id){
    try {
      const url = `${BASE_API}/api/products/${id}/`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  export async function getProductsByCategoryApi(idCategory) {
    try {
      const type = `productType=PRO`;
      const categoryFilter = `category=${idCategory}`;
      const url = `${BASE_API}/api/products/?${type}&${categoryFilter}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  export async function getProductsIngredientsByCategoryApi(idCategory) {
    try {
      const type = `productType=ING`;
      const categoryFilter = `category=${idCategory}`;
      const url = `${BASE_API}/api/products/?${type}&${categoryFilter}`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
  