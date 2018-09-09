
CouchDb url
http://COUCH_IP:5984/_utils/

to create index through ui
http://COUCH_IP:5984/_utils/#/database/{dbname}/_index
example: http://192.168.56.101:5984/_utils/#/database/composerchannel/_index

you can create index like below
{
  "index": {
    "fields": [
       {
        "data.commodity": "desc"
       },
       {
        "data.timestamp": "desc"
       }
    ]
  },
  "type": "json"
}