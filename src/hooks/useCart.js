import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Передаємо user як аргумент у хук
export const useCart = (user) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('autoDrive_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 1. Слідкуємо за змінами в корзині для збереження в пам'ять
  useEffect(() => {
    localStorage.setItem('autoDrive_cart', JSON.stringify(cart));
  }, [cart]);

  // 2. Слідкуємо за авторизацією: якщо юзер вийшов — чистимо корзину
  useEffect(() => {
    if (!user) {
      setCart([]);
      localStorage.removeItem('autoDrive_cart');
    }
  }, [user]); // Цей ефект спрацює щоразу, коли стан user змінюється

  const addToCart = (car) => {
    setCart((prev) => [...prev, car]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('autoDrive_cart');
  };

  const createOrder = async (currentUser) => {
    if (!currentUser) return false;

    try {
      const orderData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        items: cart,
        status: "очікує підтвердження",
        createdAt: serverTimestamp() 
      };

      await addDoc(collection(db, "orders"), orderData);
      clearCart();
      return true;
    } catch (error) {
      console.error("Помилка замовлення:", error);
      return false;
    }
  };

  return { cart, addToCart, removeFromCart, clearCart, createOrder };
};