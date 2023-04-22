import chai from 'chai';
const expect = chai.expect;
import DataHandler from '../src/DataHandler';
import testData from '../src/data/testData';

describe('Data HandDataHandler', function() {
  let dataHandler;

  beforeEach(function() {
    dataHandler = new DataHandler;
  });

  it('should be a function', function() {
    expect(DataHandler).to.be.a('function');
  });

  it('should be an instance of data handler', function() {
    expect(dataHandler).to.be.instanceOf(DataHandler);
  });

  it('should start with no trip data', function() {
    expect(dataHandler.trips).to.be.null;
  });

  it('should set data into the correct place', function() {
    expect(dataHandler.trips).to.be.null;
    dataHandler.setData('trips', testData.testTripData);
    expect(dataHandler.trips).to.deep.equal(testData.testTripData);
  });


  it('should return specific data by ID', function() {
    dataHandler.setData('trips', testData.testTripData);
    expect(dataHandler.getDataByID('trips', 'id', 1)).to.deep.equal([testData.testTripData[0]]);
    expect(dataHandler.getDataByID('trips', 'userID', 1)).to.deep.equal([testData.testTripData[0], testData.testTripData[2], testData.testTripData[4]]);
    expect(dataHandler.getDataByID('trips', 'destinationID', 1)).to.deep.equal([testData.testTripData[0]]);
  });
  
  it('should return a list of all destination names', function() {
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