'use client';
import React from 'react';
import { useTreeData } from '@/context/TreeDataContext';
import Durian from '../../public/durian.svg';
import Cofeee from '../../public/coffee.svg';
import Bullish from '../../public/bullish.svg';
import Scales from '../../public/scales.svg';
import Scaless from '../../public/scaless.svg';
import { DollarSignIcon } from 'lucide-react';
import CustomCard from '@/components/ui/CustomCard';
import { formatNumber } from '@/utils/formatNumber';
import { DataTable } from '@/components/ui/ColumnCustomTable';
import { columnsTree } from '@/pages/tree-data/tabel-tree';
import { columnsSales } from './sales-data/tabel-sales';
import { dummyDataPenjualan } from '@/data/dummyDataPenjualan';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMesage';

const Home: React.FC = () => {
  const { data: dataPohon, loading, error } = useTreeData();

  if (loading) return <LoadingSpinner message="Loading..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="mx-auto p-3 min-h-dvh">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-6">
          <CustomCard className="w-[280px]" title="Jumlah Tanaman Durian" description="22 November 2024" content={formatNumber(22)} trees={<Durian className="w-6 h-6" />} indicator={<Bullish className="w-6 h-6" />} percentage={12} />
          <CustomCard className="w-[280px]" title="Jumlah Blok Tanaman Kopi" description="22 November 2024" content={formatNumber(12)} trees={<Cofeee className="w-6 h-6" />} indicator={<Bullish className="w-6 h-6" />} percentage={10} />
          <CustomCard
            className="w-[340px]"
            title="Total Pendapatan Saat ini"
            description="22 November 2024"
            prefix="Rp"
            content={formatNumber(5000000)}
            trees={<DollarSignIcon className="w-6 h-6" />}
            indicator={<Bullish className="w-6 h-6" />}
            percentage={10}
          />
        </div>
        <div className="flex flex-row gap-6">
          <CustomCard
            className="w-[280px]"
            title="Jumlah Produksi Durian Tahun Ini"
            description="22 November 2024"
            content={formatNumber(22)}
            suffix="/kg"
            trees={<Scales className="w-7 h-7" />}
            indicator={<Bullish className="w-6 h-6" />}
            percentage={12}
          />
          <CustomCard
            className="w-[280px]"
            title="Jumlah Produksi Kopi Tahun Ini"
            description="22 November 2024"
            content={formatNumber(12)}
            suffix="/kg"
            trees={<Scaless className="w-6 h-6" />}
            indicator={<Bullish className="w-6 h-6" />}
            percentage={10}
          />
        </div>
      </div>

      {/* Tabel Rekap Pohon Durian dan Kopi */}
      <div className="mx-auto pt-10">
        <DataTable columns={columnsTree} data={dataPohon} rowsPerPage={5} title="Rekap Data Pohon" description="Rekapitulasi data tanaman kopi dan durian Desa Brongkol" />
      </div>

      {/* Tabel Rekap Penjualan */}
      <div className="mx-auto pt-10 pb-5">
        <DataTable columns={columnsSales} data={dummyDataPenjualan} rowsPerPage={5} title="Rekap Data Penjualan" description="Rekapitulasi data penjualan Desa Brongkol" />
      </div>
    </div>
  );
};

export default Home;
