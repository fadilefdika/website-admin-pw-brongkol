import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';
import RiwayatCard from '@/components/ui/RiwayatCard';
import { TreeDataContext } from '@/context/TreeDataContext';

// Define the structure of your tree data
interface TreeData {
  id: string;
  jenisPohon: string;
  aksesi: string;
  lokasi: string;
  tanggalPenanaman: string;
  tanggalPemangkasan: string;
  pemupukanTerakhir: string;
}

// Define the structure of your riwayat kegiatan
interface RiwayatKegiatan {
  id: string;
  namaPetani: string;
  deskripsi: string;
  tanggalKegiatan: string;
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

  if (!treeData) {
    return <p>Data tidak ditemukan</p>;
  }

  const generateQRCode = () => {
    alert('sudah tergenerate');
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
                <strong>Tanggal Penanaman:</strong> {new Date(treeData.tanggalPenanaman).toLocaleDateString()}
              </p>
              <p>
                <strong>Tanggal Pemangkasan:</strong> {new Date(treeData.tanggalPemangkasan).toLocaleDateString()}
              </p>
              <p>
                <strong>Pemupukan Terakhir:</strong> {new Date(treeData.pemupukanTerakhir).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>
        {loading ? (
          <p>Loading riwayat kegiatan...</p>
        ) : riwayatKegiatan.length > 0 ? (
          riwayatKegiatan.map((kegiatan) => <RiwayatCard key={kegiatan.id} namaPetani={kegiatan.namaPetani} deskripsiKegiatan={kegiatan.deskripsi} tanggalKegiatan={kegiatan.tanggalKegiatan} />)
        ) : (
          <p>Belum ada riwayat kegiatan untuk pohon ini.</p>
        )}
      </div>
    </div>
  );
};

export default DetailTreePage;
