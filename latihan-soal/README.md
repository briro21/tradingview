# Latihan Soal

Web latihan soal statis (tanpa build) dengan XP, combo, streak harian, skor terbaik, dan pembahasan.

- Isi materi di `soal.js` (format dijelaskan di bagian atas file).
- Jalankan: buka `index.html`, atau `python3 -m http.server` di folder ini.
- Deploy ke Vercel: import repo, set **Root Directory** = `latihan-soal`, framework "Other".

## Buat soal otomatis
Buka `buat-soal.html`, masukkan API key Anthropic, tempel bahan, klik **Produksi Soal**.
Paket hasilnya langsung muncul di halaman latihan (tersimpan di browser), dan bisa diunduh
sebagai `soal.js` untuk menggantikan file bawaan agar permanen untuk semua pengguna.
