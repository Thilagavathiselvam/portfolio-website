// ==============================
// LOAD PROJECTS FROM MONGODB
// ==============================

fetch("http://localhost:5000/api/projects")
    .then(response => response.json())
    .then(data => {

        let output = "";

        data.forEach(project => {

            output += `
                <div class="project-card">

                    <h3>${project.title}</h3>

                    <p>${project.description}</p>

                    <p>
                        <strong>Technologies:</strong>
                        ${project.technologies}
                    </p>

                    <a href="${project.githubLink}" target="_blank">
                        🔗 GitHub Repository
                    </a>

                </div>
            `;
        });

        document.getElementById("projectList").innerHTML = output;
    })
    .catch(error => {
        console.log("Error Loading Projects:", error);
    });


// ==============================
// CONTACT FORM
// ==============================

const contactForm = document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;

        const email = document.getElementById("email").value;

        const message = document.getElementById("message").value;

        try{

            const response = await fetch(
                "http://localhost:5000/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        message
                    })
                }
            );

            const data = await response.json();

            alert(data.message);

            contactForm.reset();

        }catch(error){

            console.log(error);

            alert("Failed to Send Message");

        }

    });

}


// ==============================
// DARK / LIGHT MODE
// ==============================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.innerHTML = "☀️ Light Mode";

        localStorage.setItem("theme","dark");

    }
    else{

        themeBtn.innerHTML = "🌙 Dark Mode";

        localStorage.setItem("theme","light");

    }

});


// ==============================
// LOAD SAVED THEME
// ==============================

window.addEventListener("load", () => {

    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "dark"){

        document.body.classList.add("dark");

        themeBtn.innerHTML = "☀️ Light Mode";

    }

});


// ==============================
// SMOOTH SCROLLING
// ==============================

document.querySelectorAll('nav a').forEach(link => {

    link.addEventListener('click', function(e) {

        e.preventDefault();

        const targetId = this.getAttribute('href');

        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });

    });

});


// ==============================
// PORTFOLIO STATS ANIMATION
// ==============================

const statNumbers = document.querySelectorAll(".stat-card h3");

statNumbers.forEach(stat => {

    const target = parseInt(stat.innerText);

    let count = 0;

    const updateCounter = () => {

        if(count < target){

            count++;

            stat.innerText = count + "+";

            setTimeout(updateCounter,50);

        }
        else{

            stat.innerText = target + "+";

        }

    };

    if(!isNaN(target)){

        updateCounter();

    }

});