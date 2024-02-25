// Section
const sections = document.querySelectorAll(".section");
// Buttons in sections (parent)
const sectionBtns = document.querySelectorAll(".controls");
// Actual button
const sectionBtn = document.querySelectorAll(".main-button");

 
// Body
const allSections = document.querySelector(".main-content");

const videoplayer = document.querySelectorAll(".project-hover");

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

function videochanger()
{


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


PageTransitions();
videochanger();