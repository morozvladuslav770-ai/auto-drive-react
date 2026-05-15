import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

export const useCars = () => {
  const [carsData, setCarsData] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "cars"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCarsData(data);
        setLoadingCars(false);
      } catch (error) {
        console.error("Помилка завантаження авто:", error);
        setLoadingCars(false);
      }
    };

    fetchCars();
  }, []);

  return { carsData, loadingCars };
};