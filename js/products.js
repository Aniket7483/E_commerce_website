// Sample product data (in real project → from database/API)
const products = [
  { id: 1, name: "Wireless Noise Cancelling Headphones", price: 3499, oldPrice: 5999, discount: 42, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500", category: "electronics", rating: 4.8, reviews: 1243 },
  { id: 2, name: "Minimalist Leather Backpack", price: 2899, oldPrice: 4200, discount: 31, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", category: "fashion", rating: 4.7, reviews: 892 },
  { id: 3, name: "Smart Fitness Watch Series 6", price: 7499, oldPrice: 11999, discount: 37, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500", category: "fitness", rating: 4.9, reviews: 2156 },
  { id: 4, name: "Ceramic Non-Stick Cookware Set", price: 3999, oldPrice: 5999, discount: 33, image: "https://images.unsplash.com/photo-1582359646-6b6b6fe5d6d6?w=500", category: "home", rating: 4.6, reviews: 673 },
  { id: 5, name: "4K Action Camera Pro", price: 12499, oldPrice: 18999, discount: 34, image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=500", category: "electronics", rating: 4.8, reviews: 541 },
  { id: 6, name: "Organic Cotton Bedding Set", price: 4499, oldPrice: 6799, discount: 34, image: "https://images.unsplash.com/photo-1629949008636-2f4a6a019a8e?w=500", category: "home", rating: 4.7, reviews: 412 },
  { id: 7, name: "Premium Yoga Mat 6mm", price: 1899, oldPrice: 2999, discount: 37, image: "https://images.unsplash.com/photo-1592432678016-e910a881f145?w=500", category: "fitness", rating: 4.9, reviews: 1289 },
  { id: 8, name: "Polarized Sunglasses UV400", price: 2499, oldPrice: 3999, discount: 38, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500", category: "fashion", rating: 4.8, reviews: 934 },
];

function renderProducts() {
  const container = document.getElementById("products-container");
  if (!container) return;

  let html = "";

  products.forEach(product => {
    html += `
      <div class="col">
        <div class="card product-card h-100">
          ${product.discount ? `<span class="badge bg-danger badge-discount">-${product.discount}%</span>` : ''}
          <img src="${product.image}" class="card-img-top product-img" alt="${product.name}" loading="lazy">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-2">${product.name}</h5>
            <div class="mt-auto">
              <div class="d-flex align-items-center mb-2">
                <span class="price me-2">₹${product.price.toLocaleString()}</span>
                ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice.toLocaleString()}</span>` : ''}
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="rating">
                  ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
                  <small class="text-muted">(${product.reviews})</small>
                </div>
                <button class="btn btn-primary btn-sm add-to-cart" data-id="${product.id}">
                  <i class="fa-solid fa-cart-plus me-1"></i> Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Run when page loads
document.addEventListener("DOMContentLoaded", renderProducts);