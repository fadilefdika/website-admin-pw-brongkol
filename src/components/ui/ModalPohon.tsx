import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './select';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from './textarea';
import { addPohonData, updatePohonData } from '@/lib/firestoreServiceTree';
import { Timestamp } from 'firebase/firestore';

export function ModalPohon({ editData, onDataChange }: { editData?: any; onDataChange?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(editData?.tanggalPenanaman && typeof editData.tanggalPenanaman.toDate === 'function' ? editData.tanggalPenanaman.toDate() : undefined);
  const [namaPetani, setNamaPetani] = useState(editData?.namaPetani || '');
  const [jenisPohon, setJenisPohon] = useState(editData?.jenisPohon || '');
  const [aksesi, setAksesi] = useState(editData?.aksesi || '');
  const [lokasi, setLokasi] = useState(editData?.lokasi || '');
  const [catatan, setCatatan] = useState(editData?.catatan || '');

  useEffect(() => {
    if (editData) {
      setDate(editData.tanggalPenanaman && typeof editData.tanggalPenanaman.toDate === 'function' ? editData.tanggalPenanaman.toDate() : undefined);
      setNamaPetani(editData.namaPetani || '');
      setJenisPohon(editData.jenisPohon || '');
      setAksesi(editData.aksesi || '');
      setLokasi(editData.lokasi || '');
      setCatatan(editData.catatan || '');
    }
  }, [editData]);

  const handleReset = () => {
    setDate(undefined);
    setNamaPetani('');
    setJenisPohon('');
    setAksesi('');
    setLokasi('');
    setCatatan('');
  };

  const handleSubmit = async () => {
    if (!date || !namaPetani || !jenisPohon || !aksesi || !lokasi) {
      alert('Mohon isi semua field yang diperlukan');
      return;
    }

    const pohonData = {
      namaPetani,
      jenisPohon,
      aksesi,
      lokasi,
      tanggalPenanaman: Timestamp.fromDate(date),
      catatan,
    };

    try {
      if (editData) {
        await updatePohonData(editData.id, pohonData);
      } else {
        await addPohonData(pohonData);
      }
      setIsOpen(false);
      handleReset();
      if (onDataChange) {
        onDataChange(); // Trigger data reload
      }
    } catch (error) {
      console.error('Error saving tree data:', error);
      alert('Gagal menyimpan data pohon. Silakan coba lagi.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setIsOpen(true)}>
          {editData ? 'Edit Data Pohon' : 'Tambah Data Pohon'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{editData ? 'Edit Data Pohon' : 'Tambah Data Pohon'}</DialogTitle>
          <DialogDescription>{editData ? 'Edit data pohon durian atau kopi.' : 'Tambahkan data pohon durian atau kopi dengan informasi lengkap.'}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col">
            <Label htmlFor="namaPetani" className="mb-3">
              Nama Petani
            </Label>
            <Input id="namaPetani" value={namaPetani} onChange={(e) => setNamaPetani(e.target.value)} className="w-full" />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="select" className="mb-3">
              Jenis Pohon
            </Label>
            <Select value={jenisPohon} onValueChange={setJenisPohon}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Pohon" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="durian">Durian</SelectItem>
                  <SelectItem value="kopi">Kopi</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="aksesi" className="mb-3">
              Aksesi
            </Label>
            <Input id="aksesi" value={aksesi} onChange={(e) => setAksesi(e.target.value)} className="w-full" />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="tanggal-penanaman" className="mb-3">
              Tanggal Penanaman
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pilih tanggal</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(selectedDate) => setDate(selectedDate || undefined)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="lokasi" className="mb-3">
              Lokasi
            </Label>
            <Input id="lokasi" value={lokasi} onChange={(e) => setLokasi(e.target.value)} className="w-full" />
          </div>
        </div>

        <div className="mt-5">
          <Label htmlFor="catatan" className="mb-4">
            Catatan Tambahan
          </Label>
          <Textarea id="catatan" value={catatan} onChange={(e) => setCatatan(e.target.value)} className="w-full mt-2" />
        </div>

        <DialogFooter className="mt-5">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            {editData ? 'Simpan Perubahan' : 'Tambah Pohon'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
