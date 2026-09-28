# Cursus — Student Teacher Portal

A role-based student/teacher portal built with React. Students and teachers sign up, log in, and land on their own dashboard, with courses, grades, timetable, profile and settings all driven by real data created inside the app — nothing on the dashboard is hardcoded.

This is a **frontend-only** project. There is no backend or database; `localStorage` acts as the data layer.

---

## Features

### Authentication
- Sign up with name, role (student / teacher), ID, department, university email and password
- Duplicate email and duplicate ID checks at signup
- Password confirmation and input validation (name letters-only, ID digits-only, password minimum length)
- Login by email + password, with clear error feedback
- Persistent session — refresh the page and you stay logged in
- Logout clears the session only, never the registered users
- Protected routes — `/dashboard/*` redirects to `/login` when nobody is logged in

### Two role-based views
The same layout renders a different experience depending on who is logged in.

| | Student | Teacher |
|---|---|---|
| **Overview** | Personal stats and enrolled courses | Teaching stats and class overview |
| **Courses** | Enrolled courses with personal progress, plus a list of available courses to enroll in | Courses they created, with class-average progress; can create courses and update student progress |
| **Grades** | Own score and grade per course | Class average per course; can record progress, scores and grades |
| **Timetable** | Weekly schedule of enrolled courses | Weekly schedule of courses they teach |
| **Profile** | Personal and academic details | Faculty details |
| **Settings** | Notification preferences that persist per user | Notification preferences that persist per user |

### Course workflow
1. A teacher creates a course (name, section, credits, schedule).
2. A student sees it under **Available Courses** and enrolls.
3. The course now appears in the student's list and the teacher's student count updates.
4. The teacher picks the course and one of its enrolled students, then saves progress, score and grade.
5. Both dashboards update immediately — no manual refresh.

### UI
- Custom dark design system (see below)
- `react-toastify` notifications styled to the brand instead of native `alert()`
- Animated circular and linear progress indicators
- Animated page entrance

---

## Tech stack

- **React** + **Vite**
- **Tailwind CSS v4** (theme tokens defined in CSS with `@theme`)
- **React Router** for routing and nested dashboard routes
- **lucide-react** for icons
- **react-toastify** for notifications
- **localStorage** for persistence

---

## Getting started

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

### Trying it out
1. Sign up a **teacher** and create a course or two.
2. Log out, then sign up a **student**.
3. As the student, enroll in a course from the Courses page.
4. Log back in as the teacher and update that student's progress and grade.
5. Log in as the student again to see the results.

---

## Data model

Everything lives in three `localStorage` keys.

**`Users`** — array of every registered account
```js
{
  name, id, department, email, password, role,   // role: "student" | "teacher"
  preferences: { ... }                            // per-user notification toggles
}
```

**`currentUser`** — the single logged-in user (removed on logout)

**`courses`** — array of courses
```js
{
  id,                // generated with Date.now()
  teacherId,         // the teacher who created it
  name, section, credits, schedule, status,
  enrolledStudents: [
    { studentId, progress, score, grade }   // one entry per enrolled student
  ]
}
```

Enrolled students are nested inside each course, so the teacher's student list for a course and the student's own progress both come from the same object.

---

## Project structure

```
src/
├── Backend/             # localStorage data layer
│   ├── users.js         # registered users, duplicate checks, current session
│   └── courses.js       # create, enroll, progress and grade updates, filtered getters
├── components/          # reusable UI (forms, cards, progress bars, sidebar, protected route)
├── pages/
│   ├── Signup.jsx
│   ├── Login.jsx
│   ├── Dashboardlayout.jsx      # sidebar + <Outlet />
│   └── DashboardPages/          # Overview, Courses, Grades, Timetable, Profile, Settings
├── App.jsx              # routes
└── index.css            # Tailwind import and theme tokens
```

---

## Design system

| Token | Hex | Use |
|---|---|---|
| `bg` | `#0d1117` | page background |
| `panel` | `#141b24` | cards, forms |
| `panel2` | `#10161f` | sunken sections, inputs |
| `border` | `#232c38` | all borders |
| `text` | `#e9edf2` | primary text |
| `dim` | `#8b97a7` | secondary text |
| `accent` | `#6ee7b7` | mint highlight |
| `accent2` | `#7aa2f7` | blue highlight |
| `danger` | `#f28b82` | errors |
| `warn` | `#f2b555` | warnings |

Fonts: **Space Grotesk** for headings and numbers, **Inter** for body text.

---

## Known limitations

- **No backend.** Data exists only in the browser it was created in and disappears if site data is cleared. Different browsers or devices don't share accounts.
- **Passwords are stored in plain text** in `localStorage`. This is acceptable for a class project and would not be for a real application.
- Course and user IDs are compared as strings in places because form inputs always return strings.
- Attendance and assignment tracking are outside the current data model.

## Possible next steps

- Replace `localStorage` with a real backend (Node/Express + MongoDB) and hash passwords
- Real authentication with tokens
- Assignment and submission tracking
- Attendance records
- Editable profile

---

Built as a personal project while learning the MERN stack at Code Lab Bahawalpur.
