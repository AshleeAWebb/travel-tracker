import chai from 'chai';
import testData from '../src/data/testData';
import DataHandler from '../src/DataHandler';
import Traveler from '../src/Traveler';
import Trip from '../src/Trip';

const expect = chai.expect;

describe('Traveler', function() {
  let dataHandler,
      traveler1,
      traveler2,
      trip1,
      trip2,
      trip3, 
      trip4,
      trip5;

  beforeEach(function() {
    dataHandler = new DataHandler();
    dataHandler.setData('allTrips', testData.testTripData);
    dataHandler.setData('destinations', testData.testDestinationData);

    [traveler1, traveler2] = testData.testTravelerData.map((traveler) => new Traveler(dataHandler, traveler));
    [trip1, trip2, trip3, trip4, trip5] = testData.testTripData.map((trip) => new Trip(trip, dataHandler));
  });

  it('should be a function', () => {
    expect(typeof Traveler).to.equal('function');
  });

  it('should be instance of Traveler', () => {
    expect(traveler1).to.be.an.instanceOf(Traveler);
  });

  it('should have reference to a data handler', () => {
    expect(traveler1.dataHandler).to.deep.equal(dataHandler);
  });

  it('should store traveler data', () => {
    expect(traveler1.id).to.equal(1);
    expect(traveler1.name).to.equal('Ham Leadbeater');
    expect(traveler1.type).to.equal('relaxer');
    expect(traveler2.id).to.equal(2);
    expect(traveler2.name).to.equal('Rachael Vaughten');
    expect(traveler2.type).to.equal('thrill-seeker');
  });

  it('should store all of its trips', () => {
    traveler1.getTravelerTrips();
    expect(traveler1.trips).to.deep.equal([trip1, trip3, trip5]);
    traveler2.getTravelerTrips();
    expect(traveler2.trips).to.deep.equal([trip2, trip4]);
  });

  it('should filter out all of its past trips', () => {
    traveler1.getTravelerTrips();
    traveler2.getTravelerTrips();
    expect(traveler1.filterTrips('timeFrame', 'past')).to.deep.equal([trip3]);
    expect(traveler2.filterTrips('timeFrame', 'past')).to.deep.equal([trip2]);
  });

  it('should filter out all of its upcoming trips', () => {
    traveler1.getTravelerTrips();
    traveler2.getTravelerTrips();
    expect(traveler1.filterTrips('timeFrame', 'upcoming')).to.deep.equal([trip1, trip5]);
    expect(traveler2.filterTrips('timeFrame', 'upcoming')).to.deep.equal([trip4]);
  });

  it('should filter out pending trips', () => {
    traveler1.getTravelerTrips();
    traveler2.getTravelerTrips();
    expect(traveler1.filterTrips('status', 'pending')).to.deep.equal([trip5]);
  });

  it('should get the total amount of money that has been spent on trips this year', () => {
    traveler2.getTravelerTrips();
    expect(traveler2.getYearlySpent()).to.deep.equal('786.50');
  });
});


