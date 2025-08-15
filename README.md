

# <p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube Logo" width="20"/>
</p> 
YouTube Clone

A responsive and feature-rich YouTube clone built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**, powered by the **YouTube Data API v3**.

> 🚀 Live Site: [youtube-clone26.netlify.app](https://youtube-clone26.netlify.app)  
> 📦 GitHub Repo: [github.com/anup-jha26/youtube-clone](https://github.com/anup-jha26/youtube-clone)

---

## 📸 Features

- 🔍 Search videos, channels, and playlists
- 📺 Watch video details with related content
- 📁 Browse channel playlists and videos
- 💬 View and toggle video comments
- 🧠 Responsive design with Tailwind CSS
- ⚡ Fast build with Vite and TypeScript
- 🌐 Integrated with YouTube Data API v3

---

## 🛠️ Tech Stack

| Tool           | Purpose                      |
|----------------|------------------------------|
| React + Vite   | Frontend framework & bundler |
| TypeScript     | Type-safe development        |
| Tailwind CSS   | Utility-first styling        |
| React Router   | Client-side routing          |
| YouTube API    | Data source for content      |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/anup-jha26/youtube-clone.git
cd youtube-clone
```
### 2. Install Dependencies
```
npm install
```
### 3. Add Your API Key
Create a .env file in the root:
```
VITE_API_KEY=your_youtube_api_key_here
```
> 🔐 You can get an API key from Google Cloud Console.

### 4. Run the App Locally
```
npm run dev
```
Open http://localhost:5173 in your browser.

---

## 🧪 Build for Production
```
npm run build
```
The output will be in the dist/ folder.

---

## 🌐 Deployment
This project is deployed on Netlify.  

### Manual Deployment
- Run npm run build  
- Upload the dist/ folder to Netlify  

### GitHub Integration
Netlify auto-deploys from:  
```
https://github.com/anup-jha26/youtube-clone
```
Build settings:
- Build command: npm run build
- Publish directory: dist

---

## 📁 Folder Structure (Simplified)
```
youtube-clone/
├── dist/              # Production build output
├── public/            # Static assets (logo, icons)
├── src/               # Source code
│   ├── Components/    # Reusable UI components
│   ├── Hooks/         # Custom React hooks
│   ├── Pages/         # Route-based views
│   ├── assets/        # Local images/icons
│   ├── utils/         # Helpers & types
│   ├── App.tsx        # Root component
│   ├── main.tsx       # Entry point
│   └── index.css      # Global styles
├── index.html         # HTML template
├── package.json       # Project metadata
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript config
└── README.md          # Project documentation
```

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License
This project is open-source and available under the MIT License.

---

## 👨‍💻 Author
Made with ❤️ by:  
Anup Kumar Jha  
📧 aniljha1076@gmail.com  
🔗 LinkedIn – [anupjha26](https://www.linkedin.com/in/anupjha26/)  

> 📷 Logo sourced from Wikimedia Commons