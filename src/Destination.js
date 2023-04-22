class Destination {
  constructor(destinationData) {
    this.id = destinationData.id;
    this.destination = destinationData.destination;
    this.estimatedLodging = destinationData.estimatedLodgingCostPerDay;
    this.estimatedFlight = destinationData.estimatedFlightCostPerPerson;
    this.image = destinationData.image;
    this.alt = destinationData.alt;
  }

  findDestinationTrips(destinationID) {
    this.destinations = destinationID.find((destination) => destination.id === this.id);
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
    return destination.find(destination => destination.destination === name).id;
  }
}

export default Destination;