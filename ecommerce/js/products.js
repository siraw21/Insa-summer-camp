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
