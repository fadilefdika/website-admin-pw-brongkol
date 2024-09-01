export type Tree = {
  id: string;
  jenisPohon: string;
  namaPetani: string;
  aksesi: string;
  lokasi: string;
  tanggalPenanaman: string;
  tanggalPemangkasan: string;
  pemupukanTerakhir: string;
};

export const dummyDataPohon: Tree[] = [
  {
    id: '1',
    jenisPohon: 'Pohon Kopi',
    namaPetani: 'Pak Har',
    aksesi: 'Arabica',
    lokasi: 'Rumah Pak Har',
    tanggalPenanaman: new Date('2024-11-22').toLocaleDateString('id-ID'),
    tanggalPemangkasan: new Date('2024-11-22').toLocaleDateString('id-ID'),
    pemupukanTerakhir: new Date('2024-11-22').toLocaleDateString('id-ID'),
  },
  {
    id: '2',
    jenisPohon: 'Pohon Durian',
    namaPetani: 'Pak Almaas',
    aksesi: 'Musangking',
    lokasi: 'Rumah Pak Almaas',
    tanggalPenanaman: new Date('2024-11-22').toLocaleDateString('id-ID'),
    tanggalPemangkasan: new Date('2024-11-22').toLocaleDateString('id-ID'),
    pemupukanTerakhir: new Date('2024-11-22').toLocaleDateString('id-ID'),
  },
  {
    id: '3',
    jenisPohon: 'Pohon Kopi',
    namaPetani: 'Pak Joko',
    aksesi: 'Robusta',
    lokasi: 'Rumah Pak Joko',
    tanggalPenanaman: new Date('2024-10-15').toLocaleDateString('id-ID'),
    tanggalPemangkasan: new Date('2024-11-01').toLocaleDateString('id-ID'),
    pemupukanTerakhir: new Date('2024-10-30').toLocaleDateString('id-ID'),
  },
  {
    id: '4',
    jenisPohon: 'Pohon Durian',
    namaPetani: 'Bu Sari',
    aksesi: 'Monthong',
    lokasi: 'Rumah Bu Sari',
    tanggalPenanaman: new Date('2024-09-10').toLocaleDateString('id-ID'),
    tanggalPemangkasan: new Date('2024-10-05').toLocaleDateString('id-ID'),
    pemupukanTerakhir: new Date('2024-09-25').toLocaleDateString('id-ID'),
  },
  {
    id: '5',
    jenisPohon: 'Pohon Kopi',
    namaPetani: 'Pak Dedi',
    aksesi: 'Liberica',
    lokasi: 'Rumah Pak Dedi',
    tanggalPenanaman: new Date('2024-07-20').toLocaleDateString('id-ID'),
    tanggalPemangkasan: new Date('2024-08-15').toLocaleDateString('id-ID'),
    pemupukanTerakhir: new Date('2024-07-30').toLocaleDateString('id-ID'),
  },
  {
    id: '6',
    jenisPohon: 'Pohon Durian',
    namaPetani: 'Pak Budi',
    aksesi: 'D24',
    lokasi: 'Rumah Pak Budi',
    tanggalPenanaman: new Date('2024-06-25').toLocaleDateString('id-ID'),
    tanggalPemangkasan: new Date('2024-07-15').toLocaleDateString('id-ID'),
    pemupukanTerakhir: new Date('2024-06-30').toLocaleDateString('id-ID'),
  },
  {
    id: '7',
    jenisPohon: 'Pohon Kopi',
    namaPetani: 'Pak Eko',
    aksesi: 'Excelsa',
    lokasi: 'Rumah Pak Eko',
    tanggalPenanaman: new Date('2024-05-18').toLocaleDateString('id-ID'),
    tanggalPemangkasan: new Date('2024-06-10').toLocaleDateString('id-ID'),
    pemupukanTerakhir: new Date('2024-05-28').toLocaleDateString('id-ID'),
  },
  {
    id: '8',
    jenisPohon: 'Pohon Durian',
    namaPetani: 'Bu Ani',
    aksesi: 'Montong',
    lokasi: 'Rumah Bu Ani',
    tanggalPenanaman: new Date('2024-04-12').toLocaleDateString('id-ID'),
    tanggalPemangkasan: new Date('2024-05-05').toLocaleDateString('id-ID'),
    pemupukanTerakhir: new Date('2024-04-22').toLocaleDateString('id-ID'),
  },
  {
    id: '9',
    jenisPohon: 'Pohon Kopi',
    namaPetani: 'Pak Agus',
    aksesi: 'Typica',
    lokasi: 'Rumah Pak Agus',
    tanggalPenanaman: new Date('2024-03-10').toLocaleDateString('id-ID'),
    tanggalPemangkasan: new Date('2024-04-01').toLocaleDateString('id-ID'),
    pemupukanTerakhir: new Date('2024-03-25').toLocaleDateString('id-ID'),
  },
  {
    id: '10',
    jenisPohon: 'Pohon Durian',
    namaPetani: 'Pak Yanto',
    aksesi: 'Raja Kunyit',
    lokasi: 'Rumah Pak Yanto',
    tanggalPenanaman: new Date('2024-02-20').toLocaleDateString('id-ID'),
    tanggalPemangkasan: new Date('2024-03-10').toLocaleDateString('id-ID'),
    pemupukanTerakhir: new Date('2024-02-28').toLocaleDateString('id-ID'),
  },
];
