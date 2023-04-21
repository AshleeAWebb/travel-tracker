import chai from 'chai';
import { travelerData } from '../src/data/traveler-data';
import Traveler from '../src/Traveler';

const expect = chai.expect;

describe('Traveler', () => {
  let traveler;
  let travelData;

  beforeEach(() => {
    travelData = travelerData;
    traveler = new Traveler(travelData[0]);
  });

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