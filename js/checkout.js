var CART = [];
var TOTAL = 0;
(() => {
  // to display total items
  if (localStorage.getItem('cart')) {
    CART = JSON.parse(localStorage.getItem('cart') || []);
    console.log(CART);
    let count = CART.length;
    let cartCount = document.getElementById('cartCount');
    cartCount.innerHTML = count;
  } else {
    let cartCount = document.getElementById('cartCount');
    cartCount.innerHTML = 0;
  }
})()

let renderCart = () => {
  let products = JSON.parse(localStorage.getItem('products'));
  let checkoutItems = document.getElementById('checkoutItems');
  checkoutItems.innerHTML = ``;
  CART.forEach(item => {
    let product = [...products].find(product => product.id == item.id);
    TOTAL += +item.count * +product.price;
    checkoutItems.innerHTML +=
      `
      <div class="checkout-card">
      <div class="flex-container-row">
        <div class="checkout-prod-container">
          <img
            src=${product.preview}
            alt="" class="checkout-card-image">
        </div>
        <div class="checkout-prod-info">
          <div class="checkout-product-name">${product.name}</div>
          <div class="checkout-product-brand">${product.brand}</div>
          <div class="checkout-product-count">x${item.count}</div>
          <div class="checkout-product-total-amount">₹ ${product.price}</div>
        </div>
      </div>
    </div>
    `;
  })
  document.getElementById('total').innerHTML = TOTAL;
}

let clearCart = () => {
  localStorage.setItem('cart', JSON.stringify([]));
}
