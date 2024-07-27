// Section
const sections = document.querySelectorAll(".section");
// Buttons in sections (parent)
const sectionBtns = document.querySelectorAll(".controls");
// Actual button
const sectionBtn = document.querySelectorAll(".main-button");

 
// Body
const allSections = document.querySelector(".main-content");



const showcase = document.querySelector(".showcase-wrapper")

function PageTransitions(){
    // 
    for(let i = 0; i < sectionBtn.length;i++)
    { 
        sectionBtn[i].addEventListener("click", (e) => {
            let currentBtn = document.querySelectorAll('.active-button');
            currentBtn[0].className = currentBtn[0].className.replace("active-button","");
            e.currentTarget.className += ' active-button';  

            const id = e.currentTarget.dataset.id;
            if (id)
            {
                sections.forEach((section) => {
                    section.classList.remove("active");
                })
    
                const element = document.getElementById(id);
                element.classList.add("active");
            }
        })
    }
}


function videoChanger()
{

    const videoplayer = document.querySelectorAll(".project-hover");
    const videos = document.querySelectorAll(".video-player")

    // Click on video.
    for (let i = 0; i < videoplayer.length;i++)
    {
        videoplayer[i].addEventListener("click", (e)=>{
            let currentplayer = document.querySelectorAll (".active-player");
            if (currentplayer[0])
            {
                currentplayer[0].classList.remove("active-player");
            }
            
            const id = e.currentTarget.dataset.id;
            if (id)
            {
                videos.forEach((video)=>{
                    video.classList.remove("active-player");
                })
                const element = document.getElementById(id);
                element.classList.add("active-player")
            }
        })
    }  


    allSections.addEventListener('click', function(e){   
        if (!(document.getElementById('showcase-wrapper').contains(e.target))){
            // Clicked in box 
            videos.forEach((video)=>{

                if (video.classList.contains("active-player")){
                    video.classList.remove("active-player");
                }
        })
        } 

        });
}

const rentalSection = document.querySelector(".rentals");

const body = document.querySelector("body");
const openShopping = document.querySelector(".shopping-cart");
const closeShopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listcard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const quantity = document.querySelector(".quanity");
const rentalBody = document.querySelector(".rental-con")


function loadGallery()
{
    
    fetch('GAFF.json').then(response=>response.json()).then(data=>{
        products = data;
        window.onload = addDataToHtml(products);
        
    })
}

function addDataToHtml(products)
{
    
    const showcase = document.querySelector(".showcase-wrapper");
    showcase.innerHtml="";

    let count = 1;
    products.forEach(product=>{
        let newProduct = document.createElement("div");
        newProduct.classList.add('item');

        newProduct.innerHTML = `<div class="showcase-row">
        <div class="item-grid">
          <img loading = "lazy" src="${product["image1"]}" alt="" />
          <img loading = "lazy" src="${product["image2"]}" alt="" />
          <img loading = "lazy" src="${product["image3"]}" alt="" />
        </div>

        <div class="project-hover" data-id="video-player-${count}">
          <h2 class="proj-title">Project Title</h2>
          <h3 class="proj-description">Oscar Dewis | Gaffer & Dapper</h3>
        </div>
      </div>

      <div class="video-player" id="video-player-${count}">
        <iframe loading = "lazy"
          width="1600"
          height="900"
          src="${product["url"]}"
          title="JAIM - All My All (Official Music Video)"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>`;
      showcase.appendChild(newProduct);

        count+=1;
    })

    
    // Add video transition ability. 
    videoChanger();
}

let rental_products = null;
function loadRental()
{
    fetch('rental.json').then(response=>response.json()).then(data=>{
        rental_products = data;
        window.onload = addRentalProducts(rental_products);
        
    })
}

function addRentalProducts(rental_products){
    for (productSection in rental_products){
        let sectionContainer = document.createElement("div");
        sectionContainer.classList.add("section-container");

        let new_ls_con = document.createElement("div");
        new_ls_con.classList.add("product-grid");
        
        let sectionTitle = document.createElement("h2");
        sectionTitle.classList.add("section-title");
        sectionTitle.innerHTML = `
        ${productSection}
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
                <button onclick = "addToCard('${productSection}',${product_index})">Add To Cart</button>
                `
            new_ls_con.appendChild(new_card);
            
        }
    }
}

let listcards = {};
function addToCard(productSection,key){
    console.log(rental_products)
    console.log(productSection,key)
    if (listcards[productSection+key] == null){
        listcards[productSection+key] = rental_products[productSection][key];
        listcards[productSection+key].quantity = 1;
    }
    reloadCard();
}

function reloadCard(){

    console.log(listcards)
    listcard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    for (const [key,value] of Object.entries(listcards)){
        totalPrice = totalPrice + Number(value['price']);
        count = count+value["quantity"];

        if(value != null){
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
            <div><img src = "${value["image"]}"/></div>
            <div>${value["name"]}</div>
            <div>$${value["price"]}</div>
            <div>${value["quantity"]}</div>
            <div>

            </div>
            `;
            listcard.appendChild(newDiv);

        }
    }
    total.innerText = "$"+String(totalPrice);
}


function rentalTransition(){
    openShopping.addEventListener('click', ()=>{


        // If rental section is not open, open rental section with the cart open.
        if (! rentalSection.classList.contains("active"))
        {
            sections.forEach((section) => {
                section.classList.remove("active");
            })
            rentalSection.classList.add("active");

            body.classList.add("active-rental");
        }   
        // Else, either close or open the cart as the rental page is open.        
        else{

            if (body.classList.contains("active-rental"))
            {
                body.classList.remove("active-rental");
            }
            else{
                body.classList.add("active-rental");

            }            
        }
        


    });

    closeShopping.addEventListener('click', ()=>{
        body.classList.remove("active-rental");
    });


}

loadGallery();
PageTransitions();
videoChanger();
rentalTransition();
loadRental();
