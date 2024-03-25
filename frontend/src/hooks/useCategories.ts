import { useCallback, useEffect, useState } from 'react';

import * as categoriesAPI from '../api/categoryApi';

import type { Category } from '../api/categoryApi';

const useCategories = (token: string | null) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchAllCategories = useCallback(async (token: string | null) => {
    if (!token) return [];
    try {
      const categories = await categoriesAPI.fetchAll(token);
      setCategories(categories);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchAllCategories(token);
  }, [fetchAllCategories, token]);

  return { categories, fetchAllCategories };
};

export default useCategories;
