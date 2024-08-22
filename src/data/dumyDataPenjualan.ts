export type Sales = {
  id: string;
  tanggalPenjualan: string; // Mengubah tipe data menjadi string
  jenisPohon: string;
  aksesi: string;
  jumlahPenjualan: number;
  harga: number;
  totalPendapatan: number;
  keterangan: string;
};

export const dummyDataPenjualan: Sales[] = [
  {
    id: '728ed52f-1',
    tanggalPenjualan: new Date('2024-11-01').toLocaleDateString('id-ID'),
    jenisPohon: 'Pohon Durian',
    aksesi: 'Monthong',
    jumlahPenjualan: 15,
    harga: 50000,
    totalPendapatan: 750000,
    keterangan: 'Penjualan Musiman',
  },
  {
    id: '728ed52f-2',
    tanggalPenjualan: new Date('2024-11-05').toLocaleDateString('id-ID'),
    jenisPohon: 'Pohon Kopi',
    aksesi: 'Arabica',
    jumlahPenjualan: 20,
    harga: 10000,
    totalPendapatan: 200000,
    keterangan: 'Penjualan Bulanan',
  },
  {
    id: '728ed52f-3',
    tanggalPenjualan: new Date('2024-11-10').toLocaleDateString('id-ID'),
    jenisPohon: 'Pohon Durian',
    aksesi: 'Monthong',
    jumlahPenjualan: 12,
    harga: 55000,
    totalPendapatan: 660000,
    keterangan: 'Penjualan Khusus',
  },
  {
    id: '728ed52f-4',
    tanggalPenjualan: new Date('2024-11-15').toLocaleDateString('id-ID'),
    jenisPohon: 'Pohon Kopi',
    aksesi: 'Robusta',
    jumlahPenjualan: 25,
    harga: 12000,
    totalPendapatan: 300000,
    keterangan: 'Penjualan Harian',
  },
  {
    id: '728ed52f-5',
    tanggalPenjualan: new Date('2024-11-20').toLocaleDateString('id-ID'),
    jenisPohon: 'Pohon Durian',
    aksesi: 'Monthong',
    jumlahPenjualan: 18,
    harga: 52000,
    totalPendapatan: 936000,
    keterangan: 'Penjualan Musiman',
  },
  {
    id: '728ed52f-6',
    tanggalPenjualan: new Date('2024-11-22').toLocaleDateString('id-ID'),
    jenisPohon: 'Pohon Kopi',
    aksesi: 'Arabica',
    jumlahPenjualan: 30,
    harga: 11000,
    totalPendapatan: 330000,
    keterangan: 'Penjualan Bulanan',
  },
  {
    id: '728ed52f-7',
    tanggalPenjualan: new Date('2024-11-25').toLocaleDateString('id-ID'),
    jenisPohon: 'Pohon Durian',
    aksesi: 'Monthong',
    jumlahPenjualan: 10,
    harga: 53000,
    totalPendapatan: 530000,
    keterangan: 'Penjualan Langka',
  },
  {
    id: '728ed52f-8',
    tanggalPenjualan: new Date('2024-11-28').toLocaleDateString('id-ID'),
    jenisPohon: 'Pohon Kopi',
    aksesi: 'Robusta',
    jumlahPenjualan: 40,
    harga: 9500,
    totalPendapatan: 380000,
    keterangan: 'Penjualan Harian',
  },
  {
    id: '728ed52f-9',
    tanggalPenjualan: new Date('2024-12-01').toLocaleDateString('id-ID'),
    jenisPohon: 'Pohon Durian',
    aksesi: 'Monthong',
    jumlahPenjualan: 14,
    harga: 51000,
    totalPendapatan: 714000,
    keterangan: 'Penjualan Musiman',
  },
  {
    id: '728ed52f-10',
    tanggalPenjualan: new Date('2024-12-05').toLocaleDateString('id-ID'),
    jenisPohon: 'Pohon Kopi',
    aksesi: 'Arabica',
    jumlahPenjualan: 35,
    harga: 10500,
    totalPendapatan: 367500,
    keterangan: 'Penjualan Khusus',
  },
];
