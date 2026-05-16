import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

export const useOrders = (role) => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (role !== 'admin') {
      setOrders([]);
      setLoadingOrders(false);
      return;
    }

    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        dateStr: doc.data().createdAt?.toDate()?.toLocaleString() || "Дата не вказана"
      }));
      setOrders(ordersData);
      setLoadingOrders(false);
    }, (error) => {
      console.error("Помилка завантаження замовлень:", error);
      setLoadingOrders(false);
    });

    return () => unsubscribe();
  }, [role]);


  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      return true;
    } catch (error) {
      console.error("Помилка оновлення статусу:", error);
      return false;
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, "orders", orderId));
      return true;
    } catch (error) {
      console.error("Помилка видалення замовлення:", error);
      return false;
    }
  };

  return { orders, loadingOrders, updateOrderStatus, deleteOrder };
};