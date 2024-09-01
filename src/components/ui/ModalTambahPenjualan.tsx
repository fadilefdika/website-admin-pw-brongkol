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
import { useState } from 'react';
import { Textarea } from './textarea';

export function ModalTambahPenjualan({ dataToEdit }: { dataToEdit?: any }) {
  const [pohon, setPohon] = useState(dataToEdit?.pohon || '');
  const [aksesi, setAksesi] = useState(dataToEdit?.aksesi || '');
  const [date, setDate] = useState<Date | undefined>(dataToEdit?.tanggalPenjualan ? new Date(dataToEdit?.tanggalPenjualan) : undefined);
  const [jumlahPenjualan, setJumlahPenjualan] = useState(dataToEdit?.jumlahPenjualan || '');
  const [hargaPenjualan, setHargaPenjualan] = useState(dataToEdit?.hargaPenjualan || '');
  const [totalPendapatan, setTotalPendapatan] = useState(dataToEdit?.totalPendapatan || '');
  const [catatan, setCatatan] = useState(dataToEdit?.catatan || '');

  // Fungsi untuk mereset semua input ke nilai awal
  const handleReset = () => {
    setPohon('');
    setAksesi('');
    setDate(undefined);
    setJumlahPenjualan('');
    setHargaPenjualan('');
    setTotalPendapatan('');
    setCatatan('');
  };

  // Fungsi untuk menyimpan perubahan (fungsi simpan yang sebenarnya harus ditambahkan)
  const handleSave = () => {
    // Simpan logika data di sini
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{dataToEdit ? 'Edit Data Penjualan' : 'Tambah Data Penjualan'}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{dataToEdit ? 'Edit Data Penjualan' : 'Tambah Data Penjualan'}</DialogTitle>
          <DialogDescription>
            Masukkan data penjualan dengan detail lengkap seperti tanggal, jenis tanaman, tipe varietas, jumlah (kg), harga per kg, total pendapatan, dan keterangan. Data ini akan membantu dalam memantau dan mengelola penjualan hasil kebun
            secara efektif.
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
            <Label htmlFor="tanggal-penjualan" className="mb-3">
              Tanggal Penjualan
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pilih tanggal</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="jumlahPenjualan" className="mb-3">
              Jumlah (kg)
            </Label>
            <Input id="jumlahPenjualan" value={jumlahPenjualan} onChange={(e) => setJumlahPenjualan(e.target.value)} className="w-full" />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="hargaPenjualan" className="mb-3">
              Harga per kg
            </Label>
            <Input id="hargaPenjualan" value={hargaPenjualan} onChange={(e) => setHargaPenjualan(e.target.value)} className="w-full" />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="totalPendapatan" className="mb-3">
              Total Pendapatan
            </Label>
            <Input id="totalPendapatan" value={totalPendapatan} onChange={(e) => setTotalPendapatan(e.target.value)} className="w-full" />
          </div>
        </div>

        <div className="mt-5">
          <Label htmlFor="catatan" className="mb-4">
            Catatan Tambahan
          </Label>
          <Textarea id="catatan" value={catatan} onChange={(e) => setCatatan(e.target.value)} className="w-1/2 mt-2" />
        </div>

        <DialogFooter className="mt-5 flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" onClick={handleSave}>
            {dataToEdit ? 'Simpan Perubahan' : 'Tambah Data'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
