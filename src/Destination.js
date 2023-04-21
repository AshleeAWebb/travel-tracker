class Destination {
  constructor(destinationData) {
    this.id = destinationData.id;
    this.destination = destinationData.destination;
    this.estimatedLodgingCostPerDay = destinationData.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = destinationData.estimatedFlightCostPerPerson;
    this.image = destinationData.image;
    this.alt = destinationData.alt;
  }

  findDestObject(destinationID) {
    return this.allDestinations.find(destination => destination.id === destinationID);
  }

  findFlightCost(destinationID) {
    const destination = this.findDestObject(destinationID);
    return destination.estimatedFlightCostPerPerson;
  }

  findLodgingCost(destinationID) {
    const destination = this.findDestObject(destinationID);
    return destination.estimatedLodgingCostPerDay;
  }

  findDestByName(name) {
    return this.allDestinations.find(destination => destination.destination === name).id;
  }
}

export default Destination;