export default async function getData(url: string) {
  return fetch(url, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}
