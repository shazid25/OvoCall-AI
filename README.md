# OvoCall AI 🚀  
**AI-Powered Intelligent Video Calling Platform**

OvoCall AI is a next-generation web application that transforms traditional video calls into **intelligent, goal-driven AI sessions**.  
Instead of passive meetings, users interact live with AI agents such as language tutors, interview coaches, and custom assistants — with automated summaries and post-meeting analysis.

---

## ✨ Features

- 🎥 **AI-Powered Video Calls**
- 🤖 **Role-Based AI Agents**
  - Language Tutor
  - Interview Coach
  - Sales Assistant
  - Custom AI Assistant
- 📝 **Automatic Meeting Summaries**
- 📼 **Secure Meeting Recording**
- 💬 **Ask AI – Post-Meeting Analysis**
- 🔐 **User Authentication & Profiles**
- 🕒 **Meeting History & Insights**

---

## 🧠 Tech Stack

### Frontend
- **Next.js 15** – App Router & optimized performance
- **React 19**
- **Tailwind CSS 4**
- **Radix UI** – Accessible UI components
- **Lucide Icons**

### Backend & Infrastructure
- **Node.js**
- **API-based architecture**
- **Serverless-friendly setup**

### Database
- **Drizzle ORM**
- **Neon (PostgreSQL – serverless)**

### Forms & Validation
- **React Hook Form**
- **Zod**

### Tooling
- **TypeScript**
- **ESLint**
- **Drizzle Kit**
- **CI/CD ready**

---

## 📁 Project Structure (High Level)

```txt
ovo-call-ai/
├── app/                # Next.js app router
├── components/         # Reusable UI components
├── db/                 # Drizzle schema & database logic
├── lib/                # Utilities & helpers
├── styles/             # Global styles
├── public/             # Static assets
├── .env.example        # Environment variables template
├── package.json
└── README.md
````

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_neon_database_url
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ Never commit your `.env` file to version control.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ovo-call-ai.git
cd ovo-call-ai
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Database

```bash
npm run db:push
```

Optional: Open database studio

```bash
npm run db:studio
```

### 4️⃣ Run Development Server

```bash
npm run dev
```

App will be available at:

```
http://localhost:3000
```

---

## 📜 Available Scripts

| Script              | Description              |
| ------------------- | ------------------------ |
| `npm run dev`       | Start development server |
| `npm run build`     | Build for production     |
| `npm run start`     | Start production server  |
| `npm run lint`      | Run ESLint               |
| `npm run db:push`   | Push Drizzle schema      |
| `npm run db:studio` | Open Drizzle Studio      |

---

## 🎯 Project Goals

* Reduce dependency on multiple tools for learning & practice
* Provide real-time AI guidance during video calls
* Deliver automated summaries and intelligent recall
* Enhance communication skills and professional readiness

---

## 🧩 Future Enhancements

* Real-time speech-to-text integration
* Advanced AI performance analytics
* Multi-language AI agents
* Mobile app support
* Team & collaboration features

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome!
Feel free to open issues or submit pull requests.

---

## 📌 Status

🚧 **Currently under active development**
Building in public — progress updates coming regularly.

---

## 🧑‍💻 Author

**Irfan Shazid**
Web Developer | AI Enthusiast
Building the future of intelligent communication.

---

## ⭐ Support
