# 💊 Bahaya Narkoba — Website Edukasi Kesehatan

Website edukasi interaktif berbasis HTML/CSS/JS murni tentang bahaya narkoba — cara narkotika bekerja di otak, dampaknya pada organ tubuh, data nasional, dan jalan menuju pemulihan. Dirancang dengan desain dark modern, animasi CSS, dan konten yang dimuat dari file JSON.

Konten disusun berdasarkan mekanisme neurosains dan farmakologi yang telah diverifikasi (lihat bagian **Validasi & Koreksi Data** di bawah).

## 📁 Struktur Proyek

```
repo/
├─ index.html          # Halaman utama
├─ css/style.css       # Semua styling & animasi
├─ js/script.js        # Logika interaktif & data loading
└─ assets/
   ├─ teks/            # Konten teks (JSON)
   ├─ svg/             # Ilustrasi SVG
   ├─ anim/            # Metadata animasi (JSON)
   ├─ icons/           # Ikon UI SVG
   ├─ shapes/          # Elemen dekoratif SVG
   └─ data/            # Fakta, statistik, FAQ (JSON)
```

## 🚀 Cara Menjalankan

### Lokal (dengan Live Server)
1. Clone atau download repositori ini
2. Buka dengan **VS Code** → Install ekstensi **Live Server**
3. Klik kanan `index.html` → **Open with Live Server**

> ⚠️ Tidak bisa dibuka langsung dengan `file://` karena `fetch()` membutuhkan server HTTP. Jika dibuka langsung, situs akan otomatis memakai konten cadangan (fallback) yang lebih ringkas dari `js/script.js`.

### Alternatif — Python HTTP Server
```bash
cd repo/
python -m http.server 8080
# Buka browser: [localhost](http://localhost:8080)
```

### Deploy ke GitHub Pages
1. Push semua file ke repository GitHub
2. Buka **Settings** → **Pages**
3. Source: **Deploy from a branch** → pilih `main` / `root`
4. Simpan — website akan aktif di `[username.github.io](https://username.github.io/repo-name/)`

## ✨ Fitur

- **Typing effect** pada hero dengan teks bergantian
- **Counter animasi** untuk statistik kunci
- **Tab navigation** untuk 7 bab bahaya narkoba (neurologi, kecanduan, kardiovaskular, overdosis, klasifikasi zat, kelompok rentan, sosial-kebijakan)
- **Visual organ interaktif** (otak, jantung, pernapasan, hati)
- **Carousel fakta** dengan swipe touch support
- **FAQ accordion** dengan animasi smooth
- **Progress bar** scroll halaman
- **Active nav highlight** berbasis IntersectionObserver
- **Dark modern design** dengan aksen merah & tipografi Space Grotesk / Inter
- **Fully responsive** mobile-first

## 🔎 Validasi & Koreksi Data

Konten situs ini diadaptasi dari laporan medis-neurologis yang disediakan, lalu diverifikasi ulang lewat pencarian tambahan sebelum dipublikasikan. Beberapa koreksi penting terhadap draf awal:

- **Statistik kasus BNN** — angka "9.348 kasus / 12.137 tersangka" pada draf awal tidak cocok dengan rilis resmi manapun yang ditemukan. Diganti dengan data resmi akhir tahun BNN (618 kasus/974 tersangka pada 2024; 746+ kasus pada 2025) dan data gabungan Polri–BNN.
- **Prevalensi nasional** — angka "1,73%–2,23%" dikoreksi menjadi hasil resmi Survei BNN–BRIN: 1,73% (2023) naik menjadi 2,11% (periode 2023–2025), setara 4,15 juta jiwa.
- **Angka "5,9 juta" pengguna di Sulawesi Utara** — ditelusuri ke sumber akademis aslinya dan tidak digunakan, karena secara demografis tidak mungkin (melebihi total populasi provinsi tersebut) dan kemungkinan besar merupakan kekeliruan kutip data nasional sebagai data provinsi.
- **Mekanisme neurosains** (reseptor CB1/opioid/DAT/VMAT2, kompleks preBötzinger, downregulasi reseptor D2, kerangka iRISA, kokaetilen, paradoks CYP2D6 pada metamfetamin) — dikonfirmasi konsisten dengan literatur ilmiah yang tersedia.
- **Mitos kandungan lem Aibon** — memastikan situs ini menyebut zat berbahayanya secara akurat sebagai **toluena** (pelarut kimia), bukan LSD seperti miskonsepsi yang beredar luas di sejumlah sumber daring.

## 📚 Sumber Data

- [UNODC — World Drug Report 2025](https://www.unodc.org/unodc/en/data-and-analysis/world-drug-report-2025.html)
- [BNN RI](https://bnn.go.id)
- [Layanan Rehabilitasi BNN](https://rehabilitasi.bnn.go.id) · Call Center **184** (24 jam)

## 📄 Lisensi

Proyek ini dibuat untuk keperluan edukasi kesehatan publik. Materi bersifat informatif dan bukan pengganti konsultasi medis profesional.
