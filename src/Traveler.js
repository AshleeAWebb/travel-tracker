import { travelerData } from "./data/traveler-data";

class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.trips = [];
    this.travelerType = travelerData.travelerType;
  }


  findTravelerTrips(tripData) {
    this.trips = tripData.filter((trip)=> trip.userID === this.id);
  }

  getTravelerById(id) {
    return this.travelers.find((traveler) => traveler.id === id);
  }

  getTravelersByType(type) {
    return this.travelers.filter((traveler) => traveler.travelerType === type);
  }

}
export default Traveler;

