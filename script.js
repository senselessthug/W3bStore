document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    const cartElement = document.getElementById('cart');

    // Функция для сохранения корзины в localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Функция для загрузки корзины из localStorage
    function loadCart() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            renderCart();
        }
    }

    // Функция для добавления товара в корзину
    function addToCart(productName, price) {
        cart.push({ name: productName, price });
        saveCart(); // Сохраняем корзину после добавления товара
        renderCart();
    }

    // Функция для отображения корзины
    function renderCart() {
        if (cart.length === 0) {
            cartElement.innerHTML = '<p>Кошик порожній</p>';
        } else {
            let cartContent = '<ul>';
            let total = 0;
            cart.forEach(item => {
                cartContent += `<li>${item.name} - ${item.price} грн</li>`; // Исправлено
                total += item.price;
            });
            cartContent += `<li><strong>Разом: ${total} грн</strong></li>`; // Исправлено
            cartContent += '</ul>';
            cartElement.innerHTML = cartContent;
        }
    }

    // Функция для оформления заказа
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
            orderDetails += `<li>${item.name} - ${item.price} грн</li>`; // Исправлено
            total += item.price;
        });
        orderDetails += `<li><strong>Разом: ${total} грн</strong></li>`; // Исправлено
        orderDetails += '</ul>';

        document.getElementById('orderDetails').innerHTML = orderDetails;

        // Очищаем корзину и localStorage после заказа
        cart = [];
        saveCart(); // Сохраняем пустую корзину в localStorage
        renderCart();
        document.getElementById('orderForm').reset();
    }

    // Загружаем корзину при загрузке страницы
    loadCart();

    // Делаем функцию addToCart доступной глобально
    window.addToCart = addToCart;
    window.submitOrder = submitOrder;
});
