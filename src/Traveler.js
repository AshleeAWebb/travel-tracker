class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.travelers = [];
  }
}

function loadTravelerInfo(travelerData) {
  this.travelers = travelerData.map((travelerInfo) => new Traveler(travelerInfo));
}

const travelers = [];

export default Traveler;