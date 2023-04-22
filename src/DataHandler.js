export default class DataHandler {
  constructor() {
    this.allTrips = null;
    this.destinations = null;
  };

  setData(dataSet, data) {
    this[dataSet] = data;
  };

  getDataByID(dataSet, idType, IDNumber) {
    return this[dataSet].filter(data => data[idType] === IDNumber);
  };

  getDestinationInfo() {
    return this.destinations.reduce((list, destination) => {
      list.push({
        name: destination.destination,
        id: destination.id
      });
      return list;
    }, []);
  };

};