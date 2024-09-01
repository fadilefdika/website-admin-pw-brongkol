import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Tree } from '@/pages/tree-data/tabel-tree';
import { getPohonData } from '@/lib/firestoreService';
import { collection, doc, getDoc, getDocs, Timestamp } from '@firebase/firestore';
import db from '@/lib/firebase';

interface TreeDataContextType {
  data: Tree[];
  loading: boolean;
  error: string | null;
}

export const TreeDataContext = createContext<TreeDataContextType | undefined>(undefined);

export const TreeDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Tree[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function convertTimestampToDate(timestamp: Timestamp): Date {
    return timestamp.toDate();
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getPohonData(); // Mengambil data dari Firestore

        const formattedData: Tree[] = result.map((item: any) => {
          return {
            ...item,
            tanggalPenanaman: convertTimestampToDate(item.tanggalPenanaman as Timestamp),
            tanggalPemangkasan: item.tanggalPemangkasan ? convertTimestampToDate(item.tanggalPemangkasan as Timestamp) : undefined,
            pemupukanTerakhir: item.pemupukanTerakhir ? convertTimestampToDate(item.pemupukanTerakhir as Timestamp) : undefined,
            riwayatKegiatan: [], // Placeholder untuk riwayatKegiatan yang mungkin akan diisi nanti
          };
        });

        setData(formattedData);
      } catch (err) {
        setError('Gagal mengambil data pohon. Silakan coba lagi nanti.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRiwayatKegiatan = async (treeId: string) => {
    try {
      const treeDocRef = doc(db, 'Trees', treeId);
      const treeDocSnapshot = await getDoc(treeDocRef);

      if (!treeDocSnapshot.exists()) {
        console.log('Dokumen tidak ditemukan!');
        return [];
      }

      const riwayatKegiatanRef = collection(treeDocRef, 'riwayatKegiatan');
      const riwayatKegiatanSnapshot = await getDocs(riwayatKegiatanRef);

      if (riwayatKegiatanSnapshot.empty) {
        console.log('Subkoleksi riwayatKegiatan kosong!');
        return [];
      }

      return riwayatKegiatanSnapshot.docs.map((doc) => ({
        id: doc.id,
        treeId,
        ...(doc.data() as Omit<Tree['riwayatKegiatan'][number], 'id' | 'treeId'>), // pastikan data yang dikembalikan sesuai dengan RiwayatKegiatan
        tanggalKegiatan: convertTimestampToDate(doc.data().tanggalKegiatan as Timestamp),
      }));
    } catch (error) {
      console.error('Error fetching riwayat kegiatan:', error);
      return [];
    }
  };

  return <TreeDataContext.Provider value={{ data, loading, error }}>{children}</TreeDataContext.Provider>;
};

// Hook untuk menggunakan context
export const useTreeData = () => {
  const context = useContext(TreeDataContext);
  if (context === undefined) {
    throw new Error('useTreeData must be used within a TreeDataProvider');
  }
  return context;
};
