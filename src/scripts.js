// Import API's
import ApiCalls from '../src/ApiCalls';

// Import styles and images
import './css/styles.css';
import './images/travel-tracker-login.jpg';

// Import classes
import Traveler from '../src/Traveler';
import DataHandler from '../src/DataHandler';

// Query Selectors
const openModalBtn = document.getElementById('open-modal-btn'),
      closeModalBtn = document.querySelector('.close'),
      modal = document.getElementById('modal'),
      welcome = document.getElementById('welcomeTitle'),
      tripDisplay = document.getElementById('travelerTrips'),
      yearlyCostDisplay = document.getElementById('totalSpent');

// Global Variables
let traveler;
const apiCalls = new ApiCalls(),
      dataHandler = new DataHandler();



// Event Listeners
window.addEventListener('load', () => {
  getFetch(9)
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

// Functions
const displayUserInfo = (user) => {
  welcome.innerText = `Hello, ${user.name}! Get ready to chase the sunset with Horizon's Edge.`;
  yearlyCostDisplay.innerText = `Spent this year $${user.getYearlySpent()}`;
}

const displayTravelCards = () => {
  const travelerTrips = traveler.getTravelerTrips();
  tripDisplay.innerHTML = '';
  if (travelerTrips.length === 0) {
    tripDisplay.innerHTML = '<h3>No trips found</h3>';
  } else {
    travelerTrips.forEach(data =>  {
      tripDisplay.innerHTML +=
        `<div class="card" value="${data.id}">
          <img class="card" src="${data.destination.image}" alt="${data.destination.alt}">
          <div>${data.destination.destination}</div>
          <div>$${data.calculateTripCost()}</div>
          <div>${data.duration} days</div>
          <div>${data.travelers} travelers</div>
          <div>${data.date}</div>
          <div>${data.timeFrame}</div>
          <div>${data.status}</div>
        </div>`
    });
  }
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
      return traveler.getTravelerTrips();
    })
    .then(() => {
      displayUserInfo(traveler);
      displayTravelCards();
    })
    .catch(error => {
      console.error(error);
    });
};

