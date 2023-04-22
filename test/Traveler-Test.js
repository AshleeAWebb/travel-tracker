import chai from 'chai';
const expect = chai.expect;
import testData from '../src/data/testData';
import DataHandler from '../src/DataHandler';
import Traveler from '../src/Traveler';
import Trip from '../src/Trip';

describe('Traveler', function() {
  let dataHandler;
  let traveler1;
  let traveler2;
  let trip1;
  let trip2;
  let trip3; 
  let trip4;
  let trip5;

  beforeEach(function() {
    dataHandler = new DataHandler();
    dataHandler.setData('allTrips', testData.testTripData);
    dataHandler.setData('destinations', testData.testDestinationData);
    traveler1 = new Traveler(dataHandler, testData.testTravelerData[0]);
    traveler2 = new Traveler(dataHandler, testData.testTravelerData[1]);
    trip1 = new Trip(testData.testTripData[0], dataHandler);
    trip2 = new Trip(testData.testTripData[1], dataHandler);
    trip3 = new Trip(testData.testTripData[2], dataHandler);
    trip4 = new Trip(testData.testTripData[3], dataHandler);
    trip5 = new Trip(testData.testTripData[4], dataHandler);
  });

  it('should be a function', function() {
    expect(typeof Traveler).to.equal('function');
  });

  it('should be instance of Traveler', function() {
    expect(traveler1).to.be.an.instanceOf(Traveler);
  });

  it('should have reference to a data handler', function() {
    expect(traveler1.dataHandler).to.deep.equal(dataHandler);
  });

  it('should store traveler data', function() {
    expect(traveler1.id).to.equal(1);
    expect(traveler1.name).to.equal('Ham Leadbeater');
    expect(traveler1.type).to.equal('relaxer');
    expect(traveler2.id).to.equal(2);
    expect(traveler2.name).to.equal('Rachael Vaughten');
    expect(traveler2.type).to.equal('thrill-seeker');
  });

  it('should store all of its trips', function() {
    traveler1.getTravelerTrips();
    expect(traveler1.trips).to.deep.equal([trip1, trip3, trip5]);
    traveler2.getTravelerTrips();
    expect(traveler2.trips).to.deep.equal([trip2, trip4]);
  });

  it('should filter out all of its past trips', function() {
    traveler1.getTravelerTrips();
    traveler2.getTravelerTrips();
    expect(traveler1.filterTrips('timeFrame', 'past')).to.deep.equal([trip3]);
    expect(traveler2.filterTrips('timeFrame', 'past')).to.deep.equal([trip2]);
  });

  it('should filter out all of its upcoming trips', function() {
    traveler1.getTravelerTrips();
    traveler2.getTravelerTrips();
    expect(traveler1.filterTrips('timeFrame', 'upcoming')).to.deep.equal([trip1, trip5]);
    expect(traveler2.filterTrips('timeFrame', 'upcoming')).to.deep.equal([trip4]);
  });

  it('should filter out pending trips', function() {
    traveler1.getTravelerTrips();
    traveler2.getTravelerTrips();
    expect(traveler1.filterTrips('status', 'pending')).to.deep.equal([trip5]);
  });

  it('should get the total amount of money that has been spent on trips this year', function() {
    traveler2.getTravelerTrips();
    expect(traveler2.getYearlySpent()).to.deep.equal(1633.5);
  });
});


