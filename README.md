<p><strong> FE COGNIJOB </strong></p>
# Scope Frontend
    - UI/UX implementation
    - Client-side routing   
    - Integrasi API (frontend side)
    - State management 
    - Responsive design

# Tech Stack
    - React (Vite)
    - Tailwind CSS
    - React Router DOM
    - Axios *(untuk integrasi API)*

# Getting Started

## 1. Clone Repository
    git clone https://github.com/Cognijob/fe-cognijob.git

## 2. Install Dependencies
    npm install

## 3. Run Development Server
    npm run dev
    Aplikasi akan berjalan di:
    http://localhost:5173

# Project Structure
    src/
    │
    ├── assets/        # images, icons
    |    ├── Auth/
    |    ├── ...
    ├── components/    # reusable components
    │    ├── landing/
    │    └── layout/
        └── ...
    ├── data/          # dummy data
    │    ├── auth/
    │    └── ...
    ├── services/      # API request (axios, fetch)
    ├── pages/         # routing pages
        ├── LandingPage/
        ├── Login/
        ├── Register/
        ...
    ```

## Development Workflow

1. Ambil update terbaru
    git checkout main
    git pull origin main

2. Buat branch baru
    git checkout -b feature/nama-fitur
    Contoh:
    feature/job-listing
    feature/login-page

3. Development
    - Implement UI sesuai design
    - Use dummy data

4. Commit
    git add .
    git commit -m "feat: nama fitur"

5. Push
    git push origin feature/nama-fitur  

6. Pull Request
    - Buat PR ke branch `main`
    - Tunggu review
    - Merge setelah approve

## Development Rules
    - Dilarang push langsung ke `main`
    - 1 fitur = 1 branch
    - Wajib Pull Request
    - Pull latest sebelum mulai
    - Gunakan commit message yang jelas:
        Contoh: `feat:` fitur baru
                `fix:` bug
                `chore:` config

## MVP Features (Frontend)
    Fitur yang akan diimplementasikan:
    - Job Listing UI
    - Search & Filter UI
    - Apply Job UI
    - Authentication UI

## Notes
    - Gunakan **dummy data** sebelum integrasi API
    - Fokus ke **MVP terlebih dahulu**
    - Jaga konsistensi penamaan file & folder
    - Gunakan Tailwind untuk styling