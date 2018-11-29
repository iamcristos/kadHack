const mongo = require('mongodb').MongoClient;
const fetch = require('node-fetch');


// const url = 'mongodb://node:node12@ds119734.mlab.com:19734/node'

const url ='mongodb://kad:123kaduna@ds241493.mlab.com:41493/kaduna_hack'


mongo.connect(url, (err, client) => {

    if (err) {
        console.error(err)
        return
    }

    const db = client.db('kaduna_hack');
const collection = db.collection('kaduna');

let apiUrl = 'https://api.grid-nigeria.org/health-facilities/';

fetch(apiUrl)
.then(function(response){
    return response.json();
})
.then(function(json) {
        let datas = json.features;

    let received = datas.map((data) => {

      let { name, functional_status,lga_code, lga_name, state_code, state_name } = data.properties

            if ( state_name = 'Kaduna') {
               jsonResult = {
                  'name':name,
                  'functional_status' :functional_status,
                 'lga_code': lga_code,
                 'lga_name': lga_name,
                 'state_code': state_code,
                 'state_name': state_name
               } 
    
                return jsonResult;
            }
            else {
                console.log('error');
            }
        
        });

    // storing to db
    collection.insertMany(received, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    })

});

})