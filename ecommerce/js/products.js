const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!isLoggedIn()) {
      alert("Please login before adding products to your cart.");

      window.location.href = "login.html";

      return;
    }

    const productCard = button.closest(".product-card");

    const product = {
      id: Number(productCard.dataset.id),
      name: productCard.dataset.name,
      price: Number(productCard.dataset.price),
      image: productCard.dataset.image,
    };

    addToCart(product);

    alert(product.name + " added to cart.");
  });
});
