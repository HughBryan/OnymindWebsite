// Section
const sections = document.querySelectorAll(".section");
// Buttons in sections (parent)
const sectionBtns = document.querySelectorAll(".controls");
// Actual button
const sectionBtn = document.querySelectorAll(".main-button");
// Body
const allSections = document.querySelector(".main-content");

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

PageTransitions();