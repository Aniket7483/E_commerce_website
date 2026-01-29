// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Simple newsletter form feedback (demo)
document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", e => {
    if (form.querySelector('input[type="email"]')) {
      e.preventDefault();
      alert("Thank you! You'll receive 10% off your first order soon.");
      form.reset();
    }
  });
});

// Wishlist count placeholder (can be expanded)
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
document.querySelectorAll(".wishlist-count").forEach(el => {
  el.textContent = wishlist.length;
});