import chai from 'chai';
import { travelerData } from '../src/data/traveler-data';
import Traveler from '../src/Traveler';
import TravelManager from '../src/TravelerManager';

const expect = chai.expect;

describe('Traveler', () => {
  const traveler = new Traveler(travelerData[0]);

  it('should be a function', () => {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it('should store the traveler data', () => {
    expect(traveler.id).to.equal(1);
    expect(traveler.name).to.equal('Ham Leadbeater');
    expect(traveler.travelerType).to.equal('relaxer');
  });
});

describe('TravelManager', () => {
  const travelManager = new TravelManager();

  beforeEach(() => {
    travelManager.loadTravelerInfo(travelerData);
  });

  describe('loadTravelerInfo', () => {
    it('should create Traveler instances from travelData', () => {
      expect(travelManager.travelers).to.have.lengthOf(8);
      expect(travelManager.travelers[0].name).to.equal('Ham Leadbeater');
      expect(travelManager.travelers[1].id).to.equal(2);
    });
  });

  describe('getTravelerById', () => {
    it('should return the correct traveler by ID', () => {
      const traveler = travelManager.getTravelerById(3);
      expect(traveler.name).to.equal('Sibby Dawidowitsch');
      expect(traveler.travelerType).to.equal('shopper');
    });

    it('should return undefined if no traveler is found', () => {
      const traveler = travelManager.getTravelerById(9);
      expect(traveler).to.be.undefined;
    });
  });

  describe('getTravelersByType', () => {
    it('should return an array of travelers with the given type', () => {
      const shoppers = travelManager.getTravelersByType('shopper');
      expect(shoppers).to.have.lengthOf(2);
      expect(shoppers[0].name).to.equal('Sibby Dawidowitsch');
      expect(shoppers[1].name).to.equal('Laverna Flawith');
    });

    it('should return an empty array if no travelers are found', () => {
      const adventurers = travelManager.getTravelersByType('adventurer');
      expect(adventurers).to.be.an('array').that.is.empty;
    });
  });
});