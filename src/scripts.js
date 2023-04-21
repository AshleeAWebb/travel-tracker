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
  modal = document.querySelector('#modal');



if (dropdown.value === 'pending') {
  pendingTravel.style.display = 'block';
} else if (dropdown.value === 'upcoming') {
  upcomingTravel.style.display = 'block';
} else if (dropdown.value === 'past') {
  pastTravel.style.display = 'block';
}

dropdown.addEventListener('change', function () {
  if (dropdown.value === 'pending') {
    pendingTravel.style.display = 'block';
    upcomingTravel.style.display = 'none';
    pastTravel.style.display = 'none';
  } else if (dropdown.value === 'upcoming') {
    pendingTravel.style.display = 'none';
    upcomingTravel.style.display = 'block';
    pastTravel.style.display = 'none';
  } else if (dropdown.value === 'past') {
    pendingTravel.style.display = 'none';
    upcomingTravel.style.display = 'none';
    pastTravel.style.display = 'block';
  }
});



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
    trips = new Trip(tripData)
    destinationData = data[2].destinations;
    destinations = new Destination(destinationData)
    viewTravelerDashboard()
  })
}

function viewTravelerDashboard() {
  traveler.findTravelerTrips(tripData)
  console.log(traveler)
}

// getFetch()
// function show(element) {
//   element.classList.remove('hidden');
// };

// function hide(element) {
//   element.classList.add('hidden');
// };

window.addEventListener('load', () => {
  getFetch()
})