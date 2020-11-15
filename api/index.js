var express=require('express');
var app=express();


app.get('/',function(req,res){

    res.send("Hola mundo desde express");

});

app.listen(3211,function(req,res){

  console.log("La API se levanto en el puerto 3211");
});