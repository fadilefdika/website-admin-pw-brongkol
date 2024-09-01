// pages/tree-data/index.tsx
import React, { useContext } from 'react';
import { DataTable } from '@/components/ui/ColumnCustomTable';
import { columnsTree } from '@/pages/tree-data/tabel-tree';
import { TreeDataContext } from '@/context/TreeDataContext';

const TreeDataPage = () => {
  const context = useContext(TreeDataContext);

  if (!context) {
    return <p>Context error</p>;
  }

  const { data, loading, error } = context;

  return (
    <div className="p-3 min-h-full">
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <DataTable columns={columnsTree} data={data} rowsPerPage={10} title="Tabel Data Pohon" description="Tabel data tanaman kopi dan durian Desa Brongkol" />}
    </div>
  );
};

export default TreeDataPage;
