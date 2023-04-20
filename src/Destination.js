import { destinationData } from "./data/destination-data";
class Destination {
  constructor(destinationData) {
    this.id = destinationData.id;
    this.destination = destinationData.destination;
    this.estimatedLodgingCostPerDay = destinationData.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = destinationData.estimatedFlightCostPerPerson;
    this.image = {
      url: destinationData.image,
      alt: destinationData.alt
   }

 }

}
export default Destination;