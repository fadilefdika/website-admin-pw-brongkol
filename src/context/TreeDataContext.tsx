import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Tree } from '@/types/tree';
import { getPohonData } from '@/lib/firestoreServiceTree';
import { collection, doc, getDocs, Timestamp, onSnapshot } from 'firebase/firestore';

import db from '@/lib/firebase';

interface TreeDataContextType {
  data: Tree[];
  loading: boolean;
  error: string | null;
}

const formatTimestamp = (timestamp: Timestamp | Date | null | undefined): string => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate().toLocaleDateString();
  } else if (timestamp instanceof Date) {
    return timestamp.toLocaleDateString();
  } else {
    return 'Invalid Date';
  }
};

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
    let unsubscribe: () => void;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Set up realtime listener
        const treesCollection = collection(db, 'Trees');
        unsubscribe = onSnapshot(
          treesCollection,
          async (snapshot) => {
            const trees = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            const formattedData = await Promise.all(
              trees.map(async (tree: any) => {
                const riwayatKegiatan = await getRiwayatKegiatan(tree.id);
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
            setLoading(false);
          },
          (error) => {
            setError('Gagal mengambil data pohon. Silakan coba lagi nanti.');
            console.error('Error fetching data:', error);
            setLoading(false);
          }
        );
      } catch (err) {
        setError('Gagal mengambil data pohon. Silakan coba lagi nanti.');
        console.error('Error setting up listener:', err);
        setLoading(false);
      }
    };

    fetchData();

    // Clean up listener on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
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
