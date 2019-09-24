var product = {};
var id = 1;
let getCartCount = () => {
  if (localStorage.getItem('cart')) {
    let count = JSON.parse(localStorage.getItem('cart') || []).length;
    let cartCount = document.getElementById('cartCount');
    cartCount.innerHTML = count;
  } else {
    let cartCount = document.getElementById('cartCount');
    cartCount.innerHTML = 0;
  }
}
(() => {

  // checking if cart has something to display cart count
  getCartCount();
  // single product fetch
  id = document.URL.split('=')[1];
  fetch(`https://5d76bf96515d1a0014085cf9.mockapi.io/product/${id}`)
    .then(response => response.json())
    .then(data => {
      product = data;
      renderProduct();
    });
})();

let renderProduct = () => {
  let productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = ``;
  productContainer.innerHTML =
    `
      <main>
      <div class="content">
        <div class="col-1">
          <img
            src="${product.preview}"
            alt="${product.name}" class="product-image" id="product-image">
        </div>
        <div class="col-2">
          <div class="product-name">
            <h1>${product.name}</h1>
          </div>
          <div class="product-brand">
            <h2>${product.brand}</h2>
          </div>
          <div class="product-brand">
            <h2>Price:₹ ${product.price}</h2>
          </div>
          <div class="product-desc">
            <p>${product.description}</p>
          </div>
          <div class="product-color">
            <div class="picker-container">
              <h2>Product Preview</h2>
              <div class="color-container" id="photoContainer">

              </div>
            </div>
          </div>
          <button class="btn" onClick=addToCart(${id})>Buy Now</button>
        </div>
      </div>
    </main>
  `;
  renderPhotos();
}

// render bottom photos
let renderPhotos = () => {
  let photoContainer = document.getElementById('photoContainer');
  photoContainer.innerHTML = ``;
  product.photos.forEach(photo => {
    photoContainer.innerHTML +=
      `
    <div class="photo-item">
      <img src="${photo}" class="color-picker" onclick="changeImage('${photo}')" />
    </div>
    `
  })

}

// changes product image from bottom options
let changeImage = (link) => document.getElementById('product-image').src = link;

// add product to cart

let addToCart = (id) => {
  console.log('add to cart called: ', id);
  if (window.confirm('Do you want this item to be added to your cart?')) {
    if (localStorage.getItem('cart')) {
      // cart already present
      let currCart = JSON.parse(localStorage.getItem('cart' || []));
      if (currCart.some(item => item.id === id)) {
        // item already present in cart
        currCart.forEach(item => {
          if (item.id === id) {
            item.count++;
          }
        })
      } else {
        // item not present in cart
        currCart.push({ id: id, count: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(currCart));
    } else {
      // cart not present
      localStorage.setItem('cart', JSON.stringify([{ id: id, count: 1 }]));
    }
    getCartCount();
  } else {
    return;
  }
}
