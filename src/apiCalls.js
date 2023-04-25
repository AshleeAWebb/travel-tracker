export default class ApiCalls {
  baseURL = 'http://localhost:3001/api/v1/';

  fetchAllData(url) {
    return fetch(`${this.baseURL}${url}`)
      .then(res => res.json());
  }

  fetchSingleTraveler(url, id) {
    return fetch(`${this.baseURL}${url}/${id}`)
      .then(res => res.json());
  }

  postTripsData(url, data) {
    return fetch(`${this.baseURL}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Whoa, wipeout! Something went wrong. Hang ten and try again later.');
        }
        return res.json();
      })
      .catch(error => console.log(error));
  }
}