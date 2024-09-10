import db from '@/lib/firebase';
import { collection, doc, getDocs } from '@firebase/firestore';

export async function getRiwayatKegiatan(treeId: string) {
  try {
    const riwayatKegiatanRef = collection(doc(db, 'Trees', treeId), 'riwayatKegiatan');
    const querySnapshot = await getDocs(riwayatKegiatanRef);

    const kegiatanList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return kegiatanList;
  } catch (error) {
    console.error('Error fetching riwayatKegiatan:', error);
    throw error;
  }
}
