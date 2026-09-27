# WEBSITE UNDANGAN PERNIKAHAN

Website ini dibuat mobile-first berdasarkan referensi screenshot yang diberikan.

## STRUKTUR

- index.html
- css/style.css
- js/script.js
- assets/images/
- assets/music/

## YANG PERLU DIGANTI

Masukkan foto kamu ke folder `assets/images/` dengan nama berikut:

1. cover.jpg       -> foto halaman pembuka
2. hero.jpg        -> foto setelah tombol BUKA UNDANGAN
3. bride.jpg       -> foto pengantin wanita
4. groom.jpg       -> foto pengantin pria
5. akad.jpg        -> foto bagian Akad Nikah
6. gallery-1.jpg
7. gallery-2.jpg
8. gallery-3.jpg
9. gallery-4.jpg
10. gallery-5.jpg
11. gallery-6.jpg
12. couple-gift.jpg -> foto sebelum Wedding Gift
13. closing.jpg    -> foto halaman Thank You

Format paling aman: JPG/JPEG atau WEBP.

## MUSIK

Masukkan musik ke:

assets/music/music.mp3

Nama file HARUS:
music.mp3

## NAMA TAMU OTOMATIS

Kamu bisa membuka:

index.html?to=Indera%20Nata%20Raharja

Maka bagian:

"Kepada Yth.
Indera Nata Raharja"

akan berubah otomatis.

Contoh link WhatsApp:

https://domain-kamu.com/?to=Indera%20Nata%20Raharja

## MENGGANTI NAMA PENGANTIN / TANGGAL

Edit teks langsung di `index.html`.

Tanggal countdown diatur di:

js/script.js

Cari:

const WEDDING_DATE = new Date("2026-04-12T16:00:00+07:00");

## CATATAN UCAPAN

Versi awal ini menyimpan ucapan di browser masing-masing menggunakan localStorage.

Artinya:
- cocok untuk demo/testing
- belum menjadi database bersama
- ucapan tamu belum otomatis terlihat oleh tamu lain

Untuk versi online yang benar-benar menyimpan ucapan semua tamu, bagian ini nanti dapat dipindahkan ke Firebase, Supabase, atau Google Sheets.

## CARA MENJALANKAN DI VS CODE

1. Extract ZIP.
2. Buka folder `undangan-wedding` di VS Code.
3. Install extension "Live Server".
4. Klik kanan `index.html`.
5. Pilih "Open with Live Server".
6. Buka dari HP menggunakan alamat IP komputer jika HP dan komputer berada di Wi-Fi yang sama.

## PENTING

Website sudah dibuat responsive dan fokus ke tampilan HP.
Jika foto belum dimasukkan, website akan menampilkan placeholder "GANTI FOTO".
