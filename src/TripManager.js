import Trip from './Trip';
import { tripData } from './data/trip-data';

class TripManager {
  constructor() {
    this.trips = [];
    this.loadTripInfo(tripData);
  }

  loadTripInfo(tripData) {
    this.trips = tripData.map((tripInfo) => new Trip(tripInfo));
  }

  costPerTrip(trip, destination) {
    const totalLodgingCost = destination.lodgingCost * trip.duration * trip.travelers;
    const totalFlightCost = destination.flightCost * trip.travelers;
    return Math.round((totalLodgingCost + totalFlightCost) * 1.1);
  }

  tripsByTraveler(traveler) {
    return this.trips.filter((trip) => trip.id === traveler.id);
  }

  yearlyCost(destination, traveler, year) {
    const travelerTrips = this.tripsByTraveler(traveler);
    const tripsByYear = travelerTrips.filter(trip => trip.date.includes(year) && trip.status === "approved");
    const totalCostOfTripsAnnually = tripsByYear.reduce((num, trip) => {
      num += this.costPerTrip(trip, destination);
      return num;
    }, 0);
    return Math.round(totalCostOfTripsAnnually);
  }

}

export default TripManager;