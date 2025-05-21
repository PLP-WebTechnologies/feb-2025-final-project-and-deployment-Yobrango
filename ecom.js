// ecom.js

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    // Example products
    const products = [
        { id: 1, name: "Summer Dress", price: "$49.99", image: "https://source.unsplash.com/featured/?dress " },
        { id: 2, name: "Casual Shoes", price: "$59.99", image: "https://source.unsplash.com/featured/?shoes " },
        { id: 3, name: "Sunglasses", price: "$29.99", image: "https://source.unsplash.com/featured/?sunglasses " },
        { id: 4, name: "Watch", price: "$89.99", image: "https://source.unsplash.com/featured/?watch " }
    ];

    featuredContainer.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-img" style="background-image: url('${product.image}');"></div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id}, '${product.name}', ${parseFloat(product.price.replace('$', ''))})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}