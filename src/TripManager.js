import Trip from './Trip';
import { tripData } from './data/trip-data';
import DestinationManager from './DestinationManager';

class TripManager {
  constructor(destinationManager) {
    this.trips = [];
    this.destinationManager = destinationManager;
    this.loadTripInfo(tripData);
  }

  loadTripInfo(tripData) {
    this.trips = tripData.map((tripInfo) => new Trip(tripInfo));
  }

  tripsByTraveler(traveler) {
    return this.trips.filter(trip => trip.userID === traveler.id);
  }

  yearlyCost(destinationManager, traveler) {
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    const trips = this.tripsByTraveler(traveler).filter(trip => new Date(trip.date) >= oneYearAgo);
    const totalCost = trips.reduce((acc, trip) => acc + trip.costPerTrip(destinationManager.getDestinationById(trip.destinationID)), 0);
    return Math.round(totalCost);
  }
}


export default TripManager;