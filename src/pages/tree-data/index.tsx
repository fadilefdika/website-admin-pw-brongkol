'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/ColumnCustomTable';
import { dummyDataPohon } from '@/data/dummyDataPohon';
import { Tree, columnsTree } from '@/pages/tree-data/tabel-tree';

async function getData(): Promise<Tree[]> {
  return dummyDataPohon;
}

const TreeDataPage = () => {
  const [data, setData] = useState<Tree[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="p-3 h-auto">
      <DataTable columns={columnsTree} data={data} rowsPerPage={10} title="Tabel Data Pohon" description="Tabel data tanaman kopi dan durian Desa Brongkol" />
    </div>
  );
};

export default TreeDataPage;
