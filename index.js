import { menuArray } from '/data.js';
const menu = document.getElementById('menu');
const itemContainer = document.getElementById('itemContainer');
const totalPrice = document.getElementById('totalprice');
const orderSummaryContainer = document.querySelector('.orderSummary-container');
const modal = document.querySelector('.modal');
const purchaseBtn = document.getElementById('purchase-btn');
const orderForm = document.getElementById('order-form');
const renderMessage = document.querySelector('.renderMessage');
let total = 0;

// Rendering the food menu from data.js into the web page
function renderMenu() {
  let menuHtml = '';
  menuArray.forEach((item) => {
    menuHtml += `
    <div class="menuItem">
    <div class="itemDetails-Container">
      <span class="itemImg">${item.emoji}</span>
      <div class="itemDetails">
        <h3 class="title detail">${item.name}</h3>
        <p class="itemIngredient detail">${item.ingredients}</p>
        <h3 class="itemPrice detail">$${item.price}</h3>
      </div>
    </div>
    <div class="selectItem"><span id="${item.id}">+</span></div>
  </div>
    `;
  });
  menu.innerHTML = menuHtml;
  renderTotal(total);
}
renderMenu();

//Adding event listener on the rendered food menu to select items
//& targeting the idof each item
menu.addEventListener('click', function (e) {
  if (e.target.id === '0') {
    pizza(e.target.id);
  } else if (e.target.id === '1') {
    hamburger(e.target.id);
  } else if (e.target.id === '2') {
    beer(e.target.id);
  }
});

//function to return the pizza item
function pizza(pizzaId) {
  const pizzaObj = menuArray.filter(function (obj) {
    return (obj.id = pizzaId);
  })[0];
  renderOrder(pizzaObj);
}

//function to return the hamburger item
function hamburger(burgerId) {
  const burgerObj = menuArray.filter(function (obj) {
    return (obj.id = burgerId);
  })[1];
  renderOrder(burgerObj);
}

//function to return the beer item
function beer(beerId) {
  const beerObj = menuArray.filter(function (obj) {
    return (obj.id = beerId);
  })[2];
  renderOrder(beerObj);
}

//function that displays selected items on the order menu
function renderOrder(item) {
  //removing comfirmation message from previous order
  renderMessage.innerHTML = '';
  let orderHtml = `
  <div class="itemSelected" id="${item.id}">
  <h3 class="title detail">${item.name}</h3>
  <h3 class="itemPrice">$${item.price}</h3>
  <p class="remove">remove</p>
</div>
`;
  itemContainer.innerHTML += orderHtml;
  total += item.price;
  renderTotal(total);
}

//adding eventlistener on the items in the order menu
//removing the element when remove class is clicked by removing it's parent node
//getting the price of the removed item and using it as argument in updateTotal function
orderSummaryContainer.addEventListener('click', function (e) {
  if (e.target.matches('.remove')) {
    const li = e.target.parentNode;
    const getRemovedItemPrice = li.querySelector('.itemPrice').innerHTML;
    li.remove();
    updateTotal(getRemovedItemPrice);
  }
});
//function that removes dollar sign from the price of removed item
//and subtracts the removed price from the total price
function updateTotal(value) {
  const removedPrice = Number(value.replace('$', ''));
  const currentTotal = totalPrice.innerHTML;
  const currentTotalNumber = Number(currentTotal.replace('$', ''));

  total = currentTotalNumber - removedPrice;
  renderTotal(total);
}

//rendering the total when it's only greater than zero
//& displaying the order menu
//hiding order menu when order is zero
function renderTotal(totalValue) {
  if (totalValue > 0) {
    totalPrice.innerHTML = `$${totalValue}`;
    orderSummaryContainer.style.display = 'block';
  } else {
    orderSummaryContainer.style.display = 'none';
  }
}

//displaying modal when purchase is clicked
purchaseBtn.addEventListener('click', function () {
  modal.style.display = 'block';
});

//displaying the confirmatiom message if all fields are filled
//emptying input field
//clearing the order summary menu
//closing the model
orderForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const orderFormData = new FormData(orderForm);

  let requiredFields = document.querySelectorAll('[required]');
  requiredFields.forEach(function (field) {
    if (field.value) {
      const name = orderFormData.get('name');

      setTimeout(function () {
        renderMessage.innerHTML = `
        <div class="message">
        <p>Thanks, ${name}! Your order is on its way!</p>
        </div>

        `;
      }, 1000);
      modal.style.display = 'none';
      field.value = '';
      itemContainer.innerHTML = '';
      total = 0;
      renderTotal(total);
    }
  });
});
