import chai from 'chai';
const expect = chai.expect;
import { tripData } from '../src/data/trip-data';
import { destinationData } from '../src/data/destination-data';
import { travelerData } from '../src/data/traveler-data'
import Trip from '../src/Trip';
import Traveler from '../src/Traveler';
import Destination from '../src/Destination';

describe('Trip', function() {
  let destination;
  let trip;
  let traveler;

  beforeEach(() => {
    destination = new Destination(destinationData[0]);
    trip = new Trip(tripData[0]);
    traveler = new Traveler(travelerData[0]);
  });

  it.skip("should be a function", function () {
    expect(Trip).to.be.a("function");
  });

  it.skip("should hold instances of trip", function () {
    expect(trip).to.be.an.instanceof(Trip)
  });

  it.skip('should have a user ID', function () {
    expect(trip.userID).to.equal(1);
  });

  it.skip('should have a trip ID', function () {
    expect(trip.id).to.equal(117);
  });

  it.skip('should have a destination ID', function () {
    expect(trip.destinationID).to.equal(28);
  });

  it.skip('should have a traveler quantity', function () {
    expect(trip.travelers).to.equal(3);
  });

  it.skip('should have a trip date', function () {
    expect(trip.date).to.equal('2022/01/09');
  });

  it.skip('should have a trip duration', function () {
    expect(trip.duration).to.equal(15);
  });

  it.skip('should have a trip status', function () {
    expect(trip.status).to.equal('approved');
  });

  it.skip('should have a suggested activities array', function () {
    expect(trip.suggestedActivities).to.deep.equal([]);
  });

  it.skip("should calculate the total cost of a trip", function () {
    expect(trip.costPerTrip(destination)).to.equal(6435)
  });

  it.skip("should find trips by traveler ID", function () {
    expect(trip.tripsOfTravelers(traveler)).to.deep.equal([
         {
          "id": 1,
          "userID": 44,
          "destinationID": 49,
          "travelers": 1,
          "date": "2022/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        }
      ]);
  });

  it.skip("should calculate the total cost of annual trips for a user", function () {
    expect(trip.travelCostByYear(destination, traveler)).to.equal()
  });

})