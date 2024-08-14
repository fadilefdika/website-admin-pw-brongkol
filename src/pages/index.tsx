'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import Durian from '../../public/durian.svg';
import Cofeee from '../../public/coffee.svg';
import Bullish from '../../public/bullish.svg';
import Scales from '../../public/scales.svg';
import Scaless from '../../public/scaless.svg';
import { DollarSignIcon } from 'lucide-react';
import CustomCard from '@/components/ui/CustomCard';
import { formatNumber } from '@/utils/formatNumber';
import { Tree, columns } from '@/pages/tree-data/tabel-tree';
import { DataTable } from '@/components/ui/ColumnCustomTable';
import { dummyDataPohon } from '@/data/dummyDataPohon';

async function getData(): Promise<Tree[]> {
  return dummyDataPohon;
}

const Home: React.FC = () => {
  const [data, setData] = useState<Tree[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []);
  return (
    <div className="mx-auto p-3">
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-6">
          <CustomCard className="w-[280px]" title="Jumlah Tanaman Durian" description="22 November 2024" content={formatNumber(22)} trees={<Durian className="w-6 h-6" />} indicator={<Bullish className="w-6 h-6" />} percentage={12} />
          <CustomCard className="w-[280px]" title="Jumlah Blok Tanaman Kopi" description="22 November 2024" content={formatNumber(12)} trees={<Cofeee className="w-6 h-6" />} indicator={<Bullish className="w-6 h-6" />} percentage={10} />
          <CustomCard
            className="w-[340px]"
            title="Total Pendapatan Saat ini "
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
      <div className="mx-auto py-10">
        <DataTable columns={columns} data={data} rowsPerPage={5} />
      </div>
    </div>
  );
};

export default Home;
