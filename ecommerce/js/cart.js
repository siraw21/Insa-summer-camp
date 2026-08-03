const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

if (cartItems && cartTotal) {
  displayCart();
}

function displayCart() {
  const cart = getCart();

  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((product) => {
    total += product.price * product.quantity;

    cartItems.innerHTML += `

      <tr>

        <td>

          <img
            src="${product.image}"
            alt="${product.name}"
            width="70"
          >

        </td>

        <td>${product.name}</td>

        <td>${product.price.toLocaleString()} ETB</td>

        <td>${product.quantity}</td>

        <td>${(product.price * product.quantity).toLocaleString()} ETB</td>

        <td>

          <button
            class="btn remove-btn"
            data-id="${product.id}"
          >

            Remove

          </button>

        </td>

      </tr>

    `;
  });

  cartTotal.textContent = `Total: ${total.toLocaleString()} ETB`;

  addRemoveEvents();
}

function addRemoveEvents() {
  const removeButtons = document.querySelectorAll(".remove-btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      removeFromCart(id);

      displayCart();
    });
  });
}

const checkoutButton = document.getElementById("checkout-btn");

if (checkoutButton) {
  checkoutButton.addEventListener("click", function (event) {
    if (!isLoggedIn()) {
      event.preventDefault();

      showToast("Please login before checkout.");
      // alert("Please login before checkout.");

      // window.location.href = "login.html";
    }
  });
}
