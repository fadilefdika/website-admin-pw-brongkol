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
import { useState, useEffect } from 'react';
import { Textarea } from './textarea';

export function ModalTambahPohon({ editData }: { editData?: any }) {
  const [date, setDate] = useState<Date | undefined>(editData?.tanggalPenanaman || undefined);
  const [pohon, setPohon] = useState(editData?.pohon || '');
  const [aksesi, setAksesi] = useState(editData?.aksesi || '');
  const [lokasi, setLokasi] = useState(editData?.lokasi || '');
  const [catatan, setCatatan] = useState(editData?.catatan || '');

  // Fungsi untuk mereset form
  const handleReset = () => {
    setDate(undefined);
    setPohon('');
    setAksesi('');
    setLokasi('');
    setCatatan('');
  };

  // Update state jika data untuk edit tersedia
  useEffect(() => {
    if (editData) {
      setDate(editData.tanggalPenanaman || undefined);
      setPohon(editData.pohon || '');
      setAksesi(editData.aksesi || '');
      setLokasi(editData.lokasi || '');
      setCatatan(editData.catatan || '');
    }
  }, [editData]);

  const handleSubmit = () => {
    // Logika untuk menyimpan data
    // Jika `editData` ada, maka simpan perubahan, jika tidak maka tambahkan data baru
    console.log({ pohon, aksesi, date, lokasi, catatan });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{editData ? 'Edit Data Pohon' : 'Tambah Data Pohon'}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{editData ? 'Edit Data Pohon' : 'Tambah Data Pohon'}</DialogTitle>
          <DialogDescription>
            Tambahkan data pohon durian atau kopi dengan informasi lengkap seperti jenis tanaman, tipe varietas, lokasi, tanggal penanaman, tanggal pemangkasan, dan pemupukan terakhir untuk memantau dan mengelola kebun secara efektif.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col">
            <Label htmlFor="select" className="mb-3">
              Pilih Pohon
            </Label>
            <Select value={pohon} onValueChange={setPohon}>
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
          <Textarea id="catatan" value={catatan} onChange={(e) => setCatatan(e.target.value)} className="w-1/2 mt-2" />
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
