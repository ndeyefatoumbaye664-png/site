const products = [

  {
    id: 1,
    name: "Robe Élégance",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
  },

  {
    id: 2,
    name: "Blazer Premium",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b"
  },

  {
    id: 3,
    name: "Collection Luxe",
    price: 60000,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c"
  },
 
  {
  id: 4,
  name: "Sac Premium",
  price: 25000,
  image:
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3"
},

{
  id: 5,
  name: "Veste Chic",
  price: 55000,
  image:
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518"
},

{
  id: 6,
  name: "Talons Élégance",
  price: 40000,
  image:
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2"
},

{
  id: 7,
  name: "Collection Summer",
  price: 65000,
  image:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b"
},

{
  id: 8,
  name: "Robe Blanche",
  price: 50000,
  image:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
},

{
  id: 9,
  name: "Luxury Black Dress",
  price: 70000,
  image:
    "https://images.unsplash.com/photo-1509631179647-0177331693ae"
}

];

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

let panier = JSON.parse(localStorage.getItem("panier")) || [];

/* PRODUITS */

function afficherProduits() {

  products.forEach((product) => {

    container.innerHTML += `

      <div class="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl">

        <img
          src="${product.image}"
          class="w-full h-[300px] sm:h-[400px] lg:h-[450px] object-cover">

        <div class="p-6">

          <h3 class="text-2xl font-bold mb-3">

            ${product.name}

          </h3>

          <p class="text-zinc-400 text-lg mb-5">

            ${product.price} FCFA

          </p>

          <button
            onclick="ajouterPanier(${product.id})"
            class="w-full bg-white text-black py-4 rounded-full font-bold">

            Ajouter au panier

          </button>

        </div>

      </div>

    `;
  });

}

afficherProduits();

/* AJOUTER PANIER */

function ajouterPanier(id) {

  const produit = products.find((p) => p.id === id);

  panier.push(produit);

  localStorage.setItem("panier", JSON.stringify(panier));

  afficherPanier();

  afficherCheckout();

}

/* PANIER */

function afficherPanier() {

  cartItems.innerHTML = "";

  let somme = 0;

  panier.forEach((item, index) => {

    somme += item.price;

    cartItems.innerHTML += `

      <div class="flex gap-4 items-center border-b pb-4">

        <img
          src="${item.image}"
          class="w-24 h-24 rounded-2xl object-cover">

        <div class="flex-1">

          <h4 class="font-bold text-lg">

            ${item.name}

          </h4>

          <p class="text-zinc-600">

            ${item.price} FCFA

          </p>

        </div>

        <button
          onclick="supprimerProduit(${index})"
          class="text-red-500 text-xl">

          ×

        </button>

      </div>

    `;
  });

  total.textContent = somme;

  cartCount.textContent = panier.length;

}

afficherPanier();

/* CHECKOUT */

function afficherCheckout() {

  checkoutItems.innerHTML = "";

  let somme = 0;

  panier.forEach((item) => {

    somme += item.price;

    checkoutItems.innerHTML += `

      <div class="flex items-center gap-4">

        <img
          src="${item.image}"
          class="w-20 h-20 object-cover rounded-xl">

        <div class="flex-1">

          <h4 class="font-bold">

            ${item.name}

          </h4>

          <p class="text-zinc-500">

            ${item.price} FCFA

          </p>

        </div>

      </div>

    `;
  });

  checkoutSubtotal.textContent = somme + " FCFA";

  checkoutTotal.textContent = somme + 2000 + " FCFA";

}

afficherCheckout();

/* SUPPRIMER */

function supprimerProduit(index) {

  panier.splice(index, 1);

  localStorage.setItem("panier", JSON.stringify(panier));

  afficherPanier();

  afficherCheckout();

}

/* OUVRIR PANIER */

cartBtn.addEventListener("click", () => {

  cart.style.right = "0";

});

/* FERMER PANIER */

closeCart.addEventListener("click", () => {

  cart.style.right = "-100%";

});

/* MENU MOBILE */

const menuBtn = document.getElementById("menuBtn");

const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

  if (mobileMenu.style.left === "0px") {

    mobileMenu.style.left = "-100%";

  } else {

    mobileMenu.style.left = "0";

  }

});

/* PAGE PAIEMENT */

const deliveryBtn = document.getElementById("deliveryBtn");

const paymentPage = document.getElementById("paymentPage");

deliveryBtn.addEventListener("click", () => {

  paymentPage.classList.remove("hidden");

});

/* WHATSAPP */

const whatsappBtn = document.getElementById("whatsappBtn");

whatsappBtn.addEventListener("click", () => {

  window.open(
    "https://wa.me/221763536678",
    "_blank"
  );

});
const orangeBtn = document.getElementById("orangeBtn");

const orangeModal = document.getElementById("orangeModal");

const closeOrangeModal = document.getElementById("closeOrangeModal");

if (orangeBtn) {

  orangeBtn.addEventListener("click", () => {

    orangeModal.classList.remove("hidden");

  });

}

if (closeOrangeModal) {

  closeOrangeModal.addEventListener("click", () => {

    orangeModal.classList.add("hidden");

  });

}