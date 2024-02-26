// Section
const sections = document.querySelectorAll(".section");
// Buttons in sections (parent)
const sectionBtns = document.querySelectorAll(".controls");
// Actual button
const sectionBtn = document.querySelectorAll(".main-button");

 
// Body
const allSections = document.querySelector(".main-content");


const videos = document.querySelectorAll(".video-player")

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

    // Click on video.
    for (let i = 0; i < videoplayer.length;i++)
    {
        console.log(videoplayer[i])
        videoplayer[i].addEventListener("click", (e)=>{
            let currentplayer = document.querySelectorAll (".active-player");
            if (currentplayer[0])
            {
                currentplayer[0].classList.remove("active-player");
            }
            
            const id = e.currentTarget.dataset.id;
            console.log(id);
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
    console.log
    showcase.innerHtml="";

    let count = 1;
    products.forEach(product=>{
        let newProduct = document.createElement("div");
        newProduct.classList.add('item');

        newProduct.innerHTML = `<div class="showcase-row">
        <div class="item-grid">
          <img src="${product["image1"]}" alt="" />
          <img src="${product["image2"]}" alt="" />
          <img src="${product["image3"]}" alt="" />
        </div>

        <div class="project-hover" data-id="video-player-${count}">
          <h2 class="proj-title">Project Title</h2>
          <h3 class="proj-description">Oscar Dewis | Gaffer & Dapper</h3>
        </div>
      </div>

      <div class="video-player" id="video-player-${count}">
        <iframe
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