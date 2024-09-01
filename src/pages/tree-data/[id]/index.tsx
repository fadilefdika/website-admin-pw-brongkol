import React from 'react';
import { useRouter } from 'next/router';
import { dummyDataPohon } from '@/data/dummyDataPohon';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbSeparator, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbPage } from '@/components/ui/breadcrumb';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';
import RiwayatCard from '@/components/ui/RiwayatCard';

const DetailTreePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const tree = dummyDataPohon.find((item) => item.id === id);

  if (!tree) {
    return <div>Data tidak ditemukan</div>;
  }

  const generateQRCode = () => {
    alert('sudah tergenerate');
  };

  return (
    <div className="p-3 min-h-min">
      <div className="flex flex-col gap-4">
        <BreadcrumbCustom title="Data Pohon" href="/tree-data" curentPage="Detail Pohon" />
        <div className="flex flex-row gap-4 ">
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
                <strong>Jenis Pohon:</strong> {tree.jenisPohon}
              </p>
              <p>
                <strong>Aksesi:</strong> {tree.aksesi}
              </p>
              <p>
                <strong>Lokasi:</strong> {tree.lokasi}
              </p>
              <p>
                <strong>Tanggal Penanaman:</strong> {tree.tanggalPenanaman}
              </p>
              <p>
                <strong>Tanggal Pemangkasan:</strong> {tree.tanggalPemangkasan}
              </p>
              <p>
                <strong>Pemupukan Terakhir:</strong> {tree.pemupukanTerakhir}
              </p>
            </CardContent>
          </Card>
        </div>
        <RiwayatCard namaPetani={tree.namaPetani} />
      </div>
    </div>
  );
};

export default DetailTreePage;
