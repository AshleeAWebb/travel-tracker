export default class ApiCalls {
  constructor() {

  }


fetchAllData(url) {
  return fetch(`http://localhost:3001/api/v1/${url}`)
    .then(res => res.json());
}

fetchSingleTraveler(url, id) {
  return fetch(`http://localhost:3001/api/v1/${url}/${id}`)
    .then(res => res.json());
}

posttripsData(url, data) {
  return fetch(`http://localhost:3001/api/v1/${url}`, {
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
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

}