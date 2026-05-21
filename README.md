<div align="center">

# ✧ M A I S O N &nbsp; É C L A T ✧
*Timeless Luxury. Uncompromising Architecture.*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](#)

> *"True elegance is not standing out, but being remembered."*

**[ ✦ Experience the Live Atelier Here ✦ ](https://maison-eclat-five.vercel.app/)**

</div>

<br>

**Maison Éclat** is a bespoke front-end e-commerce architecture designed to emulate the "Quiet Luxury" aesthetic of high-end Parisian fashion houses. 

Developed as the capstone evaluation for **Front-End Engineering 1 (FEE-1)** at Chitkara University, this project focuses heavily on responsive UI/UX, Asynchronous JavaScript, and persistent state management—crafted entirely with vanilla technologies, without the use of external frameworks.

---

### 🪡 The Technical Craftsmanship 

* 🏛️ **Asynchronous Data Pipeline:** Replaced hardcoded layouts with a dynamic, breathing catalog. Data is fetched seamlessly via `async/await` and the `fetch()` API from a localized JSON source.
* 🛍️ **Intelligent State Management:** Built a persistent shopping bag utilizing the Browser Object Model (BOM) `localStorage` API. The user's curated collection survives browser refreshes and tab closures.
* 📐 **Advanced Mathematics:** Utilized ES6+ Higher-Order Array functions (`.reduce()`, `.find()`) for instantaneous cart calculations and duplicate entry prevention.
* ⚡ **High-Performance Event Delegation:** Avoided memory leaks by utilizing a single master `document.addEventListener('click')` bubble handler to efficiently route complex DOM interactions.
* 🔐 **Client-Side Security:** Implemented strict, multi-case Regular Expressions (Regex) to enforce 8-character password complexity on all authentication portals.
* 📱 **Fluid Responsiveness:** Core layouts are designed for touch accessibility down to 350px screens, utilizing CSS Flexbox and asymmetrical Grid masonry.

---

### 🏛️ The Atelier's Blueprint (Architecture)

```text
📁 maison-eclat/
├── 📄 index.html              # The Grand Entrance
├── 📄 about.html              # Our Heritage & Brand Story
├── 📄 contact.html            # Client Services & Form Validation
├── 📄 men.html                # Men's Dynamic Catalog
├── 📄 women.html              # Women's Dynamic Catalog
├── 📄 accessories.html        # Accessories Dynamic Catalog
├── 📄 cart.html               # The Shopping Bag & Checkout
├── 📄 login.html              # Client Sign-In 
├── 📄 register.html           # Atelier Registration (Regex Validated)
│
├── 📁 css/                    # The Design System
│   ├── 📄 all-main.css        # Global variables & responsive breakpoints
│   └── 📄 *.css               # Page-specific couture
│
├── 📁 js/                     
│   └── 📄 main.js             # Core Engine (API Fetch, DOM rendering, State)
│
├── 📁 data/                   
│   └── 📄 products.json       # Simulated backend collection data
│
└── 📁 images/                 # High-Resolution Media Assets

```

---

## ⚙️ How to Run Locally
Because this project utilizes the modern JavaScript `fetch()` API to load the product catalog asynchronously, it cannot be opened directly via the `file://` protocol due to browser CORS security policies.

To run the project:

* Clone this repository to your local machine.

* Open the project folder in Visual Studio Code.

* Install the Live Server extension by Ritwick Dey.

* Right-click on `index.html` and select "Open with Live Server".
  
* The digital atelier will launch seamlessly at `http://127.0.0.1:5500`.

 ---

## 👥 The Engineering Team
This project was architected and developed collaboratively by:

* **Umesh Sharma** - UI/UX Lead, CSS Architecture, & Responsive Breakpoints

* **Soham Setia** - Technical Lead, Asynchronous Logic, & API Integration

* **Madhav Gupta** - Logic Lead, Cart State Management, & Security Validation
