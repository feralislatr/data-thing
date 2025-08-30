import { HttpResponse, http, passthrough } from 'next/experimental/testmode/playwright/msw'

import astra_catalog from './data/astra_catalog.json'
import catalog from './data/catalog.json'
import lottery_powerball_data from './data/lottery_powerball_winning_numbers.json'

const dbUrl = `${process.env.ASTRA_DB_API_ENDPOINT}/api/json/v1/default_keyspace`

const handlers = [
  // get catalog
  http.get('*/catalog.data.gov/*', () => {
    return HttpResponse.json(catalog)
  }),
  // get dataset_catalog collection
  http.get(`${dbUrl}/dataset_catalog`, () => {
    return HttpResponse.text(JSON.stringify([astra_catalog[1]]))
  }),
  http.post(`${dbUrl}*`, async ({ request }) => {
    const res = await request.json()
    const body = JSON.stringify(res)
    // find dataset_catalog collection with empty body
    if (request.url.includes('dataset_catalog')) {
      // find lottery_powerball_winning_numbers in catalog
      if (typeof body === 'string' && body.includes('findOne')) {
        return HttpResponse.json({
          data: {
            document: astra_catalog[0],
          },
        })
      } else {
        return HttpResponse.text(JSON.stringify([astra_catalog[0]]))
      }
    } else if (request.url.includes('lottery_powerball_winning_numbers')) {
      return HttpResponse.json({
        data: {
          documents: lottery_powerball_data,
        },
      })
    } else if (typeof body === 'string' && body.includes('createCollection')) {
      return HttpResponse.json({
        status: {
          ok: 1,
        },
      })
    }
    if (typeof body === 'string' && body.includes('findCollections')) {
      // db.listCollections calls this endpoint with explain: false
      if (body.includes('false')) {
        return HttpResponse.json({
          status: {
            collections: ['dataset_catalog', 'lottery_powerball_winning_numbers'],
          },
        })
      } else {
        return HttpResponse.json({
          status: {
            collections: [
              {
                name: 'dataset_catalog',
                options: {
                  vector: {
                    dimension: 1024,
                    metric: 'cosine',
                    sourceModel: 'other',
                    service: {
                      provider: 'nvidia',
                      modelName: 'NV-Embed-QA',
                    },
                  },
                },
              },
              {
                name: 'lottery_powerball_winning_numbers',
                options: {
                  lexical: {
                    enabled: true,
                    analyzer: 'standard',
                  },
                },
              },
            ],
          },
        })
      }
    } else if (typeof body === 'string' && body.includes('insertMany')) {
      return HttpResponse.json({
        status: {
          ok: 1,
        },
      })
    } else if (typeof body === 'string' && body.includes('insertOne')) {
      return HttpResponse.json({
        insertedIds: ['f9880479-bf5c-477c-ba8e-0651a0e054a5'],
      })
      // update dataset_catalog record with columns
    } else if (typeof body === 'string' && body.includes('updateOne')) {
      return HttpResponse.json({
        updateOne: {
          filter: {
            name: 'lottery_powerball_winning_numbers',
          },
          update: {
            $set: {
              columns: [
                {
                  field: 'draw_date',
                  headerName: 'Draw Date',
                },
                {
                  field: 'winning_numbers',
                  headerName: 'Winning Numbers',
                },
                {
                  field: 'multiplier',
                  headerName: 'Multiplier',
                },
              ],
            },
          },
        },
      })
    } else {
      return passthrough()
    }
  }),
]

export default handlers
