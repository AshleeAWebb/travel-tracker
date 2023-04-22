// Import data
import { fetchAllData } from './apiCalls';

// Import style and img
import './css/styles.css';
import './images/travel-tracker-login.jpg';

// Import classes
import Traveler from '../src/Traveler';
import Trip from '../src/Trip';
import Destination from '../src/Destination';

const dropdown = document.querySelector('#travel-dropdown'),
  pendingTravel = document.querySelector('#pending-travel'),
  upcomingTravel = document.querySelector('#upcoming-travel'),
  pastTravel = document.querySelector('#past-travel'),
  openModalBtn = document.querySelector('#open-modal-btn'),
  closeModalBtn = document.querySelector('.close'),
  modal = document.querySelector('#modal'),
  welcome = document.getElementById('welcomeTitle'),
  tripDisplay = document.getElementById('travelerTrips'),
  yearlyCostDisplay = document.getElementById('totalSpent');

// Event Listeners

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

let traveler;
let trips;
let tripData;
let destinations;
let destinationData;

function getFetch() {
  fetchAllData()
  .then(data => {
    traveler = new Traveler(data[0]);
    tripData = data[1].trips;
    trips = new Trip(tripData);
    destinationData = data[2].destinations;
    destinations = new Destination(destinationData);
    viewTravelerDashboard();
    displayTotalForYear();
  })
}

    function viewTravelerDashboard() {
      welcome.innerHTML=`Welcome ${traveler.name} to your travel dashboard`
      traveler.findTravelerTrips(tripData)
      tripDisplay.innerHTML = ''
      traveler.trips.forEach(trip => {
        tripDisplay.innerHTML += `<article class="trip">
          <div class="destination-img trip-card"><img class= "trip-image" src="${destinations.image}" alt="${destinations.alt}"></div>
          <p class="trip-destination trip-card"> Destination: ${destinations.destination} </p>
          <p class="trip-date trip-card"> Date: ${trip.date} </p>
          <p class="trip-duration trip-card"> Duration: ${trip.duration} </p>
          <p class="trip-travelers trip-card"> Travelers: ${trip.travelers} </p>
          <p class="trip-status trip-card"> Status: ${trip.status} </p>
        </article>`
      })
    }

    function displayTotalForYear() {
      yearlyCostDisplay.innerHTML += trips.yearlyCost(destinations, traveler)
    }


window.addEventListener('load', () => {
  getFetch()
})

// function show(element) {
//   element.classList.remove('hidden');
// };

// function hide(element) {
//   element.classList.add('hidden');
// };