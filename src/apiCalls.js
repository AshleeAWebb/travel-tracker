const fetchAPI = (url) => 
  fetch(url)
  .then((res) => {
    if (!res.ok) throw new Error('There seems to be an error!');
    return res.json();
  })
  .catch((error) => console.log(error))


 const fetchAllData = () => {
  return Promise.all([
  fetchAPI(`http://localhost:3001/api/v1/travelers/7`),
  fetchAPI('http://localhost:3001/api/v1/trips'),
  fetchAPI('http://localhost:3001/api/v1/destinations')
  ]);
};
  
// const fetchSingleTraveler = (id) => {
//   return fetch(`http://localhost:3001/api/v1/travelers/${id}`) put this back on 12!
//   .then(res => {
//     if (!res.ok) {
//       throw new Error("Missing or Incorrect Username/Password");
//     } else {
//       return res.json()
//     }
//   })
//   .catch(() => {
//     return false
//   });
// }

// const posttripsData = (data) => {
//   return fetch('http://localhost:3001/api/v1/trips', {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(res => {
//     if (!res.ok) {
//       throw new Error('There seems to be an error!')
//     }
//     return res.json()
//   }).catch(error => console.log(error))
// };

export { fetchAllData };