# NOIRE FASHION

A fashion e-commerce website built with plain HTML, CSS, and JavaScript, styled with Tailwind CSS. Recreates a full storefront experience across multiple pages, from browsing to login/signup.

**Live site:** https://noire-fashion1.netlify.app/

## Pages

- **Home** — hero section, brand stats, featured product cards, editorial story section, runway strip carousel, and newsletter signup
- **Shop** — full product grid with a live search bar and category filters (All, Outwear, Footwear, Apparel, Accessories)
- **Collection** — SS26 collection showcase
- **Login / Signup** — account creation with client-side validation and login form

## Features

- **Live search with debouncing** — product search filters results as you type, using a custom debounce function to avoid filtering on every keystroke
- **Category filtering** — instantly filter the product grid by category (Outwear, Footwear, Apparel, Accessories)
- **Product detail view** — clicking "View" on a product swaps the grid for a detail view of that item
- **Dark / light mode toggle** — full theme switching across every page
- **Mobile responsive navigation** — animated slide-out menu for smaller screens
- **Scroll animations** — powered by the AOS (Animate on Scroll) library
- **Form validation** — signup form validates email format, password strength (8+ characters with upper, lower, number, and symbol), and matching passwords, with inline error messages
- **User accounts via localStorage** — signup data is stored in the browser's localStorage, checked against existing users to prevent duplicate emails
- **Auto-scrolling marquee** — animated brand messaging strip

## Tech Stack

- **HTML5** — page structure across Home, Shop, Collection, and Login pages
- **CSS3 / Tailwind CSS** — styling, responsive layout, and dark mode
- **JavaScript** — DOM manipulation, product rendering, search/filter logic, form validation, and localStorage-based auth
- **AOS (Animate on Scroll)** — scroll-triggered animations
- **Font Awesome** — icons

## Project Structure

```
├── index.html          # Home page
├── index.js
├── shop.html            # Shop page with search and filters
├── shop.js               # Product data, search, filtering, product rendering
├── collection.html       # Collection page
├── collection.js
├── login.html            # Login page
├── login.js
├── login-copy.html       # Signup page
├── login-copy.js          # Signup validation and localStorage logic
├── styles.css
├── src/                   # assets (images, fonts, etc.)
```

## What This Project Practices

- Building a multi-page static site without a framework
- Implementing debounced search for performance
- Dynamic DOM rendering from a JavaScript data array (product catalog)
- Client-side form validation with regex patterns
- Using localStorage as a lightweight substitute for a backend during practice
- Responsive design and dark mode theming with Tailwind CSS
- Scroll-based animation integration with a third-party library

## Status

Deployed and live on Netlify. Built as a front-end practice project focused on interactivity (search, filtering, theming) without a backend or database.
