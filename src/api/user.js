import {BASE_API} from '../utils/constants'

export async function loginApi(formValue) {
    try {
        const url = `${BASE_API}/api/auth/login/`
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formValue),
        };

        const response = await fetch(url, params);

        if(response.status  !== 200) {
            throw new Error('Usuario o Contraseña incorrecto')
        }

        const resul = await response.json();
        return resul;
    } catch (error) {
        throw error;
    }
}

export async function getMeApi(token) {
    try {
        const url = `${BASE_API}/api/auth/me/`;
        const params = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url, params);
        const resul = await response.json();
        return resul;
    } catch (error) {
        throw error;
        
    }
}

export async function getUsersApi(token) {
    try {
      const url = `${BASE_API}/api/user/`
      const params = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      const response = await fetch(url, params)
      const result = await response.json()
      return result
    } catch (error) {
      throw error
    }
  }

  export async function addUserApi(data, token) {
    try {
      const url = `${BASE_API}/api/user/`
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params)
      const result = await response.json()
      return result;
    } catch (error) {
      throw error
    }
  }
  export async function updateUserApi(id, data, token) {
    try {
      const url = `${BASE_API}/api/user/${id}/`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
  
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
  export async function deleteUserApi(id, token) {
    try {
      const url = `${BASE_API}/api/user/${id}/`;
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