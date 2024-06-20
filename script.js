const darkbtn = document.querySelector('#flexSwitchCheckChecked')
const body = document.getElementsByTagName('body')[0]
const nav = document.getElementsByTagName('nav')[0]
const inputs = Array.from(document.getElementsByTagName('input'))
const jobcontainer = document.querySelector('.jobcontainer')
const BASE_URL = 'http://localhost:5000';


const enableDark = () => {
    sessionStorage.setItem('darkmode', true)
    body.style.backgroundColor = '#121721';
    nav.style.backgroundColor = 'rgb(14 41 12)';
    inputs.forEach(i => {
        i.style.backgroundColor = 'rgb(14, 41, 12)'
        i.style.color = 'white'
    });
    const jobcards = Array.from(document.querySelectorAll('.jobcard'))
    const jobtitles = Array.from(document.querySelectorAll('.jobtitle'))
    jobcards.forEach(i => {
        i.style.backgroundColor = 'rgb(14, 41, 12)'
    });
    jobtitles.forEach(i => {
        i.style.color = "rgb(18 136 51 / 94%)"
    });
}

const enableLight = () => {
    sessionStorage.setItem('darkmode', false)
    nav.style.backgroundColor = 'white';
    body.style.backgroundColor = 'rgb(243, 243, 243)';
    inputs.forEach(i => {
        i.style.backgroundColor = 'white'
        i.style.color = 'black'
    });
    const jobcards = Array.from(document.querySelectorAll('.jobcard'))
    const jobtitles = Array.from(document.querySelectorAll('.jobtitle'))
    jobcards.forEach(i => {
        i.style.backgroundColor = 'white'
    });
    jobtitles.forEach(i => {
        i.style.color = "rgb(106 248 146 / 94%)"
    });
}

darkbtn.addEventListener('change', (evt) => {
    if (evt.target.checked) {
        enableDark();
    }
    else {
        enableLight()
    }
})


const getjobs = async () => {
    const response = await fetch(`${BASE_URL}/post-jobs`);
    const data = await response.json();
    return await data;
}

const createjobcards = (jobs) => {
    jobs.forEach((item) => {
        const jobCard = document.createElement('div');
        jobCard.className = 'jobcard';
        jobCard.innerHTML =
            `<div class="joblogo"><img src="../../assets/plumber-logo.png" alt=""></div>
        <div class="time">
            <h3 style="font-weight: 500;">${item.posttime}</h3>
            <h3 style="font-weight: 500;">${item.jobtype}</h3>
        </div>
        <h2 class="jobtitle" style="font-size: 35px; font-weight: 700; margin-bottom:10px;">${item.jobtitle}</h2>
        <h3 class="company" style="font-weight: 500;">${item.company}</h3>
        <h4 class="state" style="font-weight: 600;">${item.state}</h4>`;

        jobcontainer.appendChild(jobCard);
        jobCard.addEventListener('click',()=>{
            window.open('./job-details/index.html','_parent')
            sessionStorage.setItem('job_id',item.id)
        })
    });
    //if dark mode already enabled
    if (darkbtn.checked) {
        const jobcards = document.querySelectorAll('.jobcard');
        const jobtitles = document.querySelectorAll('.jobtitle');
        jobcards.forEach(i => {
            i.style.backgroundColor = 'rgb(14, 41, 12)';
        });
        jobtitles.forEach(i => {
            i.style.color = 'rgb(18 136 51 / 94%)';
        });
    }
}

addEventListener("load", async () => {
    const jobs = await getjobs();
    createjobcards(jobs);
    if (sessionStorage.getItem('darkmode') === 'true') {
        darkbtn.checked = true;
        enableDark()
    }
    else {
        darkbtn.checked = false;
        enableLight()
    }
})


const jobs = [
    { title: 'Construction Worker', location: 'Mumbai, India', type: 'Full Time', salary: '₹20,000 - ₹40,000' },
    { title: 'Electrician', location: 'Bangalore, India', type: 'Part Time', salary: '₹15,000 - ₹25,000' },
    { title: 'Home Maid', location: 'Mumbai, India', type: 'Full Time', salary: '₹12,000 - ₹20,000' },
];

const categories = [
    { name: 'Construction', available: 123 },
    { name: 'Electrical', available: 67 },
    { name: 'Plumbing', available: 98 },
    { name: 'Painting', available: 45 },
    { name: 'Gardening', available: 50 },
    { name: 'House Keeping', available: 77 },
    { name: 'HVAC', available: 89 },
    { name: 'Interior Designing', available: 29 },
];

function displayJobs() {
    const jobCards = document.getElementById('job-cards');
    jobCards.innerHTML = '';

    jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');
        
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.location}</p>
            <p>${job.type}</p>
            <p>${job.salary}</p>
            <button class="apply-button">Apply Now</button>
        `;

        jobCards.appendChild(jobCard);
    });
}

function displayCategories() {
    const categoryCards = document.getElementById('category-cards');
    categoryCards.innerHTML = '';

    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.classList.add('category-card');
        
        categoryCard.innerHTML = `
            <h3>${category.name}</h3>
            <p>${category.available} Available</p>
        `;

        categoryCards.appendChild(categoryCard);
    });
}

function filterByType(type) {
    const filteredJobs = jobs.filter(job => job.type === type || type === 'Featured');
    const jobCards = document.getElementById('job-cards');
    jobCards.innerHTML = '';

    filteredJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');
        
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.location}</p>
            <p>${job.type}</p>
            <p>${job.salary}</p>
            <button class="apply-button">Apply Now</button>
        `;

        jobCards.appendChild(jobCard);
    });
}

function filterJobs() {
    const title = document.getElementById('job-title').value.toLowerCase();
    const location = document.getElementById('location').value.toLowerCase();

    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(title) && 
        job.location.toLowerCase().includes(location)
    );

    const jobCards = document.getElementById('job-cards');
    jobCards.innerHTML = '';

    filteredJobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');
        
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.location}</p>
            <p>${job.type}</p>
            <p>${job.salary}</p>
            <button class="apply-button">Apply Now</button>
        `;

        jobCards.appendChild(jobCard);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayJobs();
    displayCategories();
});
