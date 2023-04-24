// Import API's
import ApiCalls from '../src/ApiCalls';

// Import styles and images
import './css/styles.css';
import './images/travel-tracker-login.jpg';
import { generateDonutChart } from '../src/charts';
import { Chart } from 'chart.js/auto';

// Import classes
import Traveler from '../src/Traveler';
import DataHandler from '../src/DataHandler';
import Trip from '../src/Trip';

// Query Selectors
const openModalBtn = document.getElementById('open-modal-btn'),
      closeModalBtn = document.querySelector('.close'),
      modal = document.getElementById('modal'),
      welcome = document.getElementById('welcomeTitle'),
      tripDisplay = document.getElementById('travelerTrips'),
      yearlyCostDisplay = document.getElementById('totalSpent'),
      tripForm = document.getElementById('trip-form'),
      tripRequestLocation = document.getElementById('pendingTrips'),
      loginButton = document.getElementById("login-button"),
      loginPage = document.getElementById("login-page");
      

// Global Variables
let traveler;
const apiCalls = new ApiCalls(),
      dataHandler = new DataHandler(),
      pendingTripData = {};


// Event Listeners
window.addEventListener('load', () => {
  getFetch(8)
});

openModalBtn.addEventListener('click', function () {
  modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', function () {
  modal.style.display = 'none';
});

modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

tripForm.addEventListener('submit', function(event) {
  event.preventDefault();

  handleTripSelection(event);

  modal.style.display = 'none'; 
  tripForm.reset(); 
});

loginButton.addEventListener("click", function() {
  loginPage.classList.toggle("hidden");
});
  
// Functions
const displayUserInfo = (user) => {
  welcome.innerHTML = `<h4>Hello, ${user.name}! Get ready to chase the sunset with Horizon's Edge.</h4>`;
  yearlyCostDisplay.innerText = `Spent this year $${user.getYearlySpent()}`;
};

const populateDestinationsDropdown = (destinations) => {
  const destinationSelect = document.getElementById('destination');
  destinations.sort((a, b) => a.destination.localeCompare(b.destination));
  destinations.forEach(destination => {
    const option = document.createElement('option');
    option.value = destination.id;
    option.text = destination.destination;
    destinationSelect.add(option);
  });
};

const displayTravelCards = () => {
  const travelerTrips = traveler.getTravelerTrips();
  tripDisplay.innerHTML = '';
  if (travelerTrips.length === 0) {
    tripDisplay.innerHTML = '<h3>No trips found</h3>';
  } else {
    travelerTrips.forEach(data =>  {
      const tripDate = new Date(data.date);
      const formattedDate = tripDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      tripDisplay.innerHTML +=
        `<div class="card" value="${data.id}">
          <img class="card" src="${data.destination.image}" alt="${data.destination.alt}">
          <div>${data.destination.destination}</div>
          <div>$${data.calculateTripCost()}</div>
          <div>${data.duration} days</div>
          <div>${data.travelers} travelers</div>
          <div>${formattedDate}</div>
          <div>${data.timeFrame}</div>
          <div>${data.status}</div>
        </div>`
    });
  }
};

const formatDate = (date) => {
  const formattedDate = date.replaceAll('-', '/');
  return formattedDate;
};

const handleTripSelection = (event) => {
  event.preventDefault();

  const destinationSelect = document.getElementById('destination');
  const tripSelectTravelers = document.getElementById('travelers');
  const tripSelectDate = document.getElementById('date');
  const tripSelectDuration = document.getElementById('duration');

  if (tripSelectDuration.value < 1) {
    alert('Please enter a valid trip duration');
    return;
  }

  if (tripSelectTravelers.value < 1) {
    alert('Please enter a valid number of travelers');
    return;
  }

  const today = new Date();
  const selectedDate = new Date(tripSelectDate.value);

  if (selectedDate < today) {
    alert('Please select a future date');
    return;
  }

  const pendingTripData = {
    id: dataHandler.allTrips.length + 1,
    userID: traveler.id,
    destinationID: parseInt(destinationSelect.value),
    travelers: tripSelectTravelers.value,
    date: formatDate(tripSelectDate.value),
    duration: tripSelectDuration.value,
    status: 'pending', 
    suggestedActivities: []
  };

  updateDashboard(pendingTripData, tripRequestLocation);
};


const updateDashboard = (tripData, tripRequestLocation) => {
  const trip = new Trip(tripData, dataHandler);
  const tripCard = document.createElement('div');
  tripCard.classList.add('card');
  tripCard.setAttribute('value', trip.id);
  tripCard.innerHTML = `
    <img class="card" src="${trip.destination.image}" alt="${trip.destination.alt}">
    <div class="trip-details">
      <div>${trip.destination.destination}</div>
      <div>Estimated Cost $${trip.calculateTripCost()}</div>
      <div>${trip.duration} days</div>
      <div>${trip.travelers} travelers</div>
      <div>${trip.date}</div>
    </div>
    <div class="action-buttons">
      <button class="confirm-button">Book</button>
      <button class="decline-button">Cancel</button>
    </div>
  `;
  tripRequestLocation.appendChild(tripCard);

  const confirmButton = tripCard.querySelector('.confirm-button');
  const declineButton = tripCard.querySelector('.decline-button');
  confirmButton.addEventListener('click', () => {
    apiCalls.postTripsData('trips', tripData)
      .then(() => {
        dataHandler.allTrips.push(tripData);
        tripData.id = dataHandler.allTrips.length + 1;
        trip.status = 'pending';
        tripCard.querySelector('.trip-details').innerHTML += '<div>pending</div>';
        
  
        yearlyCostDisplay.innerText = `Spent this year $${traveler.getYearlySpent()}`;
        tripCard.querySelector('.action-buttons').remove();
        tripCard.querySelector('.trip-details div:nth-child(2)').innerHTML = `$${trip.calculateTripCost()}`;
      })
      .catch(error => {
        console.error('Error booking trip:', error);
      });
  });
  declineButton.addEventListener('click', () => {
    tripCard.remove();
  });
};

const getFetch = (userID) => {
  apiCalls.fetchAllData('trips')
    .then(tripsData => {
      dataHandler.setData('allTrips', tripsData.trips);
      return apiCalls.fetchSingleTraveler('travelers', `${userID}`);
    })
    .then(travelerData => {
      traveler = new Traveler(dataHandler, travelerData);
      return apiCalls.fetchAllData('destinations');
    })
    .then(destinationsData => {
      dataHandler.setData('destinations', destinationsData.destinations);
      populateDestinationsDropdown(destinationsData.destinations);
      return traveler.getTravelerTrips();
    })
    .then(() => {
      displayUserInfo(traveler);
      displayTravelCards();

      const totalSpent = traveler.getYearlySpent();
      const amountSpent = totalSpent / 1.1;
      const commission = totalSpent - amountSpent;

      generateDonutChart(traveler);
    })
    .catch(error => {
      console.error(error);
    });
};