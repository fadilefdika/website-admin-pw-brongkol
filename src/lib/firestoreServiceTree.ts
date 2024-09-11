// lib/firestoreService.ts
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, Timestamp } from 'firebase/firestore';
import db from './firebase';

// Fungsi untuk mengambil data dari koleksi 'Trees'
export const getPohonData = async () => {
  try {
    const pohonCollection = collection(db, 'Trees');
    const pohonSnapshot = await getDocs(pohonCollection);
    return pohonSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching data from Trees:', error);
    throw new Error('Failed to fetch data. Please try again later.');
  }
};

// Fungsi untuk menambahkan data ke koleksi 'Trees'
export const addPohonData = async (newPohon: { jenisPohon: string; lokasi: string; namaPetani: string; aksesi: string; tanggalPenanaman: Timestamp }) => {
  try {
    const pohonCollection = collection(db, 'Trees');
    await addDoc(pohonCollection, newPohon);
    alert('Document successfully added!');
  } catch (error) {
    console.error('Error adding document to Trees:', error);
    throw new Error('Failed to add data. Please try again later.');
  }
};

// Fungsi untuk memperbarui data di koleksi 'Trees'
export const updatePohonData = async (id: string, updatedData: Partial<{ jenisPohon: string; lokasi: string; namaPetani: string; aksesi: string; tanggalPenanaman: Timestamp }>) => {
  try {
    const pohonDoc = doc(db, 'Trees', id);
    await updateDoc(pohonDoc, updatedData);
    alert('Document successfully updated!');
  } catch (error) {
    console.error(`Error updating document with ID ${id}:`, error);
    throw new Error('Failed to update data. Please try again later.');
  }
};

// Fungsi untuk menghapus data dari koleksi 'Trees'
export const deletePohonData = async (id: string) => {
  try {
    const pohonDoc = doc(db, 'Trees', id);
    await deleteDoc(pohonDoc);
    alert('Document successfully deleted!');
  } catch (error) {
    console.error(`Error deleting document with ID ${id}:`, error);
    throw new Error('Failed to delete data. Please try again later.');
  }
};
