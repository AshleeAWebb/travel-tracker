import Destination from '../src/Destination';

class DestinationManager {
  constructor(destinationData) {
    this.allDestinations = []
  }

  loadDestinations(destinationData) {
    this.allDestinations = destinationData.map((destinationInfo) => new Destination(destinationInfo));
  }
  
  loadDestinationInfo(destinationID) {
    return this.allDestinations.find(destination => destination.id === destinationID);
  }

  findFlightCost(destinationID) {
    const destination = this.loadDestinationInfo(destinationID);
    return destination.estimatedFlight;
  }

  findLodgingCost(destinationID) {
    const destination = this.loadDestinationInfo(destinationID);
    return destination.estimatedLodging;
  }

  findDestinationByName(name) {
    return this.allDestinations.find(destination => destination.destination === name).id;
  }
}

export default DestinationManager;