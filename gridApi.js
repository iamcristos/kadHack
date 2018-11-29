const axios = require("axios")

let url = "https://api.grid-nigeria.org/"

const getDatasets = (resource_name, size = 200, page = 1, sort_by = "global_id", fields = "", cql = "") => {
    const endpoint = `${url}${resource_name}`
    axios.get(endpoint, {
        params: {
            size: size,
            page: page,
            sort_by: sort_by,
            fields: fields,
            cql: cql
        }
    }).then(response => {
        let result= response.data
    
        let data1 = JSON.stringify(result, undefined, 3)

        console.log(typeof data1.features);
    })
}

module.exports.getDatasets = getDatasets