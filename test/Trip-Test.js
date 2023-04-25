import chai from 'chai';
import DataHandler from '../src/DataHandler';
import Trip from '../src/Trip';
import testData from '../src/data/testData';

const expect = chai.expect;

describe('Trip', () => {
  let dataHandler,
    trip1,
    trip2;

  beforeEach(() => {
    dataHandler = new DataHandler();
    dataHandler.setData('destinations', testData.testDestinationData);

    [trip1, trip2] = testData.testTripData.map((trip) => new Trip(trip, dataHandler));
  });

  it('should be a function',() => {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', () => {
    expect(trip1).to.be.an.instanceOf(Trip);
  });

  it('should store the basic trip data', () => {
    expect(trip1.id).to.equal(1);
    expect(trip1.travelers).to.equal(1);
    expect(trip1.date).to.equal('2023/09/16');
    expect(trip1.duration).to.equal(8);
    expect(trip1.status).to.equal('approved');
    expect(trip2.id).to.equal(2);
    expect(trip2.travelers).to.equal(5);
    expect(trip2.date).to.equal('2021/10/04');
    expect(trip2.duration).to.equal(18);
    expect(trip2.status).to.equal('approved');
  });

  it('should figure out if the trip has already past', () => {
    trip2.getTripTimeFrame();
    expect(trip2.timeFrame).to.equal('past');
  });

  it('should get the destination information', () => {
    expect(trip1.destination).to.deep.equal(testData.testDestinationData[0]);
    expect(trip2.destination).to.deep.equal(testData.testDestinationData[1]);
  });

  it('should calculate how much a trip costs', () => {
    expect(trip1.calculateTripCost()).to.equal(616);
    expect(trip2.calculateTripCost()).to.equal(1980);
  });
});