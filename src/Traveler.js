class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.travelers = [];
  }
  
  loadTravelerInfo(travelerData) {
    this.travelers = travelerData.map((travelerInfo) => new Traveler(travelerInfo));
  }
  
}

export default Traveler;