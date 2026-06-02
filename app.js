const products = [
  { id: 1, name: "Robe Élégance", price: 30000, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f" },
  { id: 2, name: "Blazer Premium", price: 45000, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b" },
  { id: 3, name: "Collection Luxe", price: 60000, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c" },
  { id: 4, name: "Sac Premium", price: 25000, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3" },
  { id: 5, name: "Veste Chic", price: 55000, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518" },
  { id: 6, name: "Talons Élégance", price: 40000, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2" },
  { id: 7, name: "Collection Summer", price: 65000, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b" },
  { id: 8, name: "Robe Blanche", price: 50000, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1" },
  { id: 9, name: "Luxury Black Dress", price: 70000, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae" }
];

/* ===== VARIABLES ===== */
let panier = JSON.parse(localStorage.getItem("panier")) || [];

const container = document.getElementById("productContainer");
const cart = document.getElementById("cart");
const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const total = document.getElementById("total");
const cartCount = document.getElementById("cartCount");

const checkoutItems = document.getElementById("checkoutItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutTotal = document.getElementById("checkoutTotal");

const paymentPage = document.getElementById("paymentPage");
const deliveryBtn = document.getElementById("deliveryBtn");

/* quantité avant ajout */
const quantities = {};
products.forEach(p => quantities[p.id] = 1);

/* ===== PRODUITS ===== */
function afficherProduits() {
  container.innerHTML = "";

  products.forEach(product => {
    container.innerHTML += `
      <div class="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl">

        <img src="${product.image}" class="w-full h-[400px] object-cover">

        <div class="p-6">

          <h3 class="text-2xl font-bold mb-2">${product.name}</h3>

          <p class="text-white text-xl font-bold mb-4">
            ${product.price} FCFA
          </p>

          <!-- QUANTITÉ -->
          <div class="flex items-center justify-center gap-4 mb-4">

            <button onclick="changeQty(${product.id}, -1)" class="px-3 py-1 bg-white text-black rounded">-</button>

            <span id="qty-${product.id}" class="text-lg font-bold">1</span>

            <button onclick="changeQty(${product.id}, 1)" class="px-3 py-1 bg-white text-black rounded">+</button>

          </div>

          <button onclick="ajouterPanier(${product.id})"
            class="w-full bg-white text-black py-3 rounded-xl font-bold">

            Ajouter au panier

          </button>

        </div>
      </div>
    `;
  });
}
afficherProduits();

/* ===== QUANTITE PRODUIT ===== */
function changeQty(id, value) {
  quantities[id] += value;
  if (quantities[id] < 1) quantities[id] = 1;

  document.getElementById(`qty-${id}`).textContent = quantities[id];
}

/* ===== AJOUT PANIER ===== */
function ajouterPanier(id) {
  const product = products.find(p => p.id === id);
  const qty = quantities[id];

  const exist = panier.find(p => p.id === id);

  if (exist) {
    exist.quantity += qty;
  } else {
    panier.push({ ...product, quantity: qty });
  }

  quantities[id] = 1;
  document.getElementById(`qty-${id}`).textContent = 1;

  save();
  render();
  renderCheckout();

  showMessage("Produit ajouté ✔");

  cart.style.right = "0";
}

/* ===== AFFICHER PANIER ===== */
function render() {
  cartItems.innerHTML = "";

  let sum = 0;

  panier.forEach((item, index) => {
    sum += item.price * item.quantity;

    cartItems.innerHTML += `
      <div class="flex gap-3 items-center border-b pb-3">

        <img src="${item.image}" class="w-16 h-16 object-cover rounded">

        <div class="flex-1">

          <h4 class="font-bold">${item.name}</h4>

          <p>${item.price} FCFA</p>

          <p>Quantité : ${item.quantity}</p>

          <div class="flex gap-2 mt-2">

            <button onclick="moins(${index})" class="px-3 bg-black text-white">-</button>
            <button onclick="plus(${index})" class="px-3 bg-black text-white">+</button>

          </div>

        </div>

        <button onclick="removeItem(${index})" class="text-red-500 text-xl">×</button>

      </div>
    `;
  });

  total.textContent = sum;
  cartCount.textContent = panier.length;
}

/* ===== CHECKOUT ===== */
function renderCheckout() {
  checkoutItems.innerHTML = "";

  let sum = 0;

  panier.forEach(item => {
    sum += item.price * item.quantity;

    checkoutItems.innerHTML += `
      <div class="flex justify-between">
        <span>${item.name} x${item.quantity}</span>
        <span>${item.price * item.quantity} FCFA</span>
      </div>
    `;
  });

  checkoutSubtotal.textContent = sum + " FCFA";
  checkoutTotal.textContent = (sum + 2000) + " FCFA";
}

/* ===== + - PANIER ===== */
function plus(i) {
  panier[i].quantity++;
  save();
  render();
  renderCheckout();
}

function moins(i) {
  panier[i].quantity--;
  if (panier[i].quantity <= 0) panier.splice(i, 1);

  save();
  render();
  renderCheckout();
}

function removeItem(i) {
  panier.splice(i, 1);

  save();
  render();
  renderCheckout();
}

/* ===== SAVE ===== */
function save() {
  localStorage.setItem("panier", JSON.stringify(panier));
}

/* ===== CART OPEN/CLOSE ===== */
cartBtn.onclick = () => cart.style.right = "0";
closeCart.onclick = () => cart.style.right = "-100%";

/* ===== MENU MOBILE ===== */
document.getElementById("menuBtn").onclick = () => {
  const menu = document.getElementById("mobileMenu");
  menu.style.left = menu.style.left === "0px" ? "-100%" : "0";
};

/* ===== DELIVERY ===== */
deliveryBtn.addEventListener("click", () => {
  paymentPage.classList.remove("hidden");
});

/* ===== WHATSAPP ===== */
document.getElementById("whatsappBtn").addEventListener("click", () => {
  if (panier.length === 0) {
    showMessage("Panier vide ❌");
    return;
  }

  let message = "🛍️ Nouvelle commande\n\n";

  panier.forEach(p => {
    message += `- ${p.name} x${p.quantity} = ${p.price * p.quantity} FCFA\n`;
  });

  const totalCmd = panier.reduce((s, i) => s + i.price * i.quantity, 0);

  message += `\nTOTAL: ${totalCmd + 2000} FCFA`;

  window.open(`https://wa.me/221763536678?text=${encodeURIComponent(message)}`, "_blank");

  panier = [];
  save();
  render();
  renderCheckout();
});

/* ===== NOTIFICATION ===== */
function showMessage(text) {
  const msg = document.createElement("div");

  msg.textContent = text;
  msg.className =
    "fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl";

  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 2500);
}

/* INIT */
render();
renderCheckout();