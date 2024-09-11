import { Timestamp } from 'firebase/firestore';

interface RiwayatKegiatan {
  id: string;
  jenisKegiatan: string;
  tanggalKegiatan: Timestamp | string;
  deskripsiKegiatan: string;
}

export type Tree = {
  id: string;
  namaPetani: string;
  jenisPohon: string;
  aksesi: string;
  lokasi: string;
  tanggalPenanaman: Date;
  tanggalPemangkasan: Date;
  pemupukanTerakhir: Date;
  riwayatKegiatan: RiwayatKegiatan[];
};
