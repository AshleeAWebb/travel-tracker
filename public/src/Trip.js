export default class Trip {
  constructor(tripData, dataManager) {
    this.dataManager = dataManager;
    this.id = tripData.id;
    this.destination = this.getDestinationInfo(tripData.destinationID);
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.timeFrame = this.getTripTimeFrame();
  }

  convertDates() {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const tripDate = new Date(this.date).setHours(0, 0, 0, 0);
    return { currentDate, tripDate };
  }

  getTripTimeFrame() {
    const convertedDates = this.convertDates();
    return convertedDates.tripDate === convertedDates.currentDate 
      ? 'current' 
      : (convertedDates.tripDate <= convertedDates.currentDate ? 'past' : 'upcoming');
  }

  getDestinationInfo(destinationID) {
    return this.dataManager.getDataByID('destinations', 'id', destinationID)[0];
  };

  calculateTripCost() {
    const totalBeforeFee = 
    (this.destination.estimatedLodgingCostPerDay * this.duration); 
    + 
    (this.destination.estimatedFlightCostPerPerson * this.travelers);
    const travelAgentFee = totalBeforeFee * 0.1;
    return totalBeforeFee + travelAgentFee;
  };
};