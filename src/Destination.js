import { destinationData } from "./data/destination-data";

class Destination {
  constructor(destinationData) {
    this.id = destinationData.id;
    this.destination = destinationData.destination;
    this.estimatedLodgingCostPerDay = destinationData.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = destinationData.estimatedFlightCostPerPerson;
    this.image = destinationData.image;
    this.alt = destinationData.alt;
    this.allDestinations = [];
  }

  loadDestinations(destinationData) {
    this.allDestinations = destinationData.map((destinationObj) => new Destination(destinationObj));
  }
  findDestObject(destinationID) {
    return this.allDestinations.find(destination => destination.id === destinationID)
  }

  findFlightCost(destinationID) {
    const destination = this.findDestObject(destinationID)
    return destination.estimatedFlightCostPerPerson
  }

  findLodgingCost(destinationID) {
    const destination = this.findDestObject(destinationID)
    return destination.estimatedLodgingCostPerDay
  }

  findDestByName(name) {
    return this.allDestinations.find((destination) => {
			return destination.destination === name;
		}).id
  }
}

export default Destination;