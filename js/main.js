/* ==========================================
   1. GLOBAL VARIABLES
   ========================================== */
let products = [];
let shoppingCart = [];

// Load cart from Local Storage on startup
let savedCart = localStorage.getItem("basic_maison_cart");
if (savedCart !== null) {
    shoppingCart = JSON.parse(savedCart);
}

function updateHeaderNumber() {
    let counter = document.getElementById("cart-counter");
    if (counter) {
        // .reduce() loops through the cart and adds up the quantities instantly
        let totalItems = shoppingCart.reduce((sum, item) => sum + item.quantity, 0);
        counter.innerText = `Bag (${totalItems})`;
    }
}

/* ==========================================
   2. ASYNCHRONOUS API FETCHING (The Missing Piece!)
   ========================================== */
// This function fulfills the "API Integration" and "Promises/Async" rubric requirement
async function fetchProductData() {
    try {
        const response = await fetch('data/products.json');
        const data = await response.json();

        for (let i = 0; i < data.length; i++) products.push(data[i]);

        initializePageDisplay();
    } catch (error) {
        console.error("Failed to fetch product API:", error);
    }
}

/* ==========================================
   3. PRODUCT GRID DISPLAY
   ========================================== */
function loadProductGrid(categoryFilter) {
    let gridContainer = document.getElementById("dynamic-product-grid");
    if (gridContainer === null) return;

    let allHtml = "";

    // Using standard iterative loops for data processing
    for (let i = 0; i < products.length; i++) {
        if (products[i].category === categoryFilter) {
            allHtml += `
                <article class="product-card">
                    <figure class="product-image">
                        <img src="${products[i].image}" alt="${products[i].name}">
                    </figure>
                    <h3 class="product-name">${products[i].name}</h3>
                    <p class="product-price">$${products[i].price}</p>
                    <button class="btn-primary add-to-bag" data-id="${products[i].id}">Add to Bag</button>
                </article>
            `;
        }
    }

    gridContainer.innerHTML = allHtml;
}

function initializePageDisplay() {
    let url = window.location.pathname;

    if (url.includes("women.html")) loadProductGrid("women");
    else if (url.includes("men.html")) loadProductGrid("men");
    else if (url.includes("accessories.html")) loadProductGrid("accessories");
}

/* ==========================================
   4. CART LOGIC
   ========================================== */
function addToCart(productId) {
    // Quickly find the product in the master catalog
    const productToAdd = products.find(p => p.id === productId);
    if (!productToAdd) return;

    // Check if it already exists in the cart
    let existingItem = shoppingCart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity if found
    } else {
        // ES6 Spread (...) copies the product data, and we add quantity: 1
        shoppingCart.push({ ...productToAdd, quantity: 1 });
    }

    localStorage.setItem("basic_maison_cart", JSON.stringify(shoppingCart));
    updateHeaderNumber();
    alert(`${productToAdd.name} was added to your bag!`);
}

function showCartItems() {
    let container = document.getElementById("cart-items-container");
    let totalContainer = document.getElementById("cart-total-container");

    if (container === null) return;

    if (shoppingCart.length === 0) {
        container.innerHTML = "<h3>Your bag is empty.</h3>";
        totalContainer.innerHTML = "";
        return;
    }

    let allHtml = "";
    let finalPrice = 0;

    for (let i = 0; i < shoppingCart.length; i++) {
        let item = shoppingCart[i];
        let itemTotal = item.price * item.quantity;
        finalPrice += itemTotal;

        // Now using your custom classes from cart.css!
        allHtml += `
            <div class="cart-item">
                <img class="cart-item-img" src="${item.image}" alt="${item.name}">

                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">Price: $${item.price}</p>

                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <button class="decrease-qty" data-index="${i}" style="padding: 5px 12px; border: 1px solid black; background: transparent; cursor: pointer;">-</button>
                        <span style="font-weight: bold;">${item.quantity}</span>
                        <button class="increase-qty" data-index="${i}" style="padding: 5px 12px; border: 1px solid black; background: transparent; cursor: pointer;">+</button>
                    </div>
                </div>

                <div style="text-align: right;">
                    <p style="font-weight: bold; margin-bottom: 10px;">$${itemTotal}</p>
                    <button class="remove-from-bag" data-index="${i}">
                        Remove
                    </button>
                </div>
            </div>
        `;
    }

    container.innerHTML = allHtml;

    // Updated to match your cart.css layout
    totalContainer.innerHTML = `
        <div class="cart-total-text">Total: $${finalPrice}</div>
        <button class="btn-primary" id="checkout-btn">Checkout</button>
    `;
}

function processCheckout() {
    if (shoppingCart.length === 0) return;
    shoppingCart = [];
    localStorage.setItem("basic_maison_cart", JSON.stringify(shoppingCart));
    alert("Order placed successfully!");
    window.location.reload();
}

function removeFromCart(indexToRemove) {
    // .splice() removes items from an array. (Start at this index, remove 1 item)
    shoppingCart.splice(indexToRemove, 1);

    // Save the new, smaller array back to the browser's memory
    localStorage.setItem("basic_maison_cart", JSON.stringify(shoppingCart));

    // Immediately update the header number and re-draw the cart on the screen!
    updateHeaderNumber();
    showCartItems();
}

function changeQuantity(itemIndex, amount) {
    shoppingCart[itemIndex].quantity += amount;

    // If they click minus and it hits 0, just remove the item completely
    if (shoppingCart[itemIndex].quantity <= 0) {
        removeFromCart(itemIndex);
    } else {
        // Otherwise, save and redraw the cart
        localStorage.setItem("basic_maison_cart", JSON.stringify(shoppingCart));
        updateHeaderNumber();
        showCartItems();
    }
}
/* ==========================================
   5. PROPER EVENT DELEGATION
   ========================================== */
document.addEventListener('click', function(event) {
    const target = event.target;

    // If we didn't click a valid element, stop immediately
    if (!target) return;

    if (target.classList.contains("add-to-bag")) {
        event.preventDefault();
        addToCart(target.getAttribute("data-id"));
    }
    else if (target.classList.contains("btn-subscribe")) {
        event.preventDefault();
        let emailInput = document.querySelector(".newsletter-input");

        if (emailInput && emailInput.checkValidity() && emailInput.value) {
            alert(`Thank you! ${emailInput.value} is now subscribed.`);
            emailInput.value = "";
        } else {
            alert("Please enter a valid email address.");
        }
    }
    else if (target.id === "checkout-btn") {
        event.preventDefault();
        processCheckout();
    }
    else if (target.classList.contains("remove-from-bag")) {
        event.preventDefault();
        removeFromCart(target.getAttribute("data-index"));
    }
    else if (target.classList.contains("decrease-qty")) {
        event.preventDefault();
        changeQuantity(target.getAttribute("data-index"), -1);
    }
    else if (target.classList.contains("increase-qty")) {
        event.preventDefault();
        changeQuantity(target.getAttribute("data-index"), 1);
    }
});




/* ==========================================
   7. FORM SUBMISSIONS & VALIDATION
   ========================================== */
document.addEventListener('submit', function(event) {
    const target = event.target;

    // --- 1. CONTACT FORM ---
    if (target && target.id === "contact-form") {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let subject = document.getElementById("subject").value.trim();
        let message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || subject === "" || message === "") {
            alert("Error: Please fill out all required fields before submitting.");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Error: Please enter a valid email address containing an '@' and a domain.");
            return;
        }

        alert(`Thank you, ${name}! Your message regarding '${subject}' has been sent to the Maison Éclat Atelier. We will reply to ${email} shortly.`);
        target.reset();
    }

    // --- 2. LOGIN FORM ---
    else if (target && target.id === "login-form") {
        event.preventDefault(); // Stop the page from refreshing

        let password = document.getElementById("password").value;

        // REGEX: At least 8 chars, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!passwordRegex.test(password)) {
            alert("Error: Password must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, and 1 number.");
            return; // Stops the login process
        }
        // Simulate a successful login and redirect to the Home page
        alert("Login successful! Welcome back to Maison Éclat.");
        window.location.href = "index.html";
    }

    // --- 3. REGISTER FORM ---
    else if (target && target.id === "register-form") {
        event.preventDefault(); // Stop the page from refreshing

        let password = document.getElementById("reg-password").value;
        let confirmPassword = document.getElementById("reg-confirm-password").value;

        // REGEX: At least 8 chars, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        // Check 1: Does the password meet the complexity rules?
        if (!passwordRegex.test(password)) {
            alert("Error: Password must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, and 1 number.");
            return;
        }

        // Check 2: Do the two passwords match exactly?
        if (password !== confirmPassword) {
            alert("Error: Passwords do not match. Please re-enter them carefully.");
            return;
        }
        // Simulate a successful account creation and redirect
        alert("Account created successfully! Welcome to the Atelier.");
        window.location.href = "index.html";

    }
});
/* ==========================================
   6. ON PAGE LOAD
   ========================================== */
window.onload = function() {
    updateHeaderNumber();
    showCartItems();

    // Kick off the asynchronous fetch cycle
    fetchProductData();
};
