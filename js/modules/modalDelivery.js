import { closeModal } from "./close-modal.js";
import { createCart } from "./cart.js";

export const createModalDelivery = (data,totalPrice) => {
  const modal = document.querySelector('.modal-delivery');
  const total = document.querySelector('.modal-delivery__price');
  const btnBack = document.querySelector('.modal-delivery__button-back');
  const btnOrder = document.getElementById('orderBtn')
  const form = document.querySelector('.modal-delivery__form');
  const inputs = document.querySelectorAll('.modal-delivery__input');

  inputs.forEach(input => {
    
    btnOrder.setAttribute('disabled', true);
    btnOrder.style.cursor = "not-allowed";

    input.addEventListener('change', () => {
          if(input.value !== '') {
            btnOrder.removeAttribute('disabled');
            btnOrder.style.cursor = "pointer";
          }
        })
  })

  modal.style.display = 'flex';
  total.textContent = totalPrice;

  const product = JSON.parse(localStorage.getItem("cartProductDetails") || "[]");
  const cartItems = JSON.parse(localStorage.getItem('cartItem') || "[]" );
  const modalList = document.querySelector('.modal-cart__list');

  
    btnBack.addEventListener('click', (e) => {
      e.preventDefault();

      modal.style.display = 'none';
      modalList.textContent = '';

      const modalBasket = document.querySelector('.modal-cart');
      modalBasket.style.display = 'flex';

      createCart(product, modalList, cartItems);
      closeModal(modalBasket, '.modal-cart__close');
      
    })

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      modal.style.display = 'none';

      const countProduct = document.querySelector('.header__cart-span');
			countProduct.textContent = '0';

      const modalCartPrice = document.querySelector('.modal-cart__price');
      modalCartPrice.textContent = "0" + " " + "₽";

      localStorage.removeItem('cartItem');
      localStorage.removeItem('cartProductDetails');
      localStorage.removeItem('cartOrder');

      const cashId = form.cash.value;
      const name = form.name.value
      const tel = form.tel.value;
      const adress = form.adress.value;
      const orderId = Date.now();

      const orderMessageElement = document.createElement('div');
      orderMessageElement.classList.add('order-message');

      const orderMessageText = document.createElement('p');
      orderMessageText.textContent = '';
      orderMessageText.textContent = `Ваш заказ оформлен, номер заказа ${orderId}.`
      orderMessageText.classList.add('order-message__text');

      const orderMessageCloseButton = document.createElement('button');
      orderMessageCloseButton.classList.add('order-message__close-button');
      orderMessageCloseButton.textContent = "Закрыть";

      orderMessageElement.append(orderMessageText, orderMessageCloseButton);

      orderMessageCloseButton.addEventListener('click', () => {
        orderMessageElement.remove();
      })

      document.body.append(orderMessageElement)

      let formObj = {};

      if (name !== '' && tel !== '' && adress !== '') {
        formObj = {
          id: orderId,
          name: name,
          phone: tel,
          address: adress,
          paymentMethod: cashId,
          pizzas: data
        }
      }

      try {
        const response = await fetch(`https://lying-flannel-cabbage.glitch.me/api/orders`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formObj),
        });

        if (!response.ok) {
          throw new Error(response.status);
        };

        return await response.json();

      } catch (error) {
        console.error(`Ошибка оформления заказа: ${error}`)
      }

      modalList.textContent = '';
      createCart(product, modalList, cartItems);
      total.textContent = '';
      total.textContent = "0" + " " + "₽";
    })

  closeModal(modal, '.modal__close');
}