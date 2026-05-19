import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";

export const useUserOrders = (user) => {
  const [userOrders, setUserOrders] = useState([]);
  const [loadingUserOrders, setLoadingUserOrders] = useState(true);

  useEffect(() => {
    if (!user) {
      setUserOrders([]);
      setLoadingUserOrders(false);
      return;
    }

    // Запит: витягуємо замовлення лише поточного користувача, сортуємо від нових до старих
    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        dateStr: doc.data().createdAt?.toDate()?.toLocaleString() || "Обробка дати..."
      }));
      setUserOrders(data);
      setLoadingUserOrders(false);
    }, (error) => {
      console.error("Помилка завантаження замовлень користувача:", error);
      setLoadingUserOrders(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { userOrders, loadingUserOrders };
};