const products = [
{ id:1,name:"Robe Élégance",price:30000,image:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"},
{ id:2,name:"Blazer Premium",price:45000,image:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b"},
{ id:3,name:"Collection Luxe",price:60000,image:"https://images.unsplash.com/photo-1496747611176-843222e1e57c"},
{ id:4,name:"Sac Premium",price:25000,image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3"},
{ id:5,name:"Veste Chic",price:55000,image:"https://images.unsplash.com/photo-1521572267360-ee0c2909d518"},
{ id:6,name:"Talons Élégance",price:40000,image:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2"},
{ id:7,name:"Collection Summer",price:65000,image:"https://images.unsplash.com/photo-1483985988355-763728e1935b"},
{ id:8,name:"Robe Blanche",price:50000,image:"https://images.unsplash.com/photo-1524504388940-b1c1722653e1"},
{ id:9,name:"Luxury Black Dress",price:70000,image:"https://images.unsplash.com/photo-1509631179647-0177331693ae"}
];

let panier = JSON.parse(localStorage.getItem("panier")) || [];

const quantities={};
products.forEach(p=>quantities[p.id]=1);

const container=document.getElementById("productContainer");
const cart=document.getElementById("cart");
const cartBtn=document.getElementById("cartBtn");
const closeCart=document.getElementById("closeCart");
const cartItems=document.getElementById("cartItems");
const total=document.getElementById("total");
const cartCount=document.getElementById("cartCount");

const checkoutItems=document.getElementById("checkoutItems");
const checkoutSubtotal=document.getElementById("checkoutSubtotal");
const checkoutTotal=document.getElementById("checkoutTotal");

function afficherProduits(){

container.innerHTML="";

products.forEach(product=>{

container.innerHTML+=`

<div class="bg-zinc-900 rounded-3xl overflow-hidden">

<img src="${product.image}" class="w-full h-[400px] object-cover">

<div class="p-6">

<h3 class="text-2xl font-bold mb-2">
${product.name}
</h3>

<p class="text-white text-xl font-bold mb-4">
${product.price} FCFA
</p>

<div class="flex justify-center gap-4 mb-4">

<button onclick="changeQty(${product.id},-1)"
class="bg-white text-black px-3 rounded">
-
</button>

<span id="qty-${product.id}">
1
</span>

<button onclick="changeQty(${product.id},1)"
class="bg-white text-black px-3 rounded">
+
</button>

</div>

<button
onclick="ajouterPanier(${product.id})"
class="w-full bg-white text-black py-3 rounded-xl font-bold">

Ajouter au panier

</button>

</div>

</div>

`;

});

}

afficherProduits();

function changeQty(id,val){

quantities[id]+=val;

if(quantities[id]<1){
quantities[id]=1;
}

document.getElementById(
`qty-${id}`
).textContent=quantities[id];

}

function ajouterPanier(id){

const product=products.find(
p=>p.id===id
);

const exist=panier.find(
p=>p.id===id
);

if(exist){

exist.quantity+=quantities[id];

}else{

panier.push({
...product,
quantity:quantities[id]
});

}

quantities[id]=1;

document.getElementById(
`qty-${id}`
).textContent=1;

save();

render();

renderCheckout();

showMessage("Produit ajouté ✔");

cart.style.right="0";

}

function render(){

cartItems.innerHTML="";

let sum=0;

panier.forEach((item,index)=>{

sum+=item.price*item.quantity;

cartItems.innerHTML+=`

<div class="flex gap-3 border-b pb-3">

<img
src="${item.image}"
class="w-16 h-16 rounded object-cover">

<div class="flex-1">

<h4 class="font-bold">
${item.name}
</h4>

<p>
${item.price} FCFA
</p>

<p>
Quantité : ${item.quantity}
</p>

<div class="flex gap-2 mt-2">

<button
onclick="moins(${index})"
class="bg-black text-white px-3">
-
</button>

<button
onclick="plus(${index})"
class="bg-black text-white px-3">
+
</button>

</div>

</div>

<button
onclick="removeItem(${index})"
class="text-red-500">

×

</button>

</div>

`;

});

total.textContent=sum;

cartCount.textContent=panier.length;

}

function renderCheckout(){

checkoutItems.innerHTML="";

let sum=0;

panier.forEach(item=>{

sum+=item.price*item.quantity;

checkoutItems.innerHTML+=`

<div class="flex justify-between">

<span>
${item.name} x${item.quantity}
</span>

<span>
${item.price*item.quantity} FCFA
</span>

</div>

`;

});

checkoutSubtotal.textContent=sum+" FCFA";

checkoutTotal.textContent=
(sum+2000)+" FCFA";

}

function plus(i){

panier[i].quantity++;

save();

render();

renderCheckout();

}

function moins(i){

panier[i].quantity--;

if(panier[i].quantity<=0){

panier.splice(i,1);

}

save();

render();

renderCheckout();

}

function removeItem(i){

panier.splice(i,1);

save();

render();

renderCheckout();

}

function save(){

localStorage.setItem(
"panier",
JSON.stringify(panier)
);

}

cartBtn.onclick=()=>{

cart.style.right="0";

};

closeCart.onclick=()=>{

cart.style.right="-100%";

};

document.getElementById("menuBtn").onclick=()=>{

const menu=
document.getElementById(
"mobileMenu"
);

menu.style.left=
menu.style.left==="0px"
?"-100%"
:"0";

};

document.getElementById(
"deliveryBtn"
).onclick=()=>{

document
.getElementById("paymentPage")
.classList.remove("hidden");

};

/* ORANGE MONEY */

document.getElementById(
"orangeBtn"
).onclick=()=>{

document
.getElementById("orangeModal")
.classList.remove("hidden");

};

document.getElementById(
"closeOrangeModal"
).onclick=()=>{

document
.getElementById("orangeModal")
.classList.add("hidden");

};

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