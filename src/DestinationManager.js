import Destination from '../src/Destination';
import { destinationData } from './data/destination-data';

class DestinationManager {
  constructor() {
    this.allDestinations = destinationData.map((destinationInfo) => new Destination(destinationInfo));
  }

  loadDestinationInfo(destinationID) {
    return this.allDestinations.find(destination => destination.id === destinationID);
  }

  findFlightCost(destinationID) {
    const destination = this.loadDestinationInfo(destinationID);
    return destination.estimatedFlightCostPerPerson;
  }

  findLodgingCost(destinationID) {
    const destination = this.loadDestinationInfo(destinationID);
    return destination.estimatedLodgingCostPerDay;
  }

  findDestinationByName(name) {
    return this.allDestinations.find(destination => destination.destination === name).id;
  }
}

export default DestinationManager;