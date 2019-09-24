(() => {
  // checking if cart has something to display cart count
  if (localStorage.getItem('cart')) {
    let count = JSON.parse(localStorage.getItem('cart') || []).length;
    let cartCount = document.getElementById('cartCount');
    cartCount.innerHTML = count;
  } else {
    let cartCount = document.getElementById('cartCount');
    cartCount.innerHTML = 0;
  }
  fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product')
    .then(response => response.json())
    .then(data => localStorage.setItem('products', JSON.stringify(data)))
    .then(() => renderProducts());
})();

let renderProducts = () => {
  let clothingContainer = document.getElementById('clothingContainer');
  let accessoriesContainer = document.getElementById('accessoriesContainer');

  clothingContainer.innerHTML = '';
  accessoriesContainer.innerHTML = '';

  let data = JSON.parse(localStorage.getItem('products'));

  data.forEach(item => {
    if (!item.isAccessory) {
      clothingContainer.innerHTML +=
        `
        <div class="custom-col fit-5">
          <a href="product.html?id=${item.id}">
            <div class="card custom-card">
              <img
                src="${item.preview}"
                class="card-img-top card-image" alt="...">
              <div class="card-body">
                <p class="cart-text" id="productTitle">${item.name}</p>
                <p class="card-text" id="productBrand">${item.brand}</p>
                <p class="card-text" id="productPrice">₹ ${item.price}</p>
              </div>
            </div>
          </a>
        </div>
      `;
    }
    else {
      accessoriesContainer.innerHTML +=
        `
        <div class="custom-col fit-5">
          <a href="product.html?id=${item.id}">
            <div class="card custom-card">
              <img
                src="${item.preview}"
                class="card-img-top card-image" alt="...">
              <div class="card-body">
                <p class="cart-text" id="productTitle">${item.name}</p>
                <p class="card-text" id="productBrand">${item.brand}</p>
                <p class="card-text" id="productPrice">₹ ${item.price}</p>
              </div>
            </div>
          </a>
        </div>
      `;
    }
  })

}

