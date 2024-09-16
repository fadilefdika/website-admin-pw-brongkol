import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, Timestamp } from 'firebase/firestore';
import db from './firebase';
import toast from 'react-hot-toast';
import CustomToast from '@/components/ui/CustomToast';

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
      toast((t) => CustomToast({ t, message: 'Tidak ada data pohon yang ditemukan.', type: 'error' }));
      return [];
    }

    return pohonSnapshot.docs.map((doc) => {
      const data = doc.data();
      if (data.tanggalPenanaman instanceof Timestamp) {
        data.tanggalPenanaman = data.tanggalPenanaman.toDate();
      }
      return { id: doc.id, ...data };
    });
  } catch (error) {
    console.error('Error fetching data from Trees:', error);
    toast((t) => CustomToast({ t, message: 'Gagal mengambil data. Silakan coba lagi nanti.', type: 'error' }));
    throw new Error('Gagal mengambil data. Silakan coba lagi nanti.');
  }
};

export const addPohonData = async (newPohon: PohonData) => {
  try {
    const pohonCollection = collection(db, 'Trees');
    // Convert Date to Timestamp
    const pohonWithTimestamp = {
      ...newPohon,
      tanggalPenanaman: newPohon.tanggalPenanaman instanceof Date ? Timestamp.fromDate(newPohon.tanggalPenanaman) : newPohon.tanggalPenanaman,
    };
    await addDoc(pohonCollection, pohonWithTimestamp);
    toast((t) => CustomToast({ t, message: 'Data berhasil ditambahkan!', type: 'success' }));
  } catch (error) {
    console.error('Error adding document to Trees:', error);
    toast((t) => CustomToast({ t, message: 'Gagal menambahkan data. Silakan coba lagi nanti.', type: 'error' }));
    throw new Error('Failed to add data. Please try again later.');
  }
};

export const updatePohonData = async (id: string, updatedData: Partial<PohonData>) => {
  try {
    const pohonDoc = doc(db, 'Trees', id);
    const dataToUpdate = { ...updatedData };
    if (dataToUpdate.tanggalPenanaman instanceof Date) {
      dataToUpdate.tanggalPenanaman = Timestamp.fromDate(dataToUpdate.tanggalPenanaman);
    }
    await updateDoc(pohonDoc, dataToUpdate);
    toast((t) => CustomToast({ t, message: 'Data berhasil diperbarui!', type: 'success' }));
  } catch (error) {
    console.error(`Error updating document with ID ${id}:`, error);
    toast((t) => CustomToast({ t, message: 'Gagal memperbarui data. Silakan coba lagi nanti.', type: 'error' }));
    throw new Error('Failed to update data. Please try again later.');
  }
};

// Fungsi untuk menghapus data dari koleksi 'Trees'
export const deletePohonData = async (id: string) => {
  try {
    const pohonDoc = doc(db, 'Trees', id);
    await deleteDoc(pohonDoc);
    toast((t) => CustomToast({ t, message: 'Data berhasil dihapus!', type: 'success' }));
  } catch (error) {
    console.error(`Error deleting document with ID ${id}:`, error);
    toast((t) => CustomToast({ t, message: 'Gagal menghapus data. Silakan coba lagi nanti.', type: 'error' }));
    throw new Error('Failed to delete data. Please try again later.');
  }
};
