import { travelerData } from "./data/traveler-data";
class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
  }

}

export default Traveler;