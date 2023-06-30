import { BASE_API } from "../utils/constants"

export async function getCategoriesApi(typeCategory) {
    try {
        let tipo = "";

            if(typeCategory)tipo =`?categoryType=${typeCategory}`;

        const url = `${BASE_API}/api/categories/${tipo}`
        const response = await fetch(url)
        const result = await response.json()
        return result        
    } catch (error) {
        throw error
    }
}

export async function addCategoryApi(data, token) {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("image", data.image);
      formData.append("categoryType",data.categoryType)
  
      const url = `${BASE_API}/api/categories/`;
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

  export async function updateCategoryApi(id, data, token) {
    try {
      const formData = new FormData();
      formData.append("title", data.title);

      if (data.image) formData.append("image", data.image);

      formData.append("categoryType", data.categoryType);
  
      const url = `${BASE_API}/api/categories/${id}/`;
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

  export async function deleteCategoryApi(id, token) {
    try {
      const url = `${BASE_API}/api/categories/${id}/`;
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