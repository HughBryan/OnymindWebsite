
const rentalSection = document.querySelector(".rentals");
const body = document.querySelector("body");
const openShopping = document.querySelector(".shopping-cart");
const cartNumber = document.getElementById("cart-count");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listcard = document.querySelector(".checkout-summary");
const total = document.querySelector(".total");
const quantity = document.querySelector(".quanity");
const rentalBody = document.querySelector(".rental-con")



// Home button Switch & 
document.getElementById("home-button-con").addEventListener("click",()=>{window.location.href = "index.html"});

// Checkout page button
document.getElementById("checkout-button").addEventListener("click",()=>{window.window.location.href = "checkout.html"});


// Open modal function (you can trigger this when a "View Cart" button is clicked)
function openCartModal() {
    document.getElementById("cartModal").style.display = "block";
  }
  
  // Close modal
  function closeCartModal() {
    document.getElementById("cartModal").style.display = "none";
  }
  
  // Event listeners for close buttons
  document.getElementById("closeModalTop").addEventListener("click", closeCartModal);
  
  // Optional: Close modal when user clicks outside the modal content
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("cartModal");
    if (event.target === modal) {
      closeCartModal();
    }
  });
  



openShopping.addEventListener("click",openCartModal);


let rental_products = null;
// Function to load all the rental products from the JSON.
function loadRental()
{
    fetch('rental.json').then(response=>response.json()).then(data=>{
        rental_products = data;
        window.onload = addRentalProducts(rental_products);
        
    })
}

//Function to add all rental products as cards.
function addRentalProducts(rental_products){
    for (productSection in rental_products){
        let sectionContainer = document.createElement("div");
        sectionContainer.classList.add("section-container");

        let new_ls_con = document.createElement("div");
        new_ls_con.classList.add("product-grid");
        
        let sectionTitle = document.createElement("h2");
        sectionTitle.classList.add("section-title");
        sectionTitle.innerHTML = `
        ${productSection} Hire
        `;


        sectionContainer.appendChild(sectionTitle);
        sectionContainer.appendChild(new_ls_con)
        rentalBody.appendChild(sectionContainer)

        for (product_index in rental_products[String(productSection)]){
            item = rental_products[String(productSection)][product_index]


            let new_card = document.createElement("div");
            new_card.classList.add("product-card");
            new_card.innerHTML =
                `
                <img src = "${item["image"]}"/>
                <div class = "title">${item["name"]}</div>
                <div class = "price">$${item["price"]}</div>
                <button onclick = "addToCart('${productSection}',${product_index})">Add To Cart</button>
                `
            new_ls_con.appendChild(new_card);
            
        }
    }
}



// create checkout list:
let listcards = JSON.parse(sessionStorage.getItem('checkout'))
if (listcards == null){
    listcards = {};
};

// Function to add a an item to the cart
function addToCart(productSection,key){

    if (listcards[productSection+key] == null){
        listcards[productSection+key] = rental_products[productSection][key];
        listcards[productSection+key].quantity = 1;
    }

    else if (listcards[productSection+key] != null){
        listcards[productSection+key].quantity += 1;
        console.log(listcards)
    }

    // Save JSON object to session storage.
    sessionStorage.setItem("checkout",JSON.stringify(listcards));

    // Reload the card.
    reloadCart();
}

// Reload the shopping Cart
function reloadCart(){

    listcard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    for (const [key,value] of Object.entries(listcards)){
        totalPrice = totalPrice + Number(value['price'])*Number(value['quantity']);
        count = count+value["quantity"];
        if(value != null){
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
            <div class="image"><img src = "${value["image"]}"/></div>
            <div>${value["name"]}</div>
            <div>Per Unit: $${value["price"]}</div>
            <div>Quantity: ${value["quantity"]}</div>
            <button class="remove-button" id = "${key}" onclick="removeButton(this)">
            <i class="fa-regular fa-circle-xmark"></i>
            </button>

            `;
            listcard.appendChild(newDiv);

        }


    }
    total.innerText = "$"+String(totalPrice);
    cartNumber.textContent = count

    
    updateCheckoutButton()
}

// Is the remove button in the shopping cart. 
function removeButton(button){

    listcards[button.id].quantity-=1;
    if (listcards[button.id].quantity <= 0)
    {
        const parentDiv = button.parentElement;
        parentDiv.remove();
        delete listcards[button.id]
    }


    sessionStorage.setItem("checkout",JSON.stringify(listcards));

    reloadCart()

}


// Function that only lets the user checkout if they have more than 1 item. 
function updateCheckoutButton() {
    const checkoutButton = document.getElementById("checkout-button");
    
    console.log(listcards)
    if (Object.keys(listcards).length
    > 0) {
      checkoutButton.disabled = false;
    } else {
      checkoutButton.disabled = true;
    }
  }


loadRental();
reloadCart();

