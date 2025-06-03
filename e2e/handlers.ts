import {
  http,
  HttpResponse,
  passthrough,
} from 'next/experimental/testmode/playwright/msw';
import catalog from './data/catalog.json';
import astra_catalog from './data/astra_catalog.json';
import lottery_powerball_data from './data/lottery_powerball_winning_numbers.json';
const dbUrl = `${process.env.ASTRA_DB_API_ENDPOINT}/api/json/v1/default_keyspace`;

const handlers = [
  // get catalog
  http.get('*/catalog.data.gov/*', () => {
    return HttpResponse.json(catalog);
  }),
  // get dataset_catalog collection
  http.get(
    `${dbUrl}/dataset_catalog`,
    () => {
      return HttpResponse.text(JSON.stringify([astra_catalog[1]]));
    },
  ),
  http.post(`${dbUrl}*`, async ({ request }) => {
    const res = await request.json();
    const body = JSON.stringify(res)
    if (request.url.includes('lottery_powerball_winning_numbers')) {
      // data ends up returning as json anyway
      return HttpResponse.json({
        data: {
          documents: lottery_powerball_data,
        },
      });
    } else if (typeof body === 'string' && body.includes('createCollection')) {
      return HttpResponse.json({
        status: {
          ok: 1,
        },
      })
    } if (typeof body === 'string' && body.includes('findCollections')) {
      // db.listCollections calls this endpoint with explain: false
      if (body.includes('false')) {
        return HttpResponse.json({
          "status": {
            "collections": [
              "dataset_catalog",
              "lottery_powerball_winning_numbers"
            ]
          }
        })
      } else {
        return HttpResponse.json({
          "status": {
            "collections": [
              {
                "name": "dataset_catalog",
                "options": {
                  "vector": {
                    "dimension": 1024,
                    "metric": "cosine",
                    "sourceModel": "other",
                    "service": {
                      "provider": "nvidia",
                      "modelName": "NV-Embed-QA"
                    }
                  },
                }
              },
              {
                "name": "lottery_powerball_winning_numbers",
                "options": {
                  "lexical": {
                    "enabled": true,
                    "analyzer": "standard"
                  },
                }
              },
            ]
          }
        })

      }
    }
    else if (typeof body === 'string' && body.includes('insertMany')) {
      return HttpResponse.json({
        status: {
          ok: 1,
        },
      });
    }
    // find lottery_powerball_winning_numbers in catalog
    else if (typeof body === 'string' && body.includes('findOne')) {
      return HttpResponse.json({
        "data": {
          "document": {
            "id": "12345",
            "name": "lottery-powerball-winning-numb",
            "title": "Lottery Powerball Winning Numbers",
            "description": "Winning numbers for the Powerball lottery game in New York.",
            "metadata_modified_date": "2024-06-21T13:45:01.436784",
            "maintainer": "Open Data NY",
            "orgTitle": "State of New York",
            "category": "Government & Finance",
            "downloadUrl": "https://data.ny.gov/api/views/d6yy-54nr/rows.csv?accessType=DOWNLOAD",
            "columns": [
              { "field": "winning_numbers", "headerName": "Winning Numbers" },
              { "field": "draw_date", "headerName": "Draw Date" },
              { "field": "jackpot_amount", "headerName": "Jackpot Amount" }
            ]
          }
        }
      })
    }
    else if (typeof body === 'string' && body.includes('insertOne')) {
      return HttpResponse.json({
        insertedIds: ['f9880479-bf5c-477c-ba8e-0651a0e054a5'],
      });
      // update dataset_catalog record with columns
    }
    else if (typeof body === 'string' && body.includes('updateOne')) {
      return HttpResponse.json({
        "updateOne": {
          "filter": {
            "name": "lottery_powerball_winning_numbers"
          },
          "update": {
            "$set": {
              "columns": [
                {
                  "field": "draw_date",
                  "headerName": "Draw Date"
                },
                {
                  "field": "winning_numbers",
                  "headerName": "Winning Numbers"
                },
                {
                  "field": "multiplier",
                  "headerName": "Multiplier"
                }
              ]
            }
          }
        }
      }
      );
    }
    else {
      return passthrough()
    }
  }),
]

export default handlers;