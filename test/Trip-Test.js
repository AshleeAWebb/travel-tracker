import chai from 'chai';
const expect = chai.expect;
import DataHandler from '../src/DataHandler';
import Trip from '../src/Trip';
import testData from '../src/data/testData';

describe('Trip', function() {
  let dataHandler;
  let trip1;
  let trip2;

  beforeEach(function() {
    dataHandler = new DataHandler();
    dataHandler.setData('destinations', testData.testDestinationData);
    trip1 = new Trip(testData.testTripData[0], dataHandler);
    trip2 = new Trip(testData.testTripData[1], dataHandler);
  });

  it('should be a function', function() {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of Trip', function() {
    expect(trip1).to.be.an.instanceOf(Trip);
  });

  it('should store the basic trip data', function() {
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

  it('should figure out if the trip has already past', function() {
    trip2.getTripTimeFrame();
    expect(trip2.timeFrame).to.equal('past');
  });

  it('should get the destination information', function() {
    expect(trip1.destination).to.deep.equal(testData.testDestinationData[0]);
    expect(trip2.destination).to.deep.equal(testData.testDestinationData[1]);
  });

  it('should calculate how much a trip costs', function() {
    expect(trip1.calculateTripCost()).to.equal(1056);
    expect(trip2.calculateTripCost()).to.equal(6270);
  });
});