// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = count;
  });
}

function renderCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-center my-5">Your cart is empty.</p>`;
    totalEl.textContent = "₹0.00";
    return;
  }

  let html = "";
  let total = 0;

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;

    const itemTotal = product.price * item.quantity;
    total += itemTotal;

    html += `
      <div class="cart-item d-flex align-items-center">
        <img src="${product.image}" alt="${product.name}" width="80" class="rounded me-3">
        <div class="flex-grow-1">
          <h6 class="mb-1">${product.name}</h6>
          <p class="mb-1 text-primary">₹${product.price.toLocaleString()} × ${item.quantity}</p>
        </div>
        <div class="quantity-control d-flex align-items-center me-4">
          <button class="btn btn-outline-secondary btn-sm decrease-qty" data-id="${item.id}">-</button>
          <span class="px-3 py-1 border-top border-bottom">${item.quantity}</span>
          <button class="btn btn-outline-secondary btn-sm increase-qty" data-id="${item.id}">+</button>
        </div>
        <button class="btn btn-sm btn-outline-danger remove-item" data-id="${item.id}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
  totalEl.textContent = `₹${total.toLocaleString()}`;

  // Attach event listeners
  document.querySelectorAll(".increase-qty").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const item = cart.find(i => i.id === id);
      if (item) {
        item.quantity++;
        saveCart();
      }
    });
  });

  document.querySelectorAll(".decrease-qty").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const item = cart.find(i => i.id === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        saveCart();
      } else if (item) {
        cart = cart.filter(i => i.id !== id);
        saveCart();
      }
    });
  });

  document.querySelectorAll(".remove-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      cart = cart.filter(i => i.id !== id);
      saveCart();
    });
  });
}

// Add to cart
document.addEventListener("click", e => {
  if (e.target.closest(".add-to-cart")) {
    const btn = e.target.closest(".add-to-cart");
    const id = parseInt(btn.dataset.id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ id, quantity: 1 });
    }

    saveCart();

    // Feedback animation
    btn.innerHTML = '<i class="fa-solid fa-check me-1"></i> Added!';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-cart-plus me-1"></i> Add';
      btn.disabled = false;
    }, 1500);
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();

  // Listen for modal show → re-render cart
  const cartModal = document.getElementById("cart-modal");
  if (cartModal) {
    cartModal.addEventListener("show.bs.modal", renderCart);
  }
});