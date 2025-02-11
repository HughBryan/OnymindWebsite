
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
document.getElementById("home-button-con").addEventListener("click",()=>{window.location.href = "home.html"});

document.getElementById("shopping-cart").addEventListener("click",()=>{window.location.href = "rental.html"});


// JavaScript for form validation
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");
    const subjectError = document.getElementById("subject-error");
    const messageError = document.getElementById("message-error");

    form.addEventListener("submit", (event) => {
        let isValid = true;

        // Clear previous error messages
        nameError.style.display = "none";
        emailError.style.display = "none";
        phoneError.style.display = "none";
        subjectError.style.display = "none";
        messageError.style.display = "none";

        // Validate Full Name
        if (nameInput.value.trim() === "") {
            isValid = false;
            nameError.textContent = "Full Name is required.";
            nameError.style.display = "block";
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            isValid = false;
            emailError.textContent = "Please enter a valid email address.";
            emailError.style.display = "block";
        }

        // Validate Phone Number (optional)
        const phoneRegex = /^\d{10}$/;
        if (phoneInput.value.trim() !== "" && !phoneRegex.test(phoneInput.value.trim())) {
            isValid = false;
            phoneError.textContent = "Please enter a valid 10-digit phone number.";
            phoneError.style.display = "block";
        }

        // Validate Subject
        if (subjectInput.value === "") {
            isValid = false;
            subjectError.textContent = "Please select a subject.";
            subjectError.style.display = "block";
        }

        // Validate Message
        if (messageInput.value.trim() === "") {
            isValid = false;
            messageError.textContent = "Message cannot be empty.";
            messageError.style.display = "block";
        }

        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }
    });
});