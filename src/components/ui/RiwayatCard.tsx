import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { dummyDataPohon } from '@/data/dummyDataPohon';

interface RiwayatCardProps {
  namaPetani: string;
}

const RiwayatCard = ({ namaPetani }: RiwayatCardProps) => {
  return (
    <Card className="bg-white shadow-lg rounded-xl p-6">
      <CardHeader className="border-b pb-4 mb-6 flex items-center justify-between">
        <CardTitle className="text-2xl font-bold text-gray-900">Riwayat Kegiatan</CardTitle>
        <span className="text-sm text-gray-500">Petani: {namaPetani}</span>
      </CardHeader>
      <CardContent className="space-y-6">
        {dummyDataPohon.map((item, index) => (
          <div key={index} className="flex items-start space-x-4 border-b pb-4">
            <div className="flex-shrink-0 bg-green-500 text-white p-2 rounded-full">
              {/* Replace with an actual icon */}
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v14a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-2 0v1H7V3a1 1 0 00-1-1zm0 4h14v12H4V6h2zm2 4h2v2H8v-2zm4 0h2v2h-2v-2zm4 0h2v2h-2v-2z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500">21 Agustus 2024</p>
              <p className="text-lg text-gray-800 font-medium">Pemupukan Pohon</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RiwayatCard;
