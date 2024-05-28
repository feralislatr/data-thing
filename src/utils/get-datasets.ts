export default async function getDataSets() {
  return (
    fetch('/catalog/api/3/action/package_search', {
      method: 'GET',
      headers: {
        'X-Api-Key': 'DEMO_KEY',
      },
    })
      .then(res => res.json())
      // filter for JSON dataSets for now
      .then(data =>
        data.result.results.filter(dataSet =>
          dataSet?.resources.find(item => item.format === 'JSON'),
        ),
      )
      .catch(err => console.log(err))
  );
}
