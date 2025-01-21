
const rentalSection = document.querySelector(".rentals");
const body = document.querySelector("body");
const openShopping = document.querySelector(".shopping-cart");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listcard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const quantity = document.querySelector(".quanity");
const rentalBody = document.querySelector(".rental-con")
const checkoutItems = document.querySelector(".checkout-items");


// Home button Switch & 
document.getElementById("home-button-con").addEventListener("click",()=>{window.location.href = "index.html"});

document.getElementById("shopping-cart").addEventListener("click",()=>{window.location.href = "rental.html"});

const storedUser = JSON.parse(sessionStorage.getItem('checkout'));
console.log("List information")
console.log(storedUser);



// JavaScript code for form validation
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const addressInput = document.getElementById("address");
    const dateInput = document.getElementById("date");
    const dateErrorSpan = document.getElementById("date-error");
    console.log(form);

    form.addEventListener("submit", (event) => {
        let isValid = true;
        let errorMessage = "";

        // Validate Full Name
        if (nameInput.value.trim() === "") {
            isValid = false;
            errorMessage += "Full Name is required.\n";
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            isValid = false;
            errorMessage += "Please enter a valid email address.\n";
        }

        // Validate Phone Number
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneInput.value.trim())) {
            isValid = false;
            errorMessage += "Please enter a valid 10-digit mobile number.\n";
        }

        // Validate Address
        if (addressInput.value.trim() === "") {
            isValid = false;
            errorMessage += "Address is required.\n";
        }

        // Validate Rental Date
        const selectedDate = new Date(dateInput.value);
        const today = new Date();

        // Clear any previous error message
        dateErrorSpan.textContent = "";

        if (!dateInput.value) {
            isValid = false;
            errorMessage += "Invalid date.\n";

            dateErrorSpan.textContent = "Rental date is required.";
        } else if (selectedDate < today.setHours(0, 0, 0, 0)) {
            isValid = false;
            errorMessage += "Invalid date.\n";

            dateErrorSpan.textContent = "Rental date cannot be in the past.";
        }

        // If form is not valid, prevent submission and show errors
        if (!isValid) {
            event.preventDefault();
            alert(errorMessage);
        }
    });
});

  
function checkoutCart(){
    let totalPrice = 0;

    for (const [key,value] of Object.entries(storedUser)){
        // Calculate total value:
        totalPrice = totalPrice + Number(value['price'])*Number(value['quantity']);

        let newDiv = document.createElement("li");
        newDiv.classList.add("checkout-card")
        newDiv.innerHTML = `
        <div class="image"><img src = "${value["image"]}"/></div>
        <div>${value["name"]}</div>
        <div>Per Unit: $${value["price"]}</div>
        <div>Quantity: ${value["quantity"]}</div>
        `;
        checkoutItems.appendChild(newDiv);
    }

    let total = document.createElement("span");
    total.textContent = `Total: $${totalPrice}`;
    checkoutItems.appendChild(total);


};

checkoutCart();