import { closeModal } from "./close-modal.js";

export const createModalCard = (data) => {
  const modal = document.querySelector('.modal-pizza');
  modal.style.display = 'flex';
  modal.innerHTML = `
  <div class="modal__main modal-pizza__main">
      <img class="modal-pizza__img" src="${data.images[0]}" alt="${data.name.ru}">

      <h2 class="modal-pizza__title">${(data.name.ru)[0].toUpperCase() + (data.name.ru).slice(1)}</h2>

      <p class="modal-pizza__toppings">${data.toppings.ru[0].toUpperCase() + (data.toppings.ru).slice(1)}</p>
      
      <p class="modal-pizza__info">
        <span class="modal-pizza__price">${data.price['25cm']}&nbsp;₽</span>
        <span>/</span>
        <span class="modal-pizza__size">25 см</span>
        <form class="modal-pizza__form">
          <fieldset class="modal-pizza__fieldset modal-pizza__fieldset-dough">

            <label class="modal-pizza__label modal-pizza__label-thick" for="thick">
              <input class="modal-pizza__checkbox" id="thick" type="radio" name="crust" value="thick">
              <span class="modal-pizza__checkbox-custom modal-pizza__checkbox-custom-thick">Пышное тесто</span>
            </label>

            
            <label class="modal-pizza__label modal-pizza__label-thin" for="thin">
              <input class="modal-pizza__checkbox" id="thin" type="radio" name="crust" value="thin" checked>
              <span class="modal-pizza__checkbox-custom modal-pizza__checkbox-custom-thin">Тонкое тесто</span>
            </label>

          </fieldset>

          <fieldset class="modal-pizza__fieldset">
            
            <label class="modal-pizza__label modal-pizza__label-25" for="25cm">
              <input class="modal-pizza__checkbox" id="25cm" type="radio" name="size" value="25cm" checked>
              <span class="modal-pizza__checkbox-custom modal-pizza__checkbox-custom-25">25 см</span>
            </label>

            <label class="modal-pizza__label modal-pizza__label-30" for="30cm">
              <input class="modal-pizza__checkbox" id="30cm" type="radio" name="size" value="30cm">
              <span class="modal-pizza__checkbox-custom modal-pizza__checkbox-custom-30">30 см</span>
            </label>

            <label class="modal-pizza__label modal-pizza__label-35" for="35cm">
              <input class="modal-pizza__checkbox" id="35cm" type="radio" name="size" value="35cm">
              <span class="modal-pizza__checkbox-custom modal-pizza__checkbox-custom-35">35 см</span>
            </label>

          </fieldset>

          <button type="button" class="modal-pizza__add-cart" id=${data.id}>В корзину</button>
        </form>
        <button type="button" class="modal__close" aria-label="Кнопка закрытия модального окна">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="14.8333" y="4" width="0.851136" height="15.3204" transform="rotate(45 14.8333 4)" fill="#C1AB91"/>
            <rect x="4" y="4.60181" width="0.851136" height="15.3204" transform="rotate(-45 4 4.60181)" fill="#C1AB91"/>
            </svg>							
        </button>
      </p>
    </div>
  `

  closeModal(modal, '.modal__close');

  const inputs = document.querySelectorAll('.modal-pizza__checkbox');
  const price = document.querySelector('.modal-pizza__price');
  const size = document.querySelector('.modal-pizza__size');

  inputs.forEach(input => {
    input.addEventListener('click', () => {
      if(input.value === '25cm') {
        price.textContent = data.price['25cm'] + " " + "₽";
        size.textContent = '25' + " " + "cм";
      } else if(input.value === '30cm') {
        price.textContent = data.price['30cm'] + " " + "₽";
        size.textContent = '30' + " " + "cм";
      } else if (input.value === '35cm') {
        price.textContent = data.price['35cm'] + " " + "₽";
        size.textContent = '35' + " " + "cм";
      }
    })
  })
}