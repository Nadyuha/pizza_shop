import { getData, submitOrder } from "./getData.js";
import { createModalDelivery } from "./modalDelivery.js";

export const createCart = (data, modalList, cartItems) => {

  modalList = document.querySelector('.modal-cart__list');
  const arrPrice = [];
  data.forEach(data => {
    const cartItem = cartItems.find((item) => Number(item.id) === data.id);
    if(!cartItem) {
      return;
    }
    arrPrice.push(cartItem.price)

    const productCart = document.createElement('li');
    productCart.classList.add('modal-cart__item');
    productCart.innerHTML = `
    <div class="modal-cart__item-left">

                <img class="modal-cart__img" src="${data.images[0]}" alt="${data.name.ru}">

                <div class="modal-cart__info">
    
                  <h3 class="modal-cart__title-item">${(data.name.ru)[0].toUpperCase() + (data.name.ru).slice(1)}</h3>
    
                  <div class="modal-cart__descr">
                    <span class="modal-cart__descr-price">${data.price[cartItem.size]} ₽</span>
                    <span>/</span>
                    <span class="modal-cart__descr-size">${(cartItem.size).slice(0,2)} см</span>
                  </div>
    
                </div>

              </div>
      

              <button class="modal-cart__btn-delete" id=${data.id} aria-label="Кнопка удаления товара из корзины">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4549 4.01401C11.3985 4.00992 11.3805 4.01242 11.3579 3.99904L11.3522 3.43064C11.2979 3.41032 11.2015 3.42189 11.1407 3.42189L8.70136 3.42086V4.01348L7.73452 4.01392L7.73349 3.00582C7.73333 2.72455 7.65345 2.33685 8.03552 2.29858L11.7298 2.30315C12.0624 2.30324 12.3344 2.23977 12.3353 2.69883L12.3345 4.01423L11.4549 4.01401Z" fill="#C1AB91"/>
                  <path d="M15.3507 16.174C15.2392 16.6674 14.9551 17.2592 14.3936 17.3414C14.2455 17.363 14.0776 17.3491 13.9275 17.3492L6.00015 17.3485C5.65702 17.3475 5.40171 17.3159 5.14284 17.0553C4.5339 16.4421 4.61993 15.4641 4.61956 14.6723L4.61746 6.06336C4.59609 6.03136 4.48624 6.05367 4.44859 6.05367L3.77281 6.05352C3.38871 6.05317 3.35065 6.03086 3.34968 5.60977C3.34937 5.46586 3.30965 5.12292 3.37262 5.00142L3.39212 4.96339C3.43021 4.89298 3.48177 4.85839 3.55674 4.8362L16.0585 4.83686C16.2029 4.83683 16.3554 4.82702 16.4991 4.83989C16.7356 4.86105 16.7032 5.09483 16.7041 5.24905L16.7068 5.78127C16.7066 6.08752 16.4049 6.05405 16.1876 6.0542L15.4515 6.05336C15.4305 6.06827 15.4378 6.29108 15.4377 6.32805L15.4364 15.1909C15.4362 15.5305 15.4155 15.8385 15.3507 16.174ZM12.5871 8.00598L12.5891 14.863L13.9216 14.8637L13.9259 8.00652L12.9954 8.00552C12.8661 8.00536 12.7147 7.98989 12.5871 8.00598ZM6.12246 8.00611L6.12071 14.8636L7.45806 14.8637L7.45331 8.00689L6.12246 8.00611ZM9.34309 8.00598L9.34699 14.6687C9.34709 14.7314 9.34087 14.8014 9.35162 14.8628L10.6999 14.8599L10.7015 8.01195C10.6744 7.99998 10.6332 8.00592 10.6035 8.00592L9.34309 8.00598Z" fill="#C1AB91"/>
                  </svg>								
              </button>
    `

    modalList.append(productCart)
  });

  const total = arrPrice.reduce((acc, item) => {
    return acc + item * 1;
  }, 0)

  const totalPrice = document.querySelector('.modal-cart__price');
  totalPrice.textContent = total + " " + "₽";

  const btnDelete = document.querySelectorAll('.modal-cart__btn-delete');
  btnDelete.forEach(btn => {
    btn.addEventListener('click', () => {
          const productId = btn.id;
          updateCartItem(productId);
    })
  })
}

const updateCartItem = async (productId) => {
  const modalList = document.querySelector('.modal-cart__list');
  const totalPrice = document.querySelector('.modal-cart__price');
  const cartBtn = document.querySelector('.modal-cart__button');

  modalList.textContent = "";

  let cartItems = JSON.parse(localStorage.getItem("cartItem") || "[]");
  const pos = cartItems.findIndex(item => item.id === productId);
  if (pos !== -1) {
    cartItems = [...cartItems.slice(0, pos), ...cartItems.slice(pos + 1)];
  }

  localStorage.setItem('cartItem', JSON.stringify(cartItems));

  const ids = cartItems.map(item => item.id);
  if (ids.length === 0) {
    modalList.textContent = "";
    const listItem = document.createElement('li');
    listItem.textContent = 'Корзина пуста';
    cartBtn.setAttribute('disabled', true);
    cartBtn.style.cursor = "not-allowed";

    totalPrice.textContent = "0" + " " + "₽";
    modalList.append(listItem);

    return;
  }

  let products;
  let productsArr = [];
  for (let i = 0; i < ids.length; i++) {
    products = await getData(`https://occipital-efficient-coral.glitch.me/api/products/${ids[i]}`);
    productsArr.push(products)
    localStorage.setItem('cartProductDetails', JSON.stringify(productsArr));
  }

  const product = JSON.parse(localStorage.getItem("cartProductDetails") || "[]");

  createCart(product, modalList, cartItems);
}

export const addToCart = (productId) => {
  const cartItems = JSON.parse(localStorage.getItem('cartItem') || "[]" );

  const inputs = document.querySelectorAll('.modal-pizza__checkbox');
  const priceItem = document.querySelector('.modal-pizza__price').textContent;
  const price = priceItem.slice(0,3);

  const inputArr = [];
  for( let i = 0; i < inputs.length; i++) {
    if(inputs[i].checked === true) {
      inputArr.push(inputs[i].value);
    }
    
  }

  cartItems.push({id: productId, size: inputArr[1], dough: inputArr[0], price: price})
  
  localStorage.setItem('cartItem',JSON.stringify(cartItems));
}

document.querySelector('.modal-cart__button').addEventListener('click', async(e) => {
  e.preventDefault();
  const cartItem = JSON.parse(localStorage.getItem("cartItem") || '[]');

  const products = cartItem.map(({id, size, dough}) => ({
      id,
      crust: dough,
      size: size,
  }))

  localStorage.setItem('cartOrder', JSON.stringify(products));

      const totalPrice = document.querySelector('.modal-cart__price').textContent;

      // totalPrice.textContent =  "0" + " "+ "₽";

      const modalBasket = document.querySelector('.modal-cart');
      modalBasket.style.display = 'none';
      createModalDelivery(products, totalPrice)
})
