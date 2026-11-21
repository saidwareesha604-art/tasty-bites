/* =================================
   TASTY BITES - COMPLETE JAVASCRIPT
================================= */

// All 23 food products
const products = [
    { name: "Malai Boti", quantity: "12 Pieces", price: 500, category: "Kebabs", image: "malai-boti.jpg", icon: "🍢" },
    { name: "Chicken Nuggets", quantity: "18 Pieces", price: 600, category: "Snacks", image: "chicken-nuggets.jpg", icon: "🍗" },
    { name: "Aloo Chicken Cutlets", quantity: "12 Pieces", price: 700, category: "Snacks", image: "aloo-chicken-cutlets.jpg", icon: "🥔" },
    { name: "Chicken Shami Kabab", quantity: "12 Pieces", price: 900, category: "Kebabs", image: "chicken-shami-kabab.jpg", icon: "🍢" },
    { name: "Beef Shami Kabab", quantity: "12 Pieces", price: 1100, category: "Kebabs", image: "beef-shami-kabab.jpg", icon: "🍢" },
    { name: "Chicken Kofta", quantity: "12 Pieces", price: 900, category: "Kebabs", image: "chicken-kofta.jpg", icon: "🍡" },
    { name: "Chicken Kafta Kabab", quantity: "12 Pieces", price: 1000, category: "Kebabs", image: "chicken-kafta-kabab.jpg", icon: "🍢" },
    { name: "Beef Kofta", quantity: "12 Pieces", price: 1000, category: "Kebabs", image: "beef-kofta.jpg", icon: "🍡" },
    { name: "Aloo Samosa", quantity: "12 Pieces", price: 300, category: "Snacks", image: "aloo-samosa.jpg", icon: "🥟" },
    { name: "Vegetable Samosa", quantity: "12 Pieces", price: 350, category: "Snacks", image: "vegetable-samosa.jpg", icon: "🥟" },
    { name: "Chicken Qeema Samosa", quantity: "12 Pieces", price: 500, category: "Snacks", image: "chicken-qeema-samosa.jpg", icon: "🥟" },
    { name: "Chicken Cheese Samosa", quantity: "12 Pieces", price: 800, category: "Snacks", image: "chicken-cheese-samosa.jpg", icon: "🥟" },
    { name: "Chicken Samosa", quantity: "12 Pieces", price: 600, category: "Snacks", image: "chicken-samosa.jpg", icon: "🥟" },
    { name: "Aloo Roll", quantity: "12 Pieces", price: 400, category: "Rolls", image: "aloo-roll.jpg", icon: "🌯" },
    { name: "Vegetable Roll", quantity: "12 Pieces", price: 400, category: "Rolls", image: "vegetable-roll.jpg", icon: "🌯" },
    { name: "Spring Roll", quantity: "12 Pieces", price: 500, category: "Rolls", image: "spring-roll.jpg", icon: "🌯" },
    { name: "Chicken Qeema Roll", quantity: "12 Pieces", price: 600, category: "Rolls", image: "chicken-qeema-roll.jpg", icon: "🌯" },
    { name: "Chicken Cheese Roll", quantity: "12 Pieces", price: 1000, category: "Rolls", image: "chicken-cheese-roll.jpg", icon: "🌯" },
    { name: "Lacha Parata", quantity: "12 Pieces", price: 800, category: "Paratha", image: "lacha-paratha.jpg", icon: "🫓" },
    { name: "Aaloo Parata", quantity: "12 Pieces", price: 850, category: "Paratha", image: "aloo-paratha.jpg", icon: "🫓" },
    { name: "Imli Chatni", quantity: "400g", price: 500, category: "Others", image: "imli-chatni.jpg", icon: "🥣" },
    { name: "Khobani Morabba", quantity: "400g", price: 1000, category: "Others", image: "khobani-morabba.jpg", icon: "🍯" },
    { name: "Frozen Bhallay", quantity: "12 Pieces", price: 400, category: "Others", image: "frozen-bhallay.jpg", icon: "🥣" }
];

const WHATSAPP_NUMBER = "923303070702";
const DELIVERY_CHARGES = 250;

let cart = [];
let selectedCategory = "All";

// HTML elements
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const searchInput = document.getElementById("search-input");
const emptyMessage = document.getElementById("empty-message");

// Display products
function showProducts() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(function(product) {
        const matchesSearch = product.name.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    productList.innerHTML = "";

    filteredProducts.forEach(function(product) {
        const originalIndex = products.indexOf(product);

        const card = document.createElement("article");
        card.className = "product-card";

        // Product image
        const art = document.createElement("div");
        art.className = "product-art";

        const image = document.createElement("img");
        image.src = "images/" + product.image;
        image.alt = product.name;
        image.loading = "lazy";

        image.onerror = function() {
            art.textContent = product.icon;
        };

        art.appendChild(image);

        // Product information
        const info = document.createElement("div");
        info.className = "product-info";

        const name = document.createElement("h3");
        name.textContent = product.name;

        const quantity = document.createElement("p");
        quantity.className = "product-quantity";
        quantity.textContent = product.quantity;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = "Rs. " + product.price.toLocaleString("en-PK");

        const button = document.createElement("button");
        button.className = "add-button";
        button.textContent = "Add to Cart";

        button.addEventListener("click", function() {
            addToCart(originalIndex);
        });

        info.appendChild(name);
        info.appendChild(quantity);
        info.appendChild(price);
        info.appendChild(button);

        card.appendChild(art);
        card.appendChild(info);

        productList.appendChild(card);
    });

    emptyMessage.hidden = filteredProducts.length !== 0;
}

// Add product to cart
function addToCart(index) {
    const product = products[index];

    const existingItem = cart.find(function(item) {
        return item.name === product.name;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCart();
}

// Update cart
function updateCart() {
    cartItems.innerHTML = "";

    let subtotal = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="cart-empty">Your cart is empty. Add some delicious food!</p>';
    }

    cart.forEach(function(item, index) {
        subtotal += item.price * item.quantity;
        totalItems += item.quantity;

        const row = document.createElement("div");
        row.className = "cart-row";

        const details = document.createElement("div");

        const name = document.createElement("strong");
        name.textContent = item.name;

        const price = document.createElement("small");
        price.textContent =
            "Rs. " + item.price.toLocaleString("en-PK") + " each";

        details.appendChild(name);
        details.appendChild(price);

        const itemTotal = document.createElement("strong");
        itemTotal.textContent =
            "Rs. " + (item.price * item.quantity).toLocaleString("en-PK");

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const decrease = document.createElement("button");
        decrease.textContent = "−";
        decrease.setAttribute("aria-label", "Decrease quantity");

        decrease.addEventListener("click", function() {
            changeQuantity(index, -1);
        });

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const increase = document.createElement("button");
        increase.textContent = "+";
        increase.setAttribute("aria-label", "Increase quantity");

        increase.addEventListener("click", function() {
            changeQuantity(index, 1);
        });

        controls.appendChild(decrease);
        controls.appendChild(quantity);
        controls.appendChild(increase);

        const remove = document.createElement("button");
        remove.className = "remove-button";
        remove.textContent = "Remove";

        remove.addEventListener("click", function() {
            removeItem(index);
        });

        row.appendChild(details);
        row.appendChild(itemTotal);
        row.appendChild(controls);
        row.appendChild(remove);

        cartItems.appendChild(row);
    });

    const delivery = cart.length > 0 ? DELIVERY_CHARGES : 0;
    const total = subtotal + delivery;

    document.getElementById("subtotal").textContent =
        subtotal.toLocaleString("en-PK");

    document.getElementById("delivery").textContent =
        delivery.toLocaleString("en-PK");

    document.getElementById("total").textContent =
        total.toLocaleString("en-PK");

    document.getElementById("cart-count").textContent = totalItems;
}

// Change item quantity
function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Search products
searchInput.addEventListener("input", showProducts);

// Category filters
document.querySelectorAll(".filter-button").forEach(function(button) {
    button.addEventListener("click", function() {
        document.querySelectorAll(".filter-button").forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        showProducts();
    });
});

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", function() {
    navigation.classList.toggle("open");
});

navigation.querySelectorAll("a").forEach(function(link) {
    link.addEventListener("click", function() {
        navigation.classList.remove("open");
    });
});

// WhatsApp order checkout
document.getElementById("checkout-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const messageElement = document.getElementById("form-message");
    messageElement.textContent = "";

    if (cart.length === 0) {
        messageElement.textContent =
            "Please add at least one food item to your cart first.";

        document.getElementById("cart").scrollIntoView();
        return;
    }

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const city = document.getElementById("customer-city").value.trim();
    const address = document.getElementById("customer-address").value.trim();
    const notes = document.getElementById("order-notes").value.trim();

    if (!name || !phone || !city || !address) {
        messageElement.textContent =
            "Please fill in all required details.";
        return;
    }

    let subtotal = 0;
    let orderDetails = "";

    cart.forEach(function(item, index) {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        orderDetails +=
            (index + 1) + ". " + item.name +
            "\n   Quantity: " + item.quantity +
            "\n   Price: Rs. " + itemTotal.toLocaleString("en-PK") +
            "\n";
    });

    const delivery = DELIVERY_CHARGES;
    const total = subtotal + delivery;

    const message =
        "Hello Tasty Bites! I would like to place an order.\n\n" +
        "CUSTOMER DETAILS\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "City: " + city + "\n" +
        "Address: " + address + "\n\n" +
        "ORDER DETAILS\n" +
        orderDetails + "\n" +
        "Subtotal: Rs. " + subtotal.toLocaleString("en-PK") + "\n" +
        "Delivery: Rs. " + delivery + "\n" +
        "TOTAL: Rs. " + total.toLocaleString("en-PK") + "\n\n" +
        "Payment: Cash on Delivery\n" +
        "Additional Instructions: " + (notes || "None") + "\n\n" +
        "Please confirm my order. Thank you!";

    const whatsappURL =
        "https://wa.me/" + WHATSAPP_NUMBER +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
});

// Start website
showProducts();
updateCart();