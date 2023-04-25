import Trip from "./Trip";

export default class Traveler {
  constructor(dataHandler, travelerData) {
    this.dataHandler = dataHandler;
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.type = travelerData.travelerType;
    this.trips = null;
  };

  getTravelerTrips() {
    if (!this.trips) {
      const trips = this.dataHandler.getDataByID('allTrips', 'userID', this.id) || [];
      this.trips = trips.map(trip => new Trip(trip, this.dataHandler));
    };
    return this.trips;
  };

  filterTrips(tripProperty, filterCriteria) {
    return this.trips.filter(trip => trip[tripProperty] === filterCriteria);
  };

  getYearlySpent() {
    const tripsByYear = this.getTravelerTrips().reduce((acc, trip) => {
      const year = new Date(trip.date).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      };
      acc[year].push(trip);
      return acc;
    }, {});
    const keys = Object.keys(tripsByYear);
    const mostRecentYear = keys.reduce((maxYear, year) => {
      return Math.max(maxYear, parseInt(year));
    }, 0);
    const tripsThisYear = tripsByYear[mostRecentYear] || [];
    const totalCost = tripsThisYear.reduce((total, trip) => total + trip.calculateTripCost(), 0);
    const commission = totalCost * 0.1;
    const displayTotal = (commission + totalCost).toFixed(2);
    return displayTotal;
  };
};
