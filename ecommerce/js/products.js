const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Find the parent product card
    const productCard = button.closest(".product-card");

    // Create product object
    const product = {
      id: Number(productCard.dataset.id),

      name: productCard.dataset.name,

      price: Number(productCard.dataset.price),

      image: productCard.dataset.image,
    };

    // Save to Local Storage
    addToCart(product);

    // Simple success message
    alert(product.name + " added to cart.");
  });
});
