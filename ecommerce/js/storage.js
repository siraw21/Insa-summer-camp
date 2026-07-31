const CART_KEY = "merkato-cart";

function getCart() {
  const cart = localStorage.getItem(CART_KEY);

  if (cart === null) {
    return [];
  }

  return JSON.parse(cart);
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();

  const existingProduct = cart.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    product.quantity = 1;

    cart.push(product);
  }

  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart();

  const updatedCart = cart.filter((item) => item.id !== id);

  saveCart(updatedCart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
}
