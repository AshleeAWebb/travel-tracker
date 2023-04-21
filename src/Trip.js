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
  }

  costPerTrip(destination) {
    if (!destination || !destination.estimatedLodging || !destination.estimatedFlight) {
      return 0;
    }
    const totalLodgingCost = destination.estimatedLodging * this.duration * this.travelers;
    const totalFlightCost = destination.estimatedFlight * this.travelers;
    return Math.round((totalLodgingCost + totalFlightCost) * 1.1);
  }
}

export default Trip;