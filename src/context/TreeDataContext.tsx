import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Tree } from '@/types/tree';
import { getPohonData } from '@/lib/firestoreServiceTree';
import { collection, doc, getDocs, Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import db from '@/lib/firebase';

interface TreeDataContextType {
  data: Tree[];
  loading: boolean;
  error: string | null;
}

function formatTimestamp(timestamp: Timestamp): string {
  const date = timestamp.toDate();
  return format(date, 'd MMMM yyyy', { locale: id });
}

// Fungsi untuk mengambil data riwayatKegiatan dari subkoleksi
async function getRiwayatKegiatan(treeId: string) {
  const riwayatKegiatanRef = collection(doc(db, 'Trees', treeId), 'riwayatKegiatan');
  const querySnapshot = await getDocs(riwayatKegiatanRef);
  return querySnapshot.docs.map((doc) => doc.data());
}

export const TreeDataContext = createContext<TreeDataContextType | undefined>(undefined);

export const TreeDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Tree[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const trees = await getPohonData(); // Mengambil data dari Firestore

        // Ambil data riwayatKegiatan untuk setiap pohon
        const formattedData = await Promise.all(
          trees.map(async (tree: any) => {
            const riwayatKegiatan = await getRiwayatKegiatan(tree.id); // Ganti dengan ID yang sesuai
            return {
              ...tree,
              tanggalPenanaman: tree.tanggalPenanaman ? formatTimestamp(tree.tanggalPenanaman) : null,
              tanggalPemangkasan: tree.tanggalPemangkasan ? formatTimestamp(tree.tanggalPemangkasan) : null,
              pemupukanTerakhir: tree.pemupukanTerakhir ? formatTimestamp(tree.pemupukanTerakhir) : null,
              riwayatKegiatan,
            };
          })
        );

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
