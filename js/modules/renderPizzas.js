import { getData } from "./getData.js";

import { closeModal } from "./close-modal.js";

import { createCart, addToCart } from "./cart.js";

import { createModalCard } from "./modalCard.js";

export const headerCount = () => {
	const countProduct = document.querySelector('.header__cart-span');
	const cartItems = JSON.parse(localStorage.getItem('cartItem') || "[]" );
	countProduct.textContent = cartItems.length;
}

headerCount();

const createCard = (data) => {
  const card = document.createElement('article');
  card.classList.add('card');

  card.innerHTML = `
  <picture>
  <source srcset="${data.images[1]}" type ="image/webp"/>
  <img class="card__image" src="${data.images[0]}" alt="${data.name.ru}">
  </picture>
  
								
							<div class="card__content">
								<h3 class="card__title">${(data.name.ru)[0].toUpperCase() + (data.name.ru).slice(1)}</h3>

								<p class="card__info">
									<span class="card__price">${data.price['25cm']}&nbsp;₽</span>
									<span>/</span>
									<span >25&nbsp;см</span>
								</p>

								<button class="card__button" data-id=${data.id}>Выбрать</button>
							</div>
  `;

  card.addEventListener('click', () => {
		createModalCard(data);
		
    const modal = document.querySelector('.modal-pizza');
    closeModal(modal, '.modal__close');

		const btn = document.querySelector('.modal-pizza__add-cart');

		btn.addEventListener('click', ({target}) => {
			
			const productId = target.id;

			addToCart(productId);
			headerCount();

			modal.style.display = 'none';
		})

  })
  return card;

};

const modalList = document.querySelector('.modal-cart__list');

export const renderPizzas = async (toppings) => {
  const pizzas = await getData(`https://occipital-efficient-coral.glitch.me/api/products${
                                toppings ? `?toppings=${toppings}` : ''}`);
  const pizzaList = document.querySelector('.pizza__list');
  pizzaList.textContent = '';

  const items = pizzas.map((data) => {
    const item = document.createElement('li');
    item.classList.add('pizza__item');

    const card = createCard(data);
    item.append(card);
    return item;
  })

  pizzaList.append(...items);
};

const cart = document.querySelector('.header__cart');
const orderBtn = document.querySelector('.hero__order');

async function openBasket() {
	const modalBasket = document.querySelector('.modal-cart');
	modalBasket.style.display = 'flex';

	closeModal(modalBasket, '.modal-cart__close');
	
	const cartBtn = document.querySelector('.modal-cart__button');

	const cartItems = JSON.parse(localStorage.getItem('cartItem') || "[]" );
	
	const ids = cartItems.map(item => item.id);

	if(!ids.length) {
		modalList.textContent = "";
		const listItem = document.createElement('li');
		listItem.textContent = 'Корзина пуста';

		cartBtn.setAttribute('disabled', true);
		cartBtn.style.cursor = "not-allowed";
		modalList.append(listItem);

		return;
	} else {
		cartBtn.removeAttribute('disabled');
		cartBtn.style.cursor = "pointer";
	}
	let products;
	let productsArr = [];
	modalList.textContent = "";
	
	for(let i = 0; i < ids.length; i++) {
		products = await getData(`https://occipital-efficient-coral.glitch.me/api/products/${ids[i]}`);
		productsArr.push(products)
		localStorage.setItem('cartProductDetails', JSON.stringify(productsArr));
	}
	
	const product = JSON.parse(localStorage.getItem("cartProductDetails") || "[]");

	createCart(product, modalList, cartItems);

}

orderBtn.addEventListener('click', () => {
	openBasket();
})

cart.addEventListener('click', async () => {
	openBasket();
})
