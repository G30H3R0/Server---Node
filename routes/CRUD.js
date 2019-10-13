var express = require('express');
var router = express.Router();
var pool = require('../DB.js');

router.get('/coordinate/:CRUD/:CoordinateID/:long/:lat/:EntityID', function(req, res){
	var coordinateID = req.params.CoordinateID;
	var long = req.params.long;
	var lat = req.params.lat;
	var entityID = req.params.EntityID;
    var CRUD = req.params.CRUD;
    
    if(coordinateID == 'null') { coordinateID = null;}
    if(long == 'null'){long = null;}
    if(lat == 'null'){lat = null;}
    if(entityID == 'null'){entityID = null;}
    if(CRUD == 'null'){CRUD = null;}

	pool.getConnection(function(err, con) {
        var sql = 'CALL CoordinateCRUD(?,?,?,?,?);';
        console.log(sql);
        try {
            con.query(sql, [coordinateID, long, lat, entityID, CRUD], function(err,rows){
                if (err) {rows = err}
                res.send(rows);
                con.release(); 
            }) 
        } catch(e) {
            console.log(e);
        }
	});
})

router.get('/entityAttributeType/:CRUD/:EntityAttributeTypeID/:Namey/:Description', function(req, res){
    var CRUD = req.params.CRUD;
	var entityAttributeTypeID = req.params.EntityAttributeTypeID;
	var name = req.params.Namey;
	var description = req.params.Description;

	pool.getConnection(function(err, con) {
		var sql = 'CALL EntityAttributeTypeCRUD('+entityAttributeTypeID+','+name+','+description+',"'+CRUD+'")';
        try {
            con.query(sql,function(err,rows){
                if (err) {rows = err}
                res.send(rows);
                con.release(); 
            }); 
        } catch(e) {
            console.log(e);
        }
		
	});
})

router.get('/entityAttribute/:CRUD/:EntityAttributeID/:EntityAttributeTypeID/:KeyID/:AttributeValue', function(req, res){
    var CRUD = req.params.CRUD;
    var entityAttributeID = req.params.EntityAttributeID
	var entityAttributeTypeID = req.params.EntityAttributeTypeID;
	var keyID = req.params.KeyID;
	var attributeValue = req.params.AttributeValue;

	pool.getConnection(function(err, con) {
		var sql = 'CALL EntityAttributeCRUD(?,?,?,?,?);'
        try {
            con.query(sql,[entityAttributeID, entityAttributeTypeID, keyID, attributeValue, CRUD],function(err,rows){
                if (err) {rows = err}
                res.send(rows); 
                con.release(); 
            }); 
        } catch(e) {
            console.log(e); 
        }
		
	});
})

router.get('/entity/:CRUD/:EntityID/:EntityName/:EntityTypeID', function(req, res){
    var CRUD = req.params.CRUD;
	var entityID = req.params.EntityID;
	var entityName = req.params.EntityName;
	var entityTypeID = req.params.EntityTypeID;

	pool.getConnection(function(err, con) {
		var sql = 'CALL EntityCRUD('+entityID+','+entityName+','+entityTypeID+',"'+CRUD+'")';
        try {
            con.query(sql,function(err,rows){
                if (err) {rows = err}
                res.send(rows);
                con.release(); 
            }); 
        } catch(e) {
            console.log(e);
        }
		
	});
})

router.get('/entityType/:CRUD/:EntityTypeID/:EntityTypeName', function(req, res){
    var CRUD = req.params.CRUD;
	var entityTypeID = req.params.EntityTypeID;
	var entityTypeName = req.params.EntityTypeName;

	pool.getConnection(function(err, con) {
		var sql = 'CALL EntityTypeCRUD('+entityTypeID+','+entityTypeName+',"'+CRUD+'")';
        try {
            con.query(sql,function(err,rows){
                if (err) {rows = err}
                res.send(rows); 
                con.release(); 
            }) 
        } catch(e) {
            console.log(e);
        }	
	});
})

module.exports = router; 