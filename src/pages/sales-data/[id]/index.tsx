import React from 'react';
import { useRouter } from 'next/router';
import { dummyDataPenjualan } from '@/data/dumyDataPenjualan';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import BreadcrumbCustom from '@/components/ui/BreadcrumbCustom';

const DetailSalesPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const sales = dummyDataPenjualan.find((item) => item.id === id);

  if (!sales) {
    return <div>Data tidak ditemukan</div>;
  }

  return (
    <div className="p-3 min-h-full">
      <div className="flex flex-col gap-4">
        <BreadcrumbCustom title="Data Penjualan" href="/sales-data" curentPage="Detail Penjualan" />
        <div className="flex flex-row gap-4 ">
          <Card className="flex-1 h-max">
            <CardHeader>
              <CardTitle>Detail Penjualan</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Tanggal Penjualan :</strong> {sales.tanggalPenjualan}
              </p>
              <p>
                <strong>Jenis Pohon :</strong> {sales.jenisPohon}
              </p>
              <p>
                <strong>Aksesi :</strong> {sales.aksesi}
              </p>
              <p>
                <strong>Jumlah Penjualan :</strong> {sales.jumlahPenjualan}
              </p>
              <p>
                <strong>Harga :</strong> {sales.harga}
              </p>
              <p>
                <strong>Total Pendapatan :</strong> {sales.totalPendapatan}
              </p>
              <p>
                <strong>Total Pendapatan :</strong> {sales.totalPendapatan}
              </p>
              <p>
                <strong>Keterangan :</strong> {sales.totalPendapatan}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailSalesPage;
