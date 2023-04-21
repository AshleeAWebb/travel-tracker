import chai from 'chai';
import { travelerData } from '../src/data/traveler-data';
import Traveler from '../src/Traveler';
import TravelManager from '../src/TravelerManager';

const assert = chai.assert;

describe('Traveler', () => {
  const traveler = new Traveler(travelerData[0]);

  it('should be a function', () => {
    assert.isFunction(Traveler);
  });

  it('should be an instance of Traveler', () => {
    assert.instanceOf(traveler, Traveler);
  });

  it('should store the traveler data', () => {
    assert.strictEqual(traveler.id, 1);
    assert.strictEqual(traveler.name, 'Ham Leadbeater');
    assert.strictEqual(traveler.travelerType, 'relaxer');
  });
});

describe('TravelManager', () => {
  const travelManager = new TravelManager();

  beforeEach(() => {
    travelManager.loadTravelerInfo(travelerData);
  });

  describe('loadTravelerInfo', () => {
    it('should create Traveler instances from travelData', () => {
      assert.lengthOf(travelManager.travelers, 8);
      assert.strictEqual(travelManager.travelers[0].name, 'Ham Leadbeater');
      assert.strictEqual(travelManager.travelers[1].id, 2);
    });
  });

  describe('getTravelerById', () => {
    it('should return the correct traveler by ID', () => {
      const traveler = travelManager.getTravelerById(3);
      assert.strictEqual(traveler.name, 'Sibby Dawidowitsch');
      assert.strictEqual(traveler.travelerType, 'shopper');
    });

    it('should return undefined if no traveler is found', () => {
      const traveler = travelManager.getTravelerById(9);
      assert.isUndefined(traveler);
    });
  });

  describe('getTravelersByType', () => {
    it('should return an array of travelers with the given type', () => {
      const shoppers = travelManager.getTravelersByType('shopper');
      assert.lengthOf(shoppers, 2);
      assert.strictEqual(shoppers[0].name, 'Sibby Dawidowitsch');
      assert.strictEqual(shoppers[1].name, 'Laverna Flawith');
    });

    it('should return an empty array if no travelers are found', () => {
      const adventurers = travelManager.getTravelersByType('adventurer');
      assert.isEmpty(adventurers);
    });
  });
});
