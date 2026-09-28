# Cursus

A role-based student and teacher portal built with React. Teachers create courses, grade students and update their progress. Students see those changes reflected in their own dashboard.

Live: https://cursusportal.netlify.app

## What it does

There are two roles, chosen at signup.

A teacher can create courses, and grade each enrolled student with a score and a letter grade. They can also set per-student progress. The teacher dashboard shows total students, classes taught, pending grading, and a grading completion ring.

A student sees their enrolled courses, scores, grades and progress. Their overview shows average progress and average score across courses.

Both roles get a timetable, a profile page and a settings page. The timetable is built from each course's schedule string (for example `Mon/Wed 9:00`), so the grid rows and columns come from real course data. Nothing in it is hardcoded.

Teachers get an amber and blue theme. Students get teal and mint. The switch is a single `.theme-teacher` class on the dashboard wrapper that overrides the CSS variables.

## Stack

React, Vite, Tailwind CSS v4, react-router-dom, react-toastify and lucide-react.

Colors are defined as `--color-*` variables in a Tailwind `@theme` block, which is what makes the teacher theme override possible.

## Data layer

There is no server. Everything lives in `localStorage`, behind a small set of functions in `src/Backend`.

`users.js` handles registered users and the current session. `courses.js` handles courses and the `enrolledStudents` entries on each one. `auth.js` handles notification preferences.

A course looks like this:

```js
{
  id,
  name,
  section,
  credits,
  schedule,        // "Mon/Wed 9:00"
  teacherId,
  enrolledStudents: [{ studentId, score, grade, progress }]
}
```

`score` and `grade` stay `null` until a teacher grades the student.

## Responsive layout

The layout was built laptop-first. Mobile, `sm` and `md` were added afterwards using only Tailwind classes, with no logic changes. Grids that are horizontal on a laptop stack on small screens. The timetable and the grades table are wide, so they scroll horizontally on mobile instead.

## Known limitations

Because data is in `localStorage`, it is scoped to one browser on one device. A teacher grading a student on one machine will not show up for that student on another. To see the teacher and student flow, use two browser profiles, or a normal window plus an incognito one.

Passwords are stored in plain text in `localStorage`. This is fine for a learning project and not fine for anything real.

A few dashboard values are still static: GPA, credits completed, the Grade Trend semester labels, and some of the welcome line text.

On the teacher side, Classes Graded and Pending Submissions on the Grades page are calculated on first load and do not refresh after a grading action.

## Run it locally

```
npm install
npm run dev
```

The app runs on `http://localhost:5173`.

To build for deployment:

```
npm run build
```

The output goes to `dist`.
