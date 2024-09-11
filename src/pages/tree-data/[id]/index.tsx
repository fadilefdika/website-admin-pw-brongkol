import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';
import RiwayatCard from '@/components/ui/RiwayatCard';
import { TreeDataContext } from '@/context/TreeDataContext';
import { ModalPohon } from '@/components/ui/ModalPohon';
import { collection, getDocs, doc } from 'firebase/firestore';
import db from '@/lib/firebase';
import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

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
  jenisKegiatan: string;
  tanggalKegiatan: Timestamp | string;
  deskripsiKegiatan: string;
}

const DetailTreePage: React.FC = () => {
  const context = useContext(TreeDataContext);
  const router = useRouter();
  const { id } = router.query;

  const [riwayatKegiatan, setRiwayatKegiatan] = useState<RiwayatKegiatan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!context) {
    return <p>Context error</p>;
  }

  const { data } = context;

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
      return 'Kegiatan belum dilakukan';
    }

    if (isNaN(date.getTime())) {
      return 'Kegiatan belum dilakukan';
    }

    return format(date, 'd MMMM yyyy', { locale: idLocale }); // Use the locale object here
  };

  return (
    <div className="p-3 min-h-dvh">
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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Detail Pohon</CardTitle>
              <ModalPohon editData={treeData} />
            </CardHeader>
            <CardContent>
              {treeData ? (
                <div className="space-y-4">
                  {[
                    { label: 'Nama Petani', value: treeData.namaPetani },
                    { label: 'Jenis Pohon', value: treeData.jenisPohon },
                    { label: 'Aksesi', value: treeData.aksesi },
                    { label: 'Lokasi', value: treeData.lokasi },
                    { label: 'Tanggal Penanaman', value: formatTanggal(treeData.tanggalPenanaman) },
                    { label: 'Tanggal Pemangkasan', value: formatTanggal(treeData.tanggalPemangkasan) },
                    { label: 'Pemupukan Terakhir', value: formatTanggal(treeData.pemupukanTerakhir) },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center px-3 py-1 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="w-1/3">
                        <span className="text-sm font-medium text-gray-600">{item.label}:</span>
                      </div>
                      <div className="w-2/3">
                        <span className="text-base text-gray-800">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 italic">Data pohon tidak ditemukan</p>
              )}
            </CardContent>
          </Card>
        </div>
        {loading ? (
          <p>Loading riwayat kegiatan...</p>
        ) : riwayatKegiatan.length > 0 ? (
          riwayatKegiatan.map((kegiatan) => {
            console.log('Kegiatan:', {
              id: kegiatan.id,
              jenisKegiatan: kegiatan.jenisKegiatan,
              deskripsiKegiatan: kegiatan.deskripsiKegiatan,
              tanggalKegiatan: kegiatan.tanggalKegiatan,
            });
            return <RiwayatCard key={kegiatan.id} jenisKegiatan={kegiatan.jenisKegiatan} deskripsiKegiatan={kegiatan.deskripsiKegiatan} tanggalKegiatan={formatTanggal(kegiatan.tanggalKegiatan)} />;
          })
        ) : (
          <p>Belum ada riwayat kegiatan untuk pohon ini.</p>
        )}
      </div>
    </div>
  );
};

export default DetailTreePage;
