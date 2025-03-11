import { getData } from "./getData.js";
import { renderPizzas } from "./renderPizzas.js";

export const renderToppings = async () => {
    const {en:enToppings, ru:ruToppings} = await getData('https://probable-noisy-saver.glitch.me/api/toppings');
    const toppingsList = document.querySelector('.toppings__list');
    toppingsList.textContent = '';
  
    const items = enToppings.map((enName, i) => {
      // console.log(data);
      const item = document.createElement('li');
      item.classList.add('topping__item');
  
      item.innerHTML = `
      <input class="toppings__checkbox" id="${enName}" type="checkbox" value="${enName}" title="${ruToppings[0]}" name="${enName}">
                      <label class="toppings__label" for="${enName}">${ruToppings[i][0].toUpperCase() + (ruToppings[i]).slice(1)}</label>
      `;

      return item;
    });

    toppingsList.append(...items);

    const  itemReset = document.createElement('li');
    itemReset.classList.add('toppings__item');
    const  btnReset = document.createElement('button');
    btnReset.classList.add('toppings__reset');

    btnReset.textContent = 'Сбростить';
    btnReset.type = 'reset';

    itemReset.append(btnReset);


    const toppingsForm = document.querySelector('.toppings__form');

    toppingsForm.addEventListener('change', (e) => {
      const formData = new FormData(toppingsForm);
      const checkedToppings = [];

      // formData.entries().forEach(item => {
      // })

      for(const [, value] of formData.entries()) {
        checkedToppings.push(value);
      }
      
      renderPizzas(checkedToppings);

      if(checkedToppings.length) {
        toppingsList.append(itemReset);
      } else {
        itemReset.remove();
      }

    });

    btnReset.addEventListener('click', () => {
      itemReset.remove();
      toppingsForm.reset();
    })
    
  };

