'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/router';

export type Sales = {
  id: string;
  tanggalPenjualan: string;
  jenisPohon: string;
  aksesi: string;
  jumlahPenjualan: number;
  harga: number;
  totalPendapatan: number;
  keterangan: string;
};

export const columnsSales: ColumnDef<Sales>[] = [
  {
    header: 'No',
    accessorFn: (_, index) => index + 1,
  },
  {
    accessorKey: 'tanggalPenjualan',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <div className="flex flex-col text-left">
            <span>Tanggal</span>
            <span>Penjualan</span>
          </div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'jenisPohon',
    header: 'Jenis Pohon',
  },
  {
    accessorKey: 'aksesi',
    header: 'Aksesi',
  },
  {
    accessorKey: 'jumlahPenjualan',
    header: ({}) => {
      return (
        <div className="flex flex-col text-left">
          <span>Jumlah</span>
          <span>Penjualan (kg)</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'harga',
    header: 'Harga per kg',
  },
  {
    accessorKey: 'totalPendapatan',
    header: 'Total Pendapatan',
  },
  {
    accessorKey: 'keterangan',
    header: 'Keterangan',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const sales = row.original;
      const router = useRouter();

      const handleDetail = () => {
        router.push(`/sales-data/${sales.id}`);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleDetail}>Detail</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Hapus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
