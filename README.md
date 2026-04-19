# 🇮🇳 Yojana Setu — Government Scheme Finder

> **"Find Government Schemes Made For You"**  
> A modern full-stack web application that matches citizens with relevant Indian government welfare schemes based on their eligibility profile.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 Smart Filtering | Filter 15+ schemes by age, income, gender, occupation, category & state |
| 📋 Scheme Cards | Clean cards with emoji icons, benefits, ministry info & links |
| 🔖 Save Schemes | Bookmark favourites (persisted in `localStorage`) |
| 🔎 Search Bar | Debounced live search across scheme names & descriptions |
| 🗂️ Category Filter | Browse by Agriculture, Education, Health, Housing, and more |
| 📱 Responsive | Mobile-first design works on all screen sizes |
| ⚡ Fast | Vite + React SPA with skeleton loaders & smooth animations |
| 🏛️ Ashoka Wheel | Rotating Ashoka Chakra SVG logo & decorative elements |
| 🛡️ In-memory fallback | Works even without MongoDB — uses local dataset |

---

## 🧱 Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS (custom `navy` + `saffron` colour palette)
- React Router v6
- Axios
- Google Fonts: Playfair Display + DM Sans

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- CORS, dotenv

---

## 📁 Folder Structure

```
yojana-setu/
├── backend/
│   ├── data/
│   │   └── schemes.js          # 15 seed schemes
│   ├── middleware/
│   │   └── db.js               # MongoDB connect + auto-seed
│   ├── models/
│   │   └── Scheme.js           # Mongoose schema
│   ├── routes/
│   │   └── schemes.js          # GET /schemes, GET /schemes/:id, POST /schemes/filter
│   ├── server.js               # Express entry point
│   ├── .env                    # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Sticky nav with mobile menu
│   │   │   ├── Footer.jsx      # Footer with tricolor strip
│   │   │   ├── SchemeCard.jsx  # Reusable scheme card
│   │   │   ├── FilterForm.jsx  # Eligibility input form
│   │   │   ├── SearchBar.jsx   # Debounced search input
│   │   │   ├── Spinner.jsx     # Ashoka-wheel spinner + skeleton cards
│   │   │   └── ErrorMessage.jsx
│   │   ├── context/
│   │   │   └── FavouritesContext.jsx  # Global saved-schemes store
│   │   ├── data/
│   │   │   └── localSchemes.js        # Frontend fallback data
│   │   ├── hooks/
│   │   │   └── useSchemes.js          # Custom hooks for API calls
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Landing page with hero + featured schemes
│   │   │   ├── FindSchemes.jsx # Main filter + browse page
│   │   │   ├── SchemeDetails.jsx # Full scheme detail view
│   │   │   ├── Favourites.jsx  # Saved schemes page
│   │   │   ├── About.jsx       # About page
│   │   │   └── NotFound.jsx    # 404 page
│   │   ├── services/
│   │   │   └── api.js          # Axios instance + API helpers
│   │   ├── App.jsx             # Router + layout
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles + Tailwind
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── package.json                # Root scripts (with concurrently)
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9
- MongoDB (optional — app works without it using in-memory data)

---

### Option A — Run Frontend + Backend Together (Recommended)

```bash
# 1. Clone / extract the project
cd yojana-setu

# 2. Install root dev tools (concurrently)
npm install

# 3. Install all dependencies
npm run install:all

# 4. Start both servers simultaneously
npm run dev
```

- 🌐 Frontend → http://localhost:5173
- ⚙️  Backend  → http://localhost:5000

---

### Option B — Run Separately

**Backend**
```bash
cd backend
npm install
npm run dev        # nodemon watches for changes
```

**Frontend** (new terminal)
```bash
cd frontend
npm install
npm run dev
```

---

### MongoDB Setup (Optional)

The app ships with an **in-memory fallback** so it works without MongoDB.  
If you want full persistence:

1. Install MongoDB locally or use [MongoDB Atlas](https://cloud.mongodb.com)
2. Edit `backend/.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/yojana-setu
   # or your Atlas connection string
   ```
3. The database is **auto-seeded** on first run — no manual import needed.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/schemes` | All schemes (supports `?search=keyword`) |
| `GET` | `/api/schemes/:id` | Single scheme by ID |
| `POST` | `/api/schemes/filter` | Filter by user profile |
| `GET` | `/api/health` | Health check |

### POST `/api/schemes/filter` — Request Body

```json
{
  "age": 24,
  "gender": "Female",
  "annualIncome": 150000,
  "state": "Uttar Pradesh",
  "occupation": "Student",
  "category": "OBC"
}
```

---

## 🎨 Color Palette

| Name | Hex | Usage |
|---|---|---|
| Navy | `#0f1780` | Primary brand, headings |
| Saffron | `#ff7800` | Accents, CTAs |
| White | `#ffffff` | Backgrounds |
| Slate | `#64748b` | Body text |

---

## 📋 Government Schemes Included

1. PM Kisan Samman Nidhi — 🌾 Agriculture
2. PM Ujjwala Yojana — 🔥 Women Welfare
3. National Scholarship Portal — 📚 Education
4. Ayushman Bharat PM-JAY — 🏥 Health
5. PM Awas Yojana (Urban) — 🏠 Housing
6. Beti Bachao Beti Padhao — 👧 Women Welfare
7. PM Mudra Yojana — 💼 Entrepreneurship
8. Post Matric Scholarship (SC) — 🎓 Education
9. Startup India Seed Fund — 🚀 Entrepreneurship
10. Sukanya Samriddhi Yojana — 💰 Women Welfare
11. PM Kaushal Vikas Yojana — ⚙️ Skill Development
12. National Old Age Pension — 👴 Social Security
13. Atal Pension Yojana — 🛡️ Social Security
14. Dr. Ambedkar Scholarship (OBC) — 📖 Education
15. PM Jan Dhan Yojana — 🏦 Financial Inclusion

---

## ⚠️ Disclaimer

Yojana Setu is an educational / demo project. All scheme data is for
demonstration purposes only. For official information, visit the respective
government portals.

---

*Built with ❤️ for every Indian*
