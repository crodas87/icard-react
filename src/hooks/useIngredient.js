import { useState } from "react";
import {
  getIngredientsApi,
  addIngredientApi,
  updateIngredientApi,
  deleteIngredientApi,
  getIngredientByIdApi,
  getIngredientsByCategoryApi,
  updateIngredientStockApi
} from "../api/ingredient";
import { useAuth } from "./";

export function useIngredient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [ingredients, setIngredients] = useState(null);
  const { auth } = useAuth();

  const getIngredients = async (page) => {
    try {
      
      setLoading(true);
      const response = await getIngredientsApi(page);
      setLoading(false);
      setIngredients(response);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const addIngredient = async (data) => {
    try {
      setLoading(true);
      await addIngredientApi(data, auth.token);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const updateIngredient = async (id, data) => {
    try {
      setLoading(true);
      await updateIngredientApi(id, data, auth.token);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  const updateIngredientStock = async (id) => {
    try {
      setLoading(true);
      const result =await updateIngredientStockApi(id, auth.token);
      setLoading(false);
      return result;
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const deleteIngredient = async (id) => {
    try {
      setLoading(true);
      await deleteIngredientApi(id, auth.token);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const getIngredientById = async (id) => {
    try {
      const ingredient = await getIngredientByIdApi(id);
      return ingredient;
    } catch (error) {
      setError(error);
    }
  };

  const getIngredientByCategory = async (idCategory) => {
    try {
      setLoading(true);
      const response = await getIngredientsByCategoryApi(idCategory);
      setLoading(false);
      setIngredients(response);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return {
    loading,
    error,
    ingredients,
    getIngredients,
    addIngredient,
    updateIngredient,
    updateIngredientStock,
    deleteIngredient,
    getIngredientById,
    getIngredientByCategory,
  };
}
