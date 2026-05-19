import { useState, useEffect } from 'react';
import { db } from '../firebase'; // Імпорт твоєї бази даних із проекту
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";

export const useTestDrives = (user, role) => {
  const [drives, setDrives] = useState([]);
  const [loadingDrives, setLoadingDrives] = useState(true);

  useEffect(() => {
    // Якщо користувач не увійшов — нічого не завантажуємо
    if (!user || role === 'guest') {
      setDrives([]);
      setLoadingDrives(false);
      return;
    }

    let q;
    if (role === 'admin') {
      // 1. АДМІНІСТРАТОР: Запит у Firestore на ВСІ документи з колекції "test_drives"
      q = query(collection(db, "test_drives"), orderBy("createdAt", "desc"));
    } else {
      // 2. КОРИСТУВАЧ: Запит у Firestore ТІЛЬКИ на його власні записи (де userId збігається)
      q = query(
        collection(db, "test_drives"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
    }

    // Слухаємо оновлення бази даних у реальному часі
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDrives(data);
      setLoadingDrives(false);
    }, (error) => {
      console.error("Помилка завантаження тест-драйвів з Firebase:", error);
      setLoadingDrives(false);
    });

    return () => unsubscribe();
  }, [user, role]);

  // ФУНКЦІЯ ДОДАВАННЯ ЗАПИСУ В КОЛЕКЦІЮ FIREBASE
  const addDrive = async (driveData) => {
    if (!user) return false;
    try {
      // Функція addDoc створює нову колекцію "test_drives" (якщо її немає) та додає туди документ
      await addDoc(collection(db, "test_drives"), {
        userId: user.uid,          // ID авторизованого юзера
        userEmail: user.email,      // Email юзера для адміна
        carId: driveData.carId,      // ID вибраного авто з каталогу
        carName: driveData.carName,  // Назва авто (Марка + Модель)
        clientName: driveData.clientName, // ПІБ, яке ввів юзер у форму
        date: driveData.date,        // Дата поїздки
        time: driveData.time,        // Час поїздки
        completed: false,            // Початковий статус (не завершено)
        createdAt: serverTimestamp() // Час створення запису на сервері Google
      });
      return true;
    } catch (error) {
      console.error("Помилка додавання запису в Firestore:", error);
      return false;
    }
  };

  // ФУНКЦІЯ ОНОВЛЕННЯ СТАТУСУ (Для тумблера адміна)
  const toggleDriveStatus = async (id, currentStatus) => {
    try {
      const docRef = doc(db, "test_drives", id);
      // Оновлюємо поле completed на протилежне в базі даних
      await updateDoc(docRef, { completed: !currentStatus });
      return true;
    } catch (error) {
      console.error("Помилка оновлення статусу в Firestore:", error);
      return false;
    }
  };

  // ФУНКЦІЯ ВИДАЛЕННЯ ЗАПИСУ З БАЗИ ДАНИХ
  const deleteDrive = async (id) => {
    try {
      await deleteDoc(doc(db, "test_drives", id));
      return true;
    } catch (error) {
      console.error("Помилка видалення документа з Firestore:", error);
      return false;
    }
  };

  return { drives, loadingDrives, addDrive, toggleDriveStatus, deleteDrive };
};