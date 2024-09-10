import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';
import RiwayatCard from '@/components/ui/RiwayatCard';
import { TreeDataContext } from '@/context/TreeDataContext';
import { collection, getDocs, doc } from 'firebase/firestore';
import db from '@/lib/firebase';
import { Timestamp } from 'firebase/firestore'; // Import Timestamp
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale'; // Correctly import and use locale

interface TreeData {
  id: string;
  jenisPohon: string;
  aksesi: string;
  lokasi: string;
  tanggalPenanaman: Timestamp | string;
  tanggalPemangkasan: Timestamp | string;
  pemupukanTerakhir: Timestamp | string;
}

interface RiwayatKegiatan {
  id: string;
  namaPetani: string;
  deskripsi: string;
  tanggalKegiatan: Timestamp | string;
}

const DetailTreePage: React.FC = () => {
  const context = useContext(TreeDataContext);
  const router = useRouter();
  const { id } = router.query;

  const [riwayatKegiatan, setRiwayatKegiatan] = useState<RiwayatKegiatan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  if (!context) {
    return <p>Context error</p>;
  }

  const { data } = context;

  // Ensure id is a string before using it to find data
  const treeData = typeof id === 'string' ? data.find((tree) => tree.id === id) : undefined;

  useEffect(() => {
    const fetchRiwayatKegiatan = async () => {
      if (typeof id === 'string') {
        try {
          const riwayatKegiatanRef = collection(doc(db, 'Trees', id), 'riwayatKegiatan');
          const querySnapshot = await getDocs(riwayatKegiatanRef);
          const kegiatanList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as RiwayatKegiatan[];
          setRiwayatKegiatan(kegiatanList);
        } catch (err) {
          console.error('Error fetching riwayat kegiatan:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRiwayatKegiatan();
  }, [id]);

  const generateQRCode = () => {
    alert('sudah tergenerate');
  };

  const formatTanggal = (dateInput: Timestamp | string | Date): string => {
    let date: Date;

    if (dateInput instanceof Timestamp) {
      date = dateInput.toDate();
    } else if (typeof dateInput === 'string') {
      date = new Date(dateInput);
    } else if (dateInput instanceof Date) {
      date = dateInput;
    } else {
      return 'Tanggal tidak valid';
    }

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Tanggal tidak valid';
    }

    // Format date to 'd MMMM yyyy'
    return format(date, 'd MMMM yyyy', { locale: idLocale }); // Use the locale object here
  };

  return (
    <div className="p-3 min-h-min">
      <div className="flex flex-col gap-4">
        <BreadcrumbCustom title="Data Pohon" href="/tree-data" curentPage="Detail Pohon" />
        <div className="flex flex-row gap-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Generate QR Code</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={generateQRCode} className="p-1 bg-blue-500 text-white rounded">
                Generate QR Code
              </Button>
            </CardContent>
          </Card>
          <Card className="flex-1 h-max">
            <CardHeader>
              <CardTitle>Detail Pohon</CardTitle>
            </CardHeader>
            <CardContent>
              {treeData ? (
                <>
                  <p>
                    <strong>Jenis Pohon:</strong> {treeData.jenisPohon}
                  </p>
                  <p>
                    <strong>Aksesi:</strong> {treeData.aksesi}
                  </p>
                  <p>
                    <strong>Lokasi:</strong> {treeData.lokasi}
                  </p>
                  <p>
                    <strong>Tanggal Penanaman:</strong> {formatTanggal(treeData.tanggalPenanaman)}
                  </p>
                  <p>
                    <strong>Tanggal Pemangkasan:</strong> {formatTanggal(treeData.tanggalPemangkasan)}
                  </p>
                  <p>
                    <strong>Pemupukan Terakhir:</strong> {formatTanggal(treeData.pemupukanTerakhir)}
                  </p>
                </>
              ) : (
                <p>Data pohon tidak ditemukan</p>
              )}
            </CardContent>
          </Card>
        </div>
        {loading ? (
          <p>Loading riwayat kegiatan...</p>
        ) : riwayatKegiatan.length > 0 ? (
          riwayatKegiatan.map((kegiatan) => <RiwayatCard key={kegiatan.id} namaPetani={kegiatan.namaPetani} deskripsiKegiatan={kegiatan.deskripsi} tanggalKegiatan={formatTanggal(kegiatan.tanggalKegiatan)} />)
        ) : (
          <p>Belum ada riwayat kegiatan untuk pohon ini.</p>
        )}
      </div>
    </div>
  );
};

export default DetailTreePage;
