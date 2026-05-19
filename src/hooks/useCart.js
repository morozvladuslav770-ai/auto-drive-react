import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const useCart = (user) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('autoDrive_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('autoDrive_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!user) {
      setCart([]);
      localStorage.removeItem('autoDrive_cart');
    }
  }, [user]);

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

  const createOrder = async (currentUser, customerData) => {
  if (!currentUser) return false;
  try {
    const orderData = {
      userId: currentUser.uid,
      userEmail: currentUser.email,
      items: cart,
      status: "очікує підтвердження",
      createdAt: serverTimestamp(),
      customerInfo: {
        name: customerData.name,
        phone: customerData.phone,
        city: customerData.city,
        comment: customerData.comment || ""
      }
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