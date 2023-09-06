import { menuArray } from './data.js'

const modal = document.getElementById('modal')
const paymentForm = document.getElementById('payment-form')

document.addEventListener('click', function(e){
    if(e.target.dataset.id){
        handleOrder(Number(e.target.dataset.id))
    }
    if(e.target.id === "complete-btn"){
        modal.classList.remove('hidden')
    }
})

document.addEventListener('submit', function(e) {
    if (e.target.id === "payment-form") {
        e.preventDefault()
        const consentFormData = new FormData(paymentForm)
        const fullName = consentFormData.get('fullName')
        displayOrderCompleteText(fullName)
        modal.classList.add('hidden')
    }
})

let orderList = []
let totalPrice = 0

function displayOrderCompleteText(name){
    document.getElementById("your-order").style.display = "none";
    let orderCompleteHtml = `<h2 class="order-complete-text">Thanks, ${name}! Your order is on its way!</h2>`;
    let div = document.createElement('div')
    div.innerHTML = orderCompleteHtml;
    document.getElementById('container').appendChild(div)
}


function handleOrder(dishId) {
    const targetOrder = menuArray.filter(function(dish) {
        return dish.id === dishId;
    })[0];
    orderList.push(targetOrder);
    totalPrice += targetOrder.price;

    let yourOrderDiv = document.getElementById("your-order");
    if (!yourOrderDiv) {
        yourOrderDiv = document.createElement('div');
        yourOrderDiv.id = "your-order";
        yourOrderDiv.innerHTML = `<h3>Your Order</h3><hr><div class="price" id="price"></div>`;
        document.getElementById('menu').appendChild(yourOrderDiv);
    }
    
    let orderHtml = "";
    for (let item of orderList) {
        orderHtml += `
                    <div class="item-price">
                        <p>${item.name}</p>
                        <p>${item.price}</p>
                    </div>`
    }
    orderHtml += `<div class="total-price">
                    <p>Total Price</p>
                    <p>${totalPrice}</p>
                  </div>
                  <button id="complete-btn">Complete Order</button>`
    
    document.getElementById('price').innerHTML = orderHtml
    
}





function getHtml(arr){
    return arr.map(function(dish){
        return `<div class="main-section">
            <p class="img">${dish.emoji}</p>
            <div class="item-details">
                <h3>${dish.name}</h3>
                <p>${dish.ingredients}</p>
                <h4>\$${dish.price}</h4>
            </div>
            <button class="add" data-id="${dish.id}">+</button>
        </div>
        `
    })
}

document.getElementById('menu').innerHTML = getHtml(menuArray)

