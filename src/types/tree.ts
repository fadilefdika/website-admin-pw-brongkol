interface RiwayatKegiatan {
  id: string;
  treeId: string;
  namaPetani: string;
  tanggalKegiatan: string;
  deskripsi: string;
}

export type Tree = {
  id: string;
  jenisPohon: string;
  aksesi: string;
  lokasi: string;
  tanggalPenanaman: Date;
  tanggalPemangkasan: Date;
  pemupukanTerakhir: Date;
  riwayatKegiatan: RiwayatKegiatan[];
};
