const axios = require('axios');

axios.get('https://api.grid-nigeria.org/health-facilities/')
     .then((res)=>{
        console.log(JSON.stringify(res.data['features'].sort(), undefined, 2));
     })