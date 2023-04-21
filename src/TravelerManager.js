import Traveler from '../src/Traveler.js';
class TravelManager {
  constructor() {
    this.travelers = [];
  }

  loadTravelerInfo(travelerData) {
    this.travelers = travelerData.map((travelerInfo) => new Traveler(travelerInfo));
  }

  getTravelerById(id) {
    return this.travelers.find((traveler) => traveler.id === id);
  }

  getTravelersByType(type) {
    return this.travelers.filter((traveler) => traveler.travelerType === type);
  }

}

export default TravelManager;