import chai from 'chai';
import DataHandler from '../src/DataHandler';
import testData from '../src/data/testData';

const expect = chai.expect;

describe('Data HandDataHandler',() => {
  let dataHandler;

  beforeEach(() => {
    dataHandler = new DataHandler;
  });

  it('should be a function',() => {
    expect(DataHandler).to.be.a('function');
  });

  it('should be an instance of data handler',() => {
    expect(dataHandler).to.be.instanceOf(DataHandler);
  });

  it('should start with no trip data',() => {
    expect(dataHandler.allTrips).to.be.null;
  });

  it('should set data into the correct place',() => {
    expect(dataHandler.allTrips).to.be.null;
    dataHandler.setData('allTrips', testData.testTripData);
    expect(dataHandler.allTrips).to.deep.equal(testData.testTripData);
  });


  it('should return specific data by ID',() => {
    dataHandler.setData('allTrips', testData.testTripData);
    expect(dataHandler.getDataByID('allTrips', 'id', 1)).to.deep.equal([testData.testTripData[0]]);
    expect(dataHandler.getDataByID('allTrips', 'userID', 1)).to.deep.equal([testData.testTripData[0], testData.testTripData[2], testData.testTripData[4]]);
    expect(dataHandler.getDataByID('allTrips', 'destinationID', 1)).to.deep.equal([testData.testTripData[0]]);
  });
  
  it('should return a list of all destination names',() => {
    dataHandler.setData('destinations', testData.testDestinationData);
    expect(dataHandler.getDestinationInfo()).to.deep.equal([{
      name: 'Lima, Peru',
      id: 1
    }, 
    {
      name: 'Stockholm, Sweden',
      id: 2
    },
    {
      name: 'Sydney, Austrailia',
      id: 3
    },
    {
      name: 'Cartagena, Colombia',
      id: 4
    }, 
    {
      name: 'Madrid, Spain',
      id: 5
    },]);
  });
});