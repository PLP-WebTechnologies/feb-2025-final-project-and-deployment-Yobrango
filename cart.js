// cart.js

document.addEventListener('DOMContentLoaded', () => {
    const cartTableBody = document.querySelector('#cart-table tbody');
    const checkoutBtn = document.getElementById('checkout-btn');
    const emptyCartMsg = document.getElementById('empty-cart-msg');

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (cart.length === 0) {
            emptyCartMsg.style.display = 'block';
            if (cartTableBody) cartTableBody.innerHTML = '';
            if (checkoutBtn) checkoutBtn.disabled = true;
            return;
        }

        emptyCartMsg.style.display = 'none';
        if (checkoutBtn) checkoutBtn.disabled = false;

        cartTableBody.innerHTML = cart.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                </td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
            </tr>
        `).join('');
    }

    window.updateQuantity = (id, quantity) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = parseInt(quantity);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateCartCount();
        }
    };

    window.removeFromCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    };

    renderCart();
});