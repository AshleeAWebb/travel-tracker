class Traveler {
  constructor(travelerData, travelManager) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.travelManager = travelManager;
  }
}

export default Traveler;