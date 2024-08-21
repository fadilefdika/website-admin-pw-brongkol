'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/ColumnCustomTable';
import { dummyDataPenjualan } from '@/data/dumyDataPenjualan';
import { Sales, columnsSales } from '@/pages/sales-data/tabel-sales';

async function getData(): Promise<Sales[]> {
  return dummyDataPenjualan;
}

const SalesDataPage = () => {
  const [data, setData] = useState<Sales[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="p-3 h-auto">
      <DataTable columns={columnsSales} data={data} rowsPerPage={10} title="Tabel Data Penjualan" description="Tabel data penjualan Desa Brongkol" nameButton="Tambah Data Penjualan" />
    </div>
  );
};

export default SalesDataPage;
