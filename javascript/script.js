// Dynamic Sticky Nav & Conditional Social Links
const navbar = document.getElementById('navbar');
const navSocials = document.getElementById('nav-socials');
const stickyNav = document.querySelector('.sticky-nav');
const hamburgerBtn = document.getElementById('hamburger');
const originalSocials = document.querySelector('.social-links');
notClicked = true;


function loadPortfolioProjects() {
    fetch('http://localhost:8080/api/v1/projects')
        .then(response => response.json())
        .then(data => {
            displayProjects(data) // Pass the data to our new rendering function
        })
        .catch(error => console.error("Connection failed:", error))
}

function displayProjects(projects) {
    const container = document.getElementById('portfolio');
    let allProjectsHTML = "";

    projects.forEach(project => {

        let tagBuilder = '<div>';
        for (let a = 0; a < project.tags.length; a++) {
            tagBuilder += `<span class="tag">${project.tags[a]}</span>`;
        }
        tagBuilder += '</div>';

        let techDecisionBuilder = '<ul>';
        for (let j = 0; j < project.technicalDecisions.length; j++) {
            techDecisionBuilder += `<li><strong>${project.technicalDecisions[j].header}</strong>
                                            ${project.technicalDecisions[j].content}</li>`;
        }
        techDecisionBuilder += '</ul>';

        let linkBuilder = '';
        for (let i = 0; i < project.links.length; i++) {
            linkBuilder += `<a href="${project.links[i].url}" class="btn" target="_blank" rel="noopener noreferrer">
            <span class="text-desktop">${project.links[i].name}</span> 
            <span class="text-mobile">${project.links[i].shortName}</span> </a>`;
        }

        let cardDir = "";
        if (project.displayOrder % 2 === 0) {
            cardDir = "reverse";
        }

        const projectCard = `
            <div class="card ${cardDir} fade-in">
                <div class="card-content">
                    <h2 class="mini-title">${project.name}</h2>
                    ${tagBuilder}
                    <p><strong>Overview:</strong> ${project.overviewDesc}</p>
                    ${techDecisionBuilder}
                    <div class="button-group">${linkBuilder}</div>
                </div>
                <div class="card-image-wrapper"><img src="${project.imgUrl}" alt="${project.name}"></div>
            </div>
        `;
        allProjectsHTML += projectCard;
    });

    container.insertAdjacentHTML('beforeend', allProjectsHTML);

    const dynamicObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    const newlyAddedProjects = container.querySelectorAll('.fade-in');
    newlyAddedProjects.forEach(projectElement => {
        dynamicObserver.observe(projectElement);
    });
}

loadPortfolioProjects()



window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (originalSocials) {
        const socialBottom = originalSocials.getBoundingClientRect().bottom;

        if (socialBottom < 80) {
            navSocials.classList.add('is-visible');
        } else {
            navSocials.classList.remove('is-visible');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    const hiddenElements = document.querySelectorAll('.fade-in');
    hiddenElements.forEach((el) => observer.observe(el));
});

const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);


faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

window.addEventListener('scroll', () => {
    // If scrolled more than 20 pixels, add the shadow
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

function hamburgerClicked() {
    stickyNav.classList.toggle('is-visible');
}

window.onload = function() {
    hamburgerBtn.addEventListener('click', hamburgerClicked);
};
