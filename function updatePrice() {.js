function updatePrice() {
    // Получаем все карточки товаров
    const cards = document.querySelectorAll('.card');

    let totalPrice = 0;

    // Проходимся по каждой карточке товара
    cards.forEach((card) => {
        const priceElement = card.querySelector('.card-price');
        const quantityElement = card.querySelector('input');
        
        // Получаем цену и количество товара
        const price = parseFloat(priceElement.innerHTML.replace('$', ''));
        const quantity = parseInt(quantityElement.value);

        // Считаем общую цену текущего товара
        const subtotal = price * quantity;
        totalPrice += subtotal;
    });

    // Обновляем отображение итоговой цены
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.innerHTML = Итоговая цена: $${totalPrice.toFixed(2)};
}

// Вызываем функцию updatePrice при загрузке страницы
window.onload = updatePrice;

// Обработчики событий для кнопок увеличения и уменьшения количества товаров
const minusButtons = document.querySelectorAll('#button-addon-minus');
const plusButtons = document.querySelectorAll('#button-addon-plus');

minusButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const input = button.nextElementSibling;
        const currentValue = parseInt(input.value);
        if (currentValue > 1) {
            input.value = currentValue - 1;
            updatePrice();
        }
    });
});

plusButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const input = button.previousElementSibling;
        const currentValue = parseInt(input.value);
        input.value = currentValue + 1;
        updatePrice();
    });
});