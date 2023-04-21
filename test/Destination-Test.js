import chai from 'chai';
const expect = chai.expect;
import Destination from '../src/Destination';
import DestinationManager from '../src/DestinationManager';
import { destinationData } from '../src/data/destination-data';

describe('Destination', function() {
  let destination;

  beforeEach(function() {
    destination = new Destination(destinationData[0]);
  });

  it("should be a function", function () {
    expect(Destination).to.be.a("function");
  });

  it("should be an instance of Destination", function () {
    expect(destination).to.be.an.instanceOf(Destination);
  })

  it('should have a destination ID', function () {
    expect(destination.id).to.equal(1);
  });

  it('should have a destination name', function () {
    expect(destination.destination).to.equal('Lima, Peru');
  });

  it('should have a lodging cost', function () {
    expect(destination.estimatedLodgingCostPerDay).to.equal(70);
  });

  it('should have a flight cost', function () {
    expect(destination.estimatedFlightCostPerPerson).to.equal(400);
  });

  it('should have an image', function () {
    expect(destination.image).to.equal("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
  });

  it('should have alt text', function() {
    expect(destination.alt).to.equal("overview of city buildings with a clear sky");
  });
});

describe('DestinationManager', function() {
  let destinationManager;

  beforeEach(function() {
    destinationManager = new DestinationManager();
  });

  it("should be a function", function () {
    expect(DestinationManager).to.be.a("function");
  });

  it("should be an instance of DestinationManager", function () {
    expect(destinationManager).to.be.an.instanceOf(DestinationManager);
  });

  it('should hold all destinations', function() {
    expect(destinationManager.allDestinations.length).to.equal(8);
  });

  it('should find a destination by the ID', function() {
    const destinationInfo = destinationManager.loadDestinationInfo(1);
    expect(destinationInfo).to.deep.equal({
      "id": 1,
      "destination": "Lima, Peru",
      "estimatedLodgingCostPerDay": 70,
      "estimatedFlightCostPerPerson": 400,
      "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      "alt": "overview of city buildings with a clear sky",
    });
  });

  it('should find a destination ID by name', function() {
    expect(destinationManager.findDestinationByName("Stockholm, Sweden")).to.equal(2);
  });

  it('should calculate the flight cost of a trip', function() {
    expect(destinationManager.findFlightCost(1)).to.equal(400);
  });

  it('should calculate the lodging cost of a trip', function() {
    expect(destinationManager.findLodgingCost(1)).to.equal(70);
  });
});