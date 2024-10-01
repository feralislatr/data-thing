'use server';
/** Download dataset from given resource url */
export default async function getData(url: string | null) {
  if (!url) return null;
  return fetch(url, {
    method: 'GET',
    cache: 'no-store',
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}
