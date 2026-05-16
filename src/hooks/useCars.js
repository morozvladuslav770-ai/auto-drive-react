import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";

export const useCars = () => {
  const [carsData, setCarsData] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cars"), (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCarsData(data);
      setLoadingCars(false);
    }, (error) => {
      console.error("Помилка завантаження авто:", error);
      setLoadingCars(false);
    });

    return () => unsubscribe();
  }, []);

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          const MAX_WIDTH = 800;
          let width = img.width;
          let height = img.height;
          
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          ctx.drawImage(img, 0, 0, width, height);
          
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedBase64);
        };
        
        img.onerror = (err) => reject(err);
      };
      
      reader.onerror = (error) => reject(error);
    });
  };

  const addCar = async (newCar) => {
    try {
      const carToSave = {
        brand: newCar.brand,
        model: newCar.model,
        price: newCar.price,
        hp: Number(newCar.hp),
        img: newCar.img
      };
      await addDoc(collection(db, "cars"), carToSave);
      return true;
    } catch (error) {
      console.error("Помилка додавання в Firestore:", error);
      return false;
    }
  };

  const deleteCar = async (carId) => {
    try {
      await deleteDoc(doc(db, "cars", carId));
      return true;
    } catch (error) {
      console.error("Помилка видалення з Firestore:", error);
      return false;
    }
  };

  return { carsData, loadingCars, addCar, deleteCar, convertFileToBase64 };
};