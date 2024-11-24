const toppingsButton = document.querySelector('.toppings__button');
const toppingsList = document.querySelector('.toppings__list');

toppingsButton.addEventListener('click', () => {
  if(!toppingsList.classList.contains('toppings__list_show')) {
    toppingsList.classList.add('toppings__list_show');
    toppingsButton.classList.add('toppings__button_active');
    toppingsList.style.maxHeight = toppingsList.scrollHeight + 'px';
    toppingsButton.style.marginBottom = 16 + 'px';
  } else {
    toppingsButton.classList.remove('toppings__button_active');
    toppingsList.style.maxHeight = null;
    

    setTimeout(() => {
      toppingsList.classList.remove('toppings__list_show');
      toppingsButton.style.marginBottom = 0 + 'px';
    }, 300)
  }
});
