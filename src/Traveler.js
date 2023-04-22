import Trip from "./Trip";

export default class Traveler {
  constructor(dataHandler, travelerData) {
    this.dataHandler = dataHandler;
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.type = travelerData.travelerType;
    this.trips = null;
  }

  getTravelerTrips() {
    const trips = this.dataHandler.getDataByID('allTrips', 'userID', this.id) || [];
    this.trips = trips.map(trip => new Trip(trip, this.dataHandler));
    return this.trips;
  }

  filterTrips(tripProperty, filterCriteria) {
    return this.trips.filter(trip => trip[tripProperty] === filterCriteria);
  }

  getYearlySpent() {
    const tripsByDate = this.trips.slice().sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    const mostRecentYear = new Date(tripsByDate[0].date).getFullYear();
    const totalCost = tripsByDate.reduce((total, trip) => {
      const tripYear = new Date(trip.date).getFullYear();
      if (tripYear === mostRecentYear) {
        return total + trip.calculateTripCost();
      }
      return total;
    }, 0);
    const commission = totalCost * 0.1;
    const displayTotal = (commission + totalCost).toFixed(2);
    return displayTotal;
  };
};
