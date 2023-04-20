// Import data
import { fetchAllData } from './apiCalls';
import { fetchSingleTraveler } from '.apiCalls';
import { posttripsData } from './apiCalls';

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
