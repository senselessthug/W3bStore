let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartElement = document.getElementById('cart');

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productName, price) {
    cart.push({ name: productName, price });
    saveCart(); // Save to localStorage whenever cart is updated
    renderCart();
}

// Render cart contents
function renderCart() {
    if (cart.length === 0) {
        cartElement.innerHTML = '<p>Кошик порожній</p>';
    } else {
        let cartContent = '<ul>';
        let total = 0;
        cart.forEach(item => {
            cartContent += `<li>${item.name} - ${item.price} грн</li>`;
            total += item.price;
        });
        cartContent += `<li><strong>Разом: ${total} грн</strong></li>`;
        cartContent += '</ul>';
        cartElement.innerHTML = cartContent;
    }
}

// Submit order and clear cart
function submitOrder(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        alert('Ваш кошик порожній!');
        return;
    }
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    let orderDetails = `<h3>Деталі замовлення</h3>`;
    orderDetails += `<p><strong>Ім'я:</strong> ${name}</p>`;
    orderDetails += `<p><strong>Email:</strong> ${email}</p>`;
    orderDetails += `<p><strong>Адреса доставки:</strong> ${address}</p>`;
    orderDetails += '<h4>Товари:</h4><ul>';
    
    let total = 0;
    cart.forEach(item => {
        orderDetails += `<li>${item.name} - ${item.price} грн</li>`;
        total += item.price;
    });
    orderDetails += `<li><strong>Разом: ${total} грн</strong></li>`;
    orderDetails += '</ul>';

    document.getElementById('orderDetails').innerHTML = orderDetails;

    // Clear cart after order is submitted
    cart = [];
    saveCart(); // Clear cart from localStorage
    renderCart();
    document.getElementById('orderForm').reset();
}

// Render cart on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
