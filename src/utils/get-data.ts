/** Download dataset from given resource url */
export default async function getData(url: URL | null) {
  if (!url) return null;
  return fetch(url, {
    method: 'GET',
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}
