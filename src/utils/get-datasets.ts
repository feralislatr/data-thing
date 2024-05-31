import { DataSet, Resource } from '@/types/dataSet';

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
        data.result.results.filter((dataSet: DataSet) =>
          dataSet?.resources.find((item: Resource) => item.format === 'JSON'),
        ),
      )
      .catch(err => console.log(err))
  );
}
