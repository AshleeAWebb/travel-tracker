import Destination from "./Destination";
class Trip {
  constructor(tripData) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
    this.trips = [];
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
    const tripsByYear = travelerTrips.filter(trip => trip.date && trip.status === "approved");
    const totalCostOfTripsAnnually = tripsByYear.reduce((num, trip) => {
      num += this.costPerTrip(trip, destination);
      return num;
    }, 0);
    return Math.round(totalCostOfTripsAnnually);
  }

}
export default Trip;