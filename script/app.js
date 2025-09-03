// Survey data
const surveys = [
    {
        id: 1,
        title: "Customer Satisfaction",
        description: "Tell us about your experience with our products and services.",
        icon: "fas fa-coffee",
        questions: 10,
        time: 5,
        color: "linear-gradient(45deg, #3a0ca3, #4361ee)"
    },
    {
        id: 2,
        title: "Product Feedback",
        description: "We'd love your input on our new product lineup.",
        icon: "fas fa-shopping-bag",
        questions: 8,
        time: 4,
        color: "linear-gradient(45deg, #7209b7, #b5179e)"
    },
    {
        id: 3,
        title: "Website Experience",
        description: "How can we improve your experience on our website?",
        icon: "fas fa-laptop",
        questions: 12,
        time: 7,
        color: "linear-gradient(45deg, #f72585, #b5179e)"
    }
];

// Chart data for survey results
const chartData = {
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Unsatisfied', 'Very Unsatisfied'],
    datasets: [{
        label: 'Customer Satisfaction',
        data: [45, 30, 15, 7, 3],
        backgroundColor: [
            '#4cc9f0',
            '#4361ee',
            '#7209b7',
            '#f9c74f',
            '#f94144'
        ],
        borderWidth: 0
    }]
};

// Chart options
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                font: {
                    size: 14
                },
                padding: 20
            }
        },
        title: {
            display: true,
            text: 'Customer Satisfaction Survey Results',
            font: {
                size: 18
            },
            padding: 20
        }
    }
};

// DOM Elements
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const surveyGrid = document.getElementById('survey-grid');
const surveyForm = document.getElementById('survey-form');
const resultsChart = document.getElementById('surveyChart');
const createSurveyBtn = document.getElementById('create-survey-btn');
const downloadResultsBtn = document.getElementById('download-results');
const toast = document.getElementById('toast');

// Initialize the application
function init() {
    setupEventListeners();
    renderSurveys();
    initChart();
}

// Set up event listeners
function setupEventListeners() {
    // Mobile navigation toggle
    hamburger.addEventListener('click', toggleMobileNav);
    
    // Survey form submission
    surveyForm.addEventListener('submit', handleFormSubmit);
    
    // Create survey button
    createSurveyBtn.addEventListener('click', () => {
        showToast('Survey creation feature coming soon!');
    });
    
    // Download results button
    downloadResultsBtn.addEventListener('click', () => {
        showToast('Results downloaded successfully!');
    });
    
    // Close toast when clicked
    toast.addEventListener('click', () => {
        hideToast();
    });
}

// Toggle mobile navigation
function toggleMobileNav() {
    nav.classList.toggle('active');
    if (nav.classList.contains('active')) {
        hamburger.innerHTML = '<i class="fas fa-times"></i>';
        hamburger.setAttribute('aria-expanded', 'true');
    } else {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        hamburger.setAttribute('aria-expanded', 'false');
    }
}

// Render surveys to the grid
function renderSurveys() {
    surveyGrid.innerHTML = '';
    
    surveys.forEach(survey => {
        const surveyCard = document.createElement('div');
        surveyCard.className = 'survey-card';
        surveyCard.innerHTML = `
            <div class="survey-image" style="background: ${survey.color}">
                <i class="${survey.icon}"></i>
            </div>
            <div class="survey-content">
                <h3>${survey.title}</h3>
                <p>${survey.description}</p>
                <button class="take-survey" data-id="${survey.id}">Take Survey</button>
                <div class="survey-meta">
                    <span><i class="far fa-question-circle"></i> ${survey.questions} questions</span>
                    <span><i class="far fa-clock"></i> ${survey.time} min</span>
                </div>
            </div>
        `;
        
        surveyGrid.appendChild(surveyCard);
    });
    
    // Add event listeners to survey buttons
    document.querySelectorAll('.take-survey').forEach(button => {
        button.addEventListener('click', (e) => {
            const surveyId = e.target.getAttribute('data-id');
            takeSurvey(surveyId);
        });
    });
}

// Handle survey form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Simple form validation
    const usageSelected = document.querySelector('input[name="usage"]:checked');
    const satisfactionSelected = document.getElementById('satisfaction').value;
    
    let isValid = true;
    
    if (!usageSelected) {
        document.getElementById('usage-error').textContent = 'Please select an option';
        isValid = false;
    } else {
        document.getElementById('usage-error').textContent = '';
    }
    
    if (!satisfactionSelected) {
        document.getElementById('satisfaction-error').textContent = 'Please select an option';
        isValid = false;
    } else {
        document.getElementById('satisfaction-error').textContent = '';
    }
    
    if (isValid) {
        // Simulate form submission
        const submitButton = document.getElementById('submit-survey');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showToast('Survey submitted successfully! Thank you for your feedback.');
            surveyForm.reset();
            submitButton.innerHTML = 'Submit Survey';
            submitButton.disabled = false;
        }, 1500);
    }
}

// Initialize chart
function initChart() {
    const ctx = resultsChart.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: chartOptions
    });
}

// Take survey function
function takeSurvey(id) {
    const survey = surveys.find(s => s.id == id);
    if (survey) {
        showToast(`Starting "${survey.title}" survey...`);
        // Scroll to survey form
        document.querySelector('.form-container').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Show toast notification
function showToast(message) {
    const toastMessage = toast.querySelector('.toast-message');
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        hideToast();
    }, 3000);
}

// Hide toast notification
function hideToast() {
    toast.classList.remove('show');
}

// Adjust survey cards for responsive design
function adjustSurveyCards() {
    const surveyCards = document.querySelectorAll('.survey-card');
    const screenWidth = window.innerWidth;
    
    if (screenWidth < 768) {
        surveyCards.forEach(card => {
            card.style.marginBottom = '1rem';
        });
    } else {
        surveyCards.forEach(card => {
            card.style.marginBottom = '';
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Adjust elements on window resize
window.addEventListener('resize', adjustSurveyCards);