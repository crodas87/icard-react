import { useState } from "react";
import {
  getIngredienteProductoApi,
  addIngredienteProductoApi,
  updateIngredienteProductoApi,
  deleteIngredienteProductoApi,
  getIngredienteProductoByIdApi,
} from "../api/IngredienteProducto";
import { useAuth } from "./";

export function useIngredienteProducto() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ingredienteProducto, setIngredienteProducto] = useState(null);
  const { auth } = useAuth();

  const getIngredienteProducto = async (id) => {
    try {
      
      setLoading(true);
      const response = await getIngredienteProductoApi(id);
      setLoading(false);
      setIngredienteProducto(response);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const addIngredienteProducto = async (data) => {
    try {
      setLoading(true);
      await addIngredienteProductoApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const updateIngredienteProducto = async (id, data) => {
    try {
      setLoading(true);
      await updateIngredienteProductoApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const deleteIngredienteProducto = async (idProducto,idIngrediente) => {
    try {
      setLoading(true);
      await deleteIngredienteProductoApi(idProducto,idIngrediente, auth.token);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const getIngredienteProductoById = async (id) => {
    try {
      const IngredienteProducto = await getIngredienteProductoByIdApi(id);
      return IngredienteProducto;
    } catch (error) {
      setError(error);
    }
  };

  return {
    loading,
    error,
    ingredienteProducto,
    getIngredienteProducto,
    addIngredienteProducto,
    updateIngredienteProducto,
    deleteIngredienteProducto,
    getIngredienteProductoById,
   
  };
}
