/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main backend file
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var mysql   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//var datos=require('./datos.json');
var conexionMysql=require('./mysql-connector');



//=======[ Main module code ]==================================================

app.get('/dispositivos/', function(req, res, next) {
    

    let SQL='select *from Devices';
    conexionMysql.query(SQL,function(err,respuesta){

        if(err)
        {
            res.send(err).status(400);
            return;
        }
        res.send(respuesta);
    });



});

//dispositivos/2 
app.get('/dispositivos/:id', function(req, res, next) {
    
    let SQL='select *from Devices where id=?';
    conexionMysql.query(SQL,[req.params.id],function(err,respuesta){

        if(err)
        {
            res.send(err).status(400);
            return;
        }
        res.send(respuesta);
    });


});

app.post('/editar_dispositivos/', function(req, res, next) {
 
    let SQL='Update Devices set state=? where id=?';
    conexionMysql.query(SQL,[req.body.state,req.body.id],function(err,respuesta){

        if(err)
        {
            res.send(err).status(400);
            return;
        }
        res.send("Se actualizo correctaente: "+JSON.stringify(respuesta)).status(200);
    });

});

app.post('/nuevo_dispositivo/', function(req, res, next) {
 
    let SQL='INSERT INTO Devices(name,description,state,type) VALUES(?,?,?,?)';
    conexionMysql.query(SQL,[req.body.name,req.body.description,req.body.state,req.body.type],function(err,respuesta){

        if(err)
        {
            res.send(err).status(400);
            return;
        }
        res.send("Se registro correctamente: "+JSON.stringify(respuesta)).status(200);
    });

    
});

app.post('/eliminar_dispositivo/', function(req, res, next) {
 
    let SQL='DELETE FROM Devices WHERE id=?';
    conexionMysql.query(SQL,[req.body.id],function(err,respuesta){

        if(err)
        {
            res.send(err).status(400);
            return;
        }
        res.send("Se elimino el registro correctamente: "+JSON.stringify(respuesta)).status(200);
    });

    
});



app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly ");
});

//=======[ End of file ]=======================================================
