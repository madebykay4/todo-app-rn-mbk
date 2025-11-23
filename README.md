# 📱 React Native Todo App (Expo)

A simple, clean, and functional mobile Todo application built with **React Native** and **Expo**.  
Developed as part of my journey into becoming a full-stack and mobile app developer — and yes, this project also survived missing dependencies, typo gremlins, and the occasional *“Why isn’t this rendering???”* moment.

![React Native](https://img.shields.io/badge/React%20Native-0.74-%2361DAFB)
![Expo](https://img.shields.io/badge/Expo-Latest-black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

---

## 📸 App Preview

> **Screenshots coming soon**  
> *(A screen recording will also be added once the UI is finalized.)*

---

## 🌟 Features

- ✅ Add todos  
- ✏️ Edit todos  
- ❌ Delete todos  
- 🌗 Dark / Light mode toggle  
- 📱 Fully responsive mobile UI  
- ⚡ Smooth UI interactions  
- 🧠 State management with Zustand  
- 🔧 Clean, reusable components  

---

## 🧩 Tech Stack

- **Framework**: React Native (Expo)
- **State Management**: Zustand
- **Navigation**: React Navigation
- **Styling**: Custom Stylesheets / Tailwind (depending on your version)
- **Testing/Preview**: Expo Go, iOS Simulator, Android Emulator
- **Tutorial By**: Codesistency

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/madebykay4/todo-app-rn-mbk
```bash
cd todo-app-rn-mbk
```
### 2️⃣ Install Dependencies
```bash
npm install
```
### 3️⃣ Run the App
```bash
npx expo start
```
Then scan the QR code in Expo Go or run it on an Android/iOS simulator.

### 📖 Lessons Learned
**Component Organization**
Structuring screens & shared components early prevents chaos.

**State Management**
Zustand is lightweight, intuitive, and great for small-to-mid apps.

**Debugging React Native**
Metro logs, device logs, Expo dev tools, and RN Debugger are essential.

**Cross-Platform Differences**
iOS and Android handle spacing, shadows, and font rendering differently.

### 🐛 Common Issues & Fixes
**Issue	Solution**
- Metro bundler stuck on "Loading..."	Run npx expo start -c to clear cache
- State not updating	Ensure Zustand set functions return new state
- App crash on launch	Fix missing imports / remove circular dependencies
- Dark mode not applying	Wrap navigation in a global theme provider

## 🎥 Tutorial Credit
This project is based on the tutorial by Codesistency:
🔗 https://www.youtube.com/watch?v=G1XiiXTQHSE

Highly recommended for anyone learning React Native the practical way.
#
### 👩‍💻 Author - Kaylyn Groom
**Full-Stack Dev in training • Mobile App Developer • Multi-disciplinary Creative**
