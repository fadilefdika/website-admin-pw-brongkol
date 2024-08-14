'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/ColumnCustomTable';
import { dummyDataPohon } from '@/data/dummyDataPohon';
import { Tree, columns } from '@/pages/tree-data/tabel-tree';

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
    <div>
      <h1>Data Tanaman</h1>
      <DataTable columns={columns} data={data} rowsPerPage={10} />
    </div>
  );
};

export default TreeDataPage;
