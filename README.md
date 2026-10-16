# Portfolio — Next.js + Three.js

Website portofolio personal monokrom dengan kartu ID lanyard 3D interaktif.
Stack: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, React Three Fiber + Rapier, Motion, Lenis.

## Menjalankan lokal

```bash
npm install
cp .env.example .env.local   # opsional, untuk form kontak
npm run dev                  # http://localhost:3000
npm run build                # cek build produksi
```

## Mengganti data

Semua konten ada di **`src/data/portfolio.ts`**: profil, kontak, pendidikan, interests, skills, projects, experience, sertifikat, dan menu. Cari komentar `TODO` untuk bagian yang masih placeholder.

- **Skill**: setiap skill butuh ikon dari [react-icons](https://react-icons.github.io/react-icons) (set `Si` = Simple Icons). Tambahkan import di bagian atas file, misalnya `import { SiDocker } from "react-icons/si"`, lalu `{ name: "Docker", category: "Tools", icon: SiDocker }`. Tombol filter kategori dibuat otomatis dari kategori yang dipakai.
- **Project**: `slug` menjadi URL halaman detail `/projects/<slug>`. Taruh thumbnail di `public/images/projects/`.
- **Sertifikat**: taruh gambar di `public/images/certificates/`.
- **CV**: ganti `public/cv/cv.pdf`.
- **Domain**: ubah `profile.siteUrl` agar sitemap, robots, dan Open Graph memakai URL yang benar.

## Lanyard 3D

Kode ada di `src/components/lanyard/`:

| File | Isi |
| --- | --- |
| `Lanyard.tsx` | Canvas, fisika (rope + spherical joint), drag/lempar, material, lighting |
| `textures.ts` | Menggambar tekstur depan/belakang kartu dan tali memakai `<canvas>` |
| `LanyardLoader.tsx` | Dynamic import (tanpa SSR), dimuat saat browser idle, pause saat tidak terlihat |
| `StaticCard.tsx` | Kartu statis untuk pengguna `prefers-reduced-motion` |

Tidak ada file `.glb`. Kartunya dibuat dari geometri, dan teksturnya digambar saat runtime.

- **Foto**: taruh di `public/images/` lalu sesuaikan `profile.photo` di `src/data/portfolio.ts` (pakai nama file baru tiap ganti foto supaya tidak kena cache browser). Rasio terbaik kira-kira 9:8 (area foto di kartu 416×370). Foto otomatis dibuat grayscale. Kalau file tidak ada, kartu menampilkan inisial.
- **Teks kartu**: nama, role pertama, nickname, dan host GitHub diambil dari `portfolio.ts`.
- **Desain kartu**: edit `drawFront` / `drawBack` di `textures.ts` (Canvas 2D API biasa, 512×720 px).
- **Tekstur tali**: edit `makeBandTexture` di `textures.ts`. Kalau mau memakai gambar, ganti dengan `new THREE.TextureLoader().load("/images/band.png")` dan set `wrapS = wrapT = THREE.RepeatWrapping`.
- **Fisika**: `gravity`, `angularDamping`, `linearDamping`, dan panjang rope joint ada di `Lanyard.tsx`.

## Form kontak (Formspree)

1. Daftar di [formspree.io](https://formspree.io), buat form baru, lalu salin ID-nya (contoh `https://formspree.io/f/abcdwxyz` → `abcdwxyz`).
2. Lokal: isi `NEXT_PUBLIC_FORMSPREE_ID=abcdwxyz` di `.env.local`.
3. Vercel: **Project → Settings → Environment Variables**, tambahkan `NEXT_PUBLIC_FORMSPREE_ID`, lalu redeploy.

Kalau variabel ini kosong, tombol kirim membuka aplikasi email pengunjung ke alamat di `contact.email`.

## Deploy ke Vercel

**Lewat GitHub (disarankan):** push repo ke GitHub → [vercel.com/new](https://vercel.com/new) → import repo → Deploy. Framework terdeteksi otomatis, dan setiap push berikutnya akan auto-deploy.

**Lewat CLI:**

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

Setelah dapat domain, perbarui `profile.siteUrl` di `portfolio.ts`.

## Aksesibilitas & performa

- Tema gelap default. Toggle terang/gelap disimpan di `localStorage`; kalau belum pernah dipilih, mengikuti `prefers-color-scheme`.
- `prefers-reduced-motion`: animasi, smooth scroll, custom cursor, dan preloader dimatikan, dan lanyard diganti kartu statis.
- Ada link "Skip to main content", fokus keyboard yang terlihat, dan alt text di semua gambar.
- Section bawah dan modul 3D di-split jadi chunk terpisah. Canvas 3D baru dimuat saat browser idle dan berhenti render ketika keluar layar.
