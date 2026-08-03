// const addToCartButtons = document.querySelectorAll(".add-to-cart");

// addToCartButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     if (!isLoggedIn()) {
//       alert("Please login before adding products to your cart.");

//       window.location.href = "login.html";

//       return;
//     }

//     const productCard = button.closest(".product-card");

//     const product = {
//       id: Number(productCard.dataset.id),
//       name: productCard.dataset.name,
//       price: Number(productCard.dataset.price),
//       image: productCard.dataset.image,
//     };

//     addToCart(product);

//     alert(product.name + " added to cart.");
//   });
// });
// ==========================================
// ADD TO CART BUTTONS
// ==========================================

// const addToCartButtons = document.querySelectorAll(".add-to-cart");

// addToCartButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     // ------------------------------------------
//     // CHECK LOGIN
//     // ------------------------------------------

//     if (!isLoggedIn()) {
//       showToast("Please login before adding to cart.");
//       return;
//     }

//     // ------------------------------------------
//     // GET PRODUCT CARD
//     // ------------------------------------------

//     const productCard = button.closest(".product-card");

//     // ------------------------------------------
//     // CREATE PRODUCT
//     // ------------------------------------------

//     const product = {
//       id: Number(productCard.dataset.id),

//       name: productCard.dataset.name,

//       price: Number(productCard.dataset.price),

//       image: productCard.dataset.image,
//     };

//     // ------------------------------------------
//     // ADD TO CART
//     // ------------------------------------------

//     addToCart(product);

//     // ------------------------------------------
//     // SUCCESS MESSAGE
//     // ------------------------------------------

//     showToast(product.name + " added to cart.");
//   });
// });

// ==========================================
// ADD TO CART
// ==========================================

const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Check authentication first

    if (!isLoggedIn()) {
      showToast("Please login before adding to cart.");
      return;
    }

    // Get product card

    const productCard = button.closest(".product-card");

    // Create product object

    const product = {
      id: Number(productCard.dataset.id),

      name: productCard.dataset.name,

      price: Number(productCard.dataset.price),

      image: productCard.dataset.image,
    };

    // Add product to cart

    addToCart(product);

    // Show success message

    showToast(product.name + " added to cart.");
  });
});
