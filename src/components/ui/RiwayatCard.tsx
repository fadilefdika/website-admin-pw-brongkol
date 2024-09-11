import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';

// Update the interface to match the props being used
interface RiwayatCardProps {
  jenisKegiatan: string;
  deskripsiKegiatan: string;
  tanggalKegiatan: string;
}

const RiwayatCard: React.FC<RiwayatCardProps> = ({ jenisKegiatan, deskripsiKegiatan, tanggalKegiatan }) => {
  return (
    <Card className="bg-white shadow-lg rounded-xl p-6">
      <CardHeader className="border-b pb-4 mb-6 flex items-center justify-between">
        <CardTitle className="text-2xl font-bold text-gray-900">Riwayat Kegiatan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 bg-gradient-to-br from-green-400 to-green-600 text-white p-3 rounded-lg shadow-md">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-2 0v1H7V3a1 1 0 00-1-1zm0 4h14v12H4V6h2zm2 4h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
            </svg>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <p className="text-base font-semibold text-green-600 mb-1">{jenisKegiatan}</p>
            <p className="text-xs text-gray-500 mb-2">{tanggalKegiatan}</p>
            <p className="text-base text-gray-800">{deskripsiKegiatan}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiwayatCard;
