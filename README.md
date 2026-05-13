# 🌌 Futuristic Portfolio — Next.js 15 + Firebase

A premium, interactive portfolio experience built with **Next.js 15 (App Router)**, **Tailwind CSS 4**, and **Firebase**. This project features cinematic animations, a secret admin dashboard, and a dynamic real-time backend.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge&logo=vercel)
![Tech Stack](https://img.shields.io/badge/Tech-Next.js%20|%20Firebase%20|%20Three.js-blue?style=for-the-badge)

---

## ✨ Key Features

- **🎭 Cinematic UI/UX**: Built with a "dark glassmorphism" aesthetic, featuring smooth gradients, micro-animations, and a custom particle background.
- **🕵️ Classified Projects**: An interactive "Surprise Mode" for projects that requires "decryption" animations to reveal.
- **🔥 Real-time Firestore**: Projects and blog posts are synced in real-time across all visitors using Firebase onSnapshot listeners.
- **✉️ Seamless Contact**: Integrated with **EmailJS** for direct inbox delivery and **Firebase** for message logging.
- **📱 Ultra-Responsive**: Fully optimized for everything from ultra-wide monitors to the smallest mobile screens.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: Framer Motion & CSS Keyframes
- **Backend/Auth**: [Firebase](https://firebase.google.com/) (Firestore & Auth)
- **Email**: [EmailJS](https://www.emailjs.com/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rutansh-07/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your credentials:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# EmailJS (Optional)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see your portfolio live.

---

## 🔑 Admin Dashboard

To access the secret admin mode:
1. Navigate to the site.
2. Use the secret trigger (Check `AdminProvider.tsx` for the specific key combination or hidden button).
3. Log in using your Firebase credentials.
4. You can now **Add**, **Edit**, or **Delete** projects and blog posts in real-time.

---

## 📸 Sections

- **Hero**: Kinetic typography with a futuristic photo frame.
- **Skills**: Interactive tech stack display with category filtering.
- **Experience**: Clean timeline of professional growth.
- **Projects**: Grid layout with "Surprise Mode" for stealth projects.
- **Blog**: Dynamic feed of articles and thoughts.
- **Contact**: Advanced form with validation and success states.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with 💜 by <a href="https://github.com/rutansh-07">Rutansh Govardhan</a>
</p>
