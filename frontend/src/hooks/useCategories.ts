import { useCallback, useEffect, useState } from 'react';

import * as categoriesAPI from '../api/categoryApi';

type Category = {
  id: number;
  name: string;
  color: string;
  icon: string;
  total_tasks: number;
};

const useCategories = (token: string | null) => {
  const [categories, setCategories] = useState<Category[] | null>(null);

  const fetchAllCategories = useCallback(async (token: string | null) => {
    if (!token) return;
    try {
      const categories = (await categoriesAPI.fetchAll(token)) as Category[];
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
