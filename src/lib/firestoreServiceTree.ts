import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, Timestamp } from 'firebase/firestore';
import db from './firebase';

interface PohonData {
  jenisPohon: string;
  lokasi: string;
  namaPetani: string;
  aksesi: string;
  tanggalPenanaman: Date | Timestamp;
  catatan?: string;
}

export const getPohonData = async () => {
  try {
    const pohonCollection = collection(db, 'Trees');
    const pohonSnapshot = await getDocs(pohonCollection);

    if (pohonSnapshot.empty) {
      console.log('No tree data found in the database.');
      return [];
    }

    return pohonSnapshot.docs.map((doc) => {
      const data = doc.data();
      // Convert Timestamp to Date for consistency
      if (data.tanggalPenanaman instanceof Timestamp) {
        data.tanggalPenanaman = data.tanggalPenanaman.toDate();
      }
      return { id: doc.id, ...data };
    });
  } catch (error) {
    console.error('Error fetching data from Trees:', error);
    throw new Error('Gagal mengambil data. Silakan coba lagi nanti.');
  }
};

export const addPohonData = async (newPohon: PohonData) => {
  try {
    const pohonCollection = collection(db, 'Trees');
    // Convert Date to Timestamp
    const pohonWithTimestamp = {
      ...newPohon,
      tanggalPenanaman: Timestamp.fromDate(newPohon.tanggalPenanaman as Date),
    };
    await addDoc(pohonCollection, pohonWithTimestamp);
    alert('Document successfully added!');
  } catch (error) {
    console.error('Error adding document to Trees:', error);
    throw new Error('Failed to add data. Please try again later.');
  }
};

export const updatePohonData = async (id: string, updatedData: Partial<PohonData>) => {
  try {
    const pohonDoc = doc(db, 'Trees', id);
    // Convert Date to Timestamp if present
    const dataToUpdate = { ...updatedData };
    if (dataToUpdate.tanggalPenanaman instanceof Date) {
      dataToUpdate.tanggalPenanaman = Timestamp.fromDate(dataToUpdate.tanggalPenanaman);
    }
    await updateDoc(pohonDoc, dataToUpdate);
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
