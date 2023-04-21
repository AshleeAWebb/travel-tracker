import Destination from "./Destination";
import { tripData } from "./data/trip-data";

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

  tripDataLoad(tripData) {
    this.trips = tripData.map((tripInfo) => { return new Trip(tripInfo) });
  }
  
    tripsByTraveler(traveler) {
      const tripRows = this.trips.reduce((arr, trip) => {
        if (trip.userID === traveler.id) {
          arr.push(trip);
        }
        console.log(`trip.userID: ${trip.userID}, traveler.id: ${traveler.id}`);
        return arr;
      }, [])
      return tripRows
    }
    yearlyCost(destination, traveler) {
      const travelerTrips = this.tripsByTraveler(traveler);
      const tripsByYear = travelerTrips.filter(trip => trip.date.includes('2022') && trip.status === "approved");
      const totalCostOfTripsAnnually = tripsByYear.reduce((num, trip) => {
        num += this.costPerTrip(destination);
        return num;
      }, 0);
      return Math.round(totalCostOfTripsAnnually);
    }

    costPerTrip(destination) {
      const totalLodgingCost = destination.lodgingCost * this.duration * this.travelers;
      const totalFlightCost = destination.flightCost * this.travelers;
      return Math.round((totalLodgingCost + totalFlightCost) * 1.1);
    }
}

export default Trip;