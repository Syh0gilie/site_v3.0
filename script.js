const products = [
    { name: "Камень", price: 200000, image: "Stone_1.jpg" },
    { name: "Щетка Hardline", price: 14990, image: "hardline_r1000x1000.jpg" },
    { name: "Щетка BalancePlus", price: 14990, image: "Fiberglass.png" },
    { name: "Ботинки balancePlus 403", price: 16990, image: "404-side-by-side4-500x375-1.png" },
    { name: "Ботинки balancePlus Deluxe", price: 49990, image: "BP_Delux.png" },
    { name: "Секундомер BalancePlus", price: 5000, image: "dual-split-stopwatch.png" }
];

const productsContainer = document.getElementById('products-container'); 
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');


function createProductCard(product) {
    const productCol = document.createElement('div');
    productCol.classList.add('col');

    productCol.innerHTML = `
        <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Цена: ${product.price} руб.</p>
                <div class="d-flex">
                    <input type="number" class="form-control form-control-sm me-2 quantity-input" value="1" min="1" data-price="${product.price}" data-name="${product.name}">
                    <button class="btn btn-primary btn-sm add-to-cart" data-price="${product.price}" data-name="${product.name}">В корзину</button>
                </div>
            </div>
        </div>
    `;
    return productCol;
}

products.forEach(product => {
    productsContainer.appendChild(createProductCard(product));
});


productsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        addToCart(event);
    }
});

function addToCart(event) {
    const button = event.target;
    const quantityInput = button.previousElementSibling;
    const quantity = parseInt(quantityInput.value, 10);
    const price = parseInt(button.dataset.price, 10);
    const name = button.dataset.name;

    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <span> ${name} x ${quantity} = ${price * Math.abs(quantity)} руб.</span>
        <button class="remove-item btn btn-danger btn-sm">Удалить</button>
    `;
    cartItems.appendChild(cartItem);
    updateCartTotal();
}

function removeFromCart(event) {
    if (event.target.classList.contains('remove-item')) {
        const cartItem = event.target.parentNode;
        cartItems.removeChild(cartItem);
        updateCartTotal();
    }
}

function updateCartTotal() {
    let total = 0;
    cartItems.querySelectorAll('.cart-item').forEach(item => {
        const price = parseInt(item.querySelector('span').textContent.match(/\d+/g).pop(), 10);
        total += price;
    });
    cartTotal.textContent = total;
}

cartItems.addEventListener('click', removeFromCart);


