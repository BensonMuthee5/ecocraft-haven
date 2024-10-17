// Global Variables
let cart = [];

// Sample Products Array (In a real-world app, this would come from a database or API)
const products = [
    { id: 1, name: 'Handmade Necklace', price: 29.99, category: 'Jewelry', img: 'images/nec1.jpg' },
    { id: 2, name: 'Eco-Friendly Bag', price: 19.99, category: 'Accessories', img: 'images/bag1.jfif' },
    { id: 3, name: 'Organic Cotton T-Shirt', price: 24.99, category: 'Clothing', img: 'images/tshirt1.jfif' },
    { id: 4, name: 'Bamboo Sunglasses', price: 39.99, category: 'Accessories', img: 'images/bam3.jfif' },
    { id: 5, name: 'Pottery', price: 59.99, category: 'Accessories', img: 'images/pot1.jpg' },
    { id: 6, name: 'Coasters', price: 19.99, category: 'Accessories', img: 'images/coasters.jpg' },
    { id: 7, name: 'Cloth napkins', price: 39.99, category: 'Accessories', img: 'images/napkins.jpg' },
    { id: 8, name: 'Candles', price: 39.99, category: 'Accessories', img: 'images/candles.webp' },
    { id: 9, name: 'Soap dispensers', price: 9.99, category: 'Accessories', img: 'images/soap.webp' },
    { id: 10, name: 'Tote bags', price: 39.99, category: 'Accessories', img: 'images/tote.webp' },
    { id: 11, name: 'Paper flowers', price: 39.99, category: 'Accessories', img: 'images/flower.avif' },
    { id: 12, name: 'Crochet', price: 39.99, category: 'Accessories', img: 'images/crochet.webp' },
];

// Product Listing - Render products dynamically on the page
function renderProducts(productList) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; // Clear the grid before re-rendering
    productList.forEach(product => {
        productGrid.innerHTML += `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Ksh ${product.price.toFixed(2)}</p>
                <button class="btn-secondary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(prod => prod.id === productId);
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartCount();
    alert(`${product.name} has been added to your cart!`);
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.querySelector('#cart-count');
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Filter products by category
function filterProducts(category) {
    if (category === 'All') {
        renderProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        renderProducts(filteredProducts);
    }
}

// View Cart Modal
function viewCart() {
    const cartModal = document.querySelector('#cart-modal');
    const cartItems = document.querySelector('.cart-items');
    cartItems.innerHTML = ''; // Clear the modal before re-rendering

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            cartItems.innerHTML += `
                <div class="cart-item">
                    <h4>${item.name} - $${item.price.toFixed(2)}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <button class="btn-secondary" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
        });

        const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        cartItems.innerHTML += `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
    }

    cartModal.style.display = 'block'; // Show modal
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    viewCart(); // Re-render the cart
}

// Close Cart Modal
function closeCart() {
    document.querySelector('#cart-modal').style.display = 'none';
}

// Initialize the product grid with all products
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartCount();

    // Event listener for filtering products by category
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            filterProducts(category);
        });
    });

    // Cart Modal Close Button
    const closeModalButton = document.querySelector('.close-modal');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeCart);
    }

    // Fading the hero section on scroll
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPos = window.scrollY;
            const windowHeight = window.innerHeight;

            const maxOpacity = 1; // Maximum opacity
            const fadeStart = 0;  // Start fading at this scroll position
            const fadeEnd = windowHeight; // End fading

            // Calculate opacity
            let opacity = maxOpacity - (scrollPos / windowHeight);
            if (opacity < 0) opacity = 0;

            heroSection.style.opacity = opacity;
        });
    }

    // Handle Form Submission
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            // Add form submission logic (e.g., using Formspree or AJAX)
        });
    }
});
// Show the button when the user scrolls down
window.addEventListener('scroll', function() {
    const scrollPos = window.scrollY;
    const returnToTopButton = document.querySelector('#return-to-top');

    if (scrollPos > 300) { // Show after 300px scroll
        returnToTopButton.classList.add('show');
    } else {
        returnToTopButton.classList.remove('show');
    }
});

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
// Fading the hero section on scroll
window.addEventListener('scroll', function() {
    const scrollPos = window.scrollY;
    const heroSection = document.querySelector('.hero'); // Target the hero section
    const windowHeight = window.innerHeight;

    // Adjust opacity based on scroll position
    const maxOpacity = 1; // Maximum opacity you want to maintain
    const fadeStart = 0; // Start fading at this scroll position (in pixels)
    const fadeEnd = windowHeight; // End fading at this scroll position (in pixels)

    // Calculate opacity
    let opacity;
    if (scrollPos < fadeStart) {
        opacity = maxOpacity;
    } else if (scrollPos >= fadeStart && scrollPos <= fadeEnd) {
        opacity = maxOpacity - ((scrollPos - fadeStart) / (fadeEnd - fadeStart)) * maxOpacity;
    } else {
        opacity = 0; // Fully transparent after the fade ends
    }
    
    heroSection.style.opacity = opacity;
});
// Show or hide the return to top button based on scroll position
window.addEventListener('scroll', function() {
    const returnToTopButton = document.getElementById('return-to-top');
    const scrollPos = window.scrollY;

    if (scrollPos > 200) { // Adjust the scroll position as needed
        returnToTopButton.style.display = 'block';
        returnToTopButton.style.backgroundColor = 'coral'; // Set background color to coral
    } else {
        returnToTopButton.style.display = 'none';
    }
});

// Set initial state of the return to top button on page load
document.addEventListener('DOMContentLoaded', function() {
    const returnToTopButton = document.getElementById('return-to-top');
    returnToTopButton.style.display = 'none'; // Hide button on page load
});

