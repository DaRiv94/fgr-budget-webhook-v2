require('dotenv').config()

let configObject={}
if(process.env.DATABASE_URL){
    connection_string_to_parse = process.env.DATABASE_URL
    var regex = new RegExp('[:/@?]')
    const connection_string_array_to_parse = connection_string_to_parse.split(regex);
    let connectionstring_array = connection_string_array_to_parse.slice(3)

    configObject['DB_USERNAME'] = connectionstring_array[0]
    configObject['DB_PASSWORD'] = connectionstring_array[1]
    configObject['DB_HOST'] = connectionstring_array[2]
    configObject['DB_PORT'] = connectionstring_array[3]
    configObject['DB'] = connectionstring_array[4]

    console.log("configObject.DB_USERNAME " + configObject.DB_USERNAME)
console.log("configObject.DB_PASSWORD " + configObject.DB_PASSWORD)
console.log("configObject.DB " + configObject.DB)
console.log("configObject.DB_HOST " + configObject.DB_HOST)
console.log("configObject.DB_PORT " + configObject.DB_PORT)
}


module.exports = {
    development: {
        username: configObject.DB_USERNAME,
        password: configObject.DB_PASSWORD,
        database: configObject.DB,
        host: configObject.DB_HOST,
        port: configObject.DB_PORT,
        dialect: 'postgres'
    },
    sandbox: {
        username: configObject.DB_USERNAME,
        password: configObject.DB_PASSWORD,
        database: configObject.DB,
        host: configObject.DB_HOST,
        port: configObject.DB_PORT,
        dialect: 'postgres',
        ssl:true,
        dialectOptions:{
           ssl:{
              require:true
           }
        }
    }
  };


//   "ssl":true,
//   "dialectOptions":{
//      "ssl":{
//         "require":true
//      }