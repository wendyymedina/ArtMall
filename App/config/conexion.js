const mongoose = require('mongoose')
const config = require('./configuracion')

//Conexion a MongoDB
 module.exports={
    connection:null,
    connect: ()=>{
        if(this.connection) return this.connection
        return mongoose.connect(config.DB)
        .then(conn =>{
            this.connection = conn
            console.log('La conexion se realizo de manera correcta');
        })
        .catch(e =>{console.log('error en la conexion', e)})
    }
 }