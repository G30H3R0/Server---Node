var express = require('express');
var router = express.Router();
var pool = require('../DB.js');

router.get('/entityDetail', function(req, res){
	pool.getConnection(function(err, con) {
		var sql = 'SELECT e.EntityID, e.EntityName, et.EntityTypeID, et.EntityTypeName ' +
					'FROM Entities e ' +
					'JOIN EntityTypes et ON e.EntityTypeID = et.EntityTypeID ' +
					'ORDER BY et.EntityTypeName, e.EntityName;';
		con.query(sql,function(err,rows){
			if (err) {console.log(err); throw err; }
			res.send(rows);
			con.release();
		})	
	});

})

router.get('/coordinateDetail', function(req, res){
	pool.getConnection(function(err, con) {
		var sql = 'SELECT c.CoordinateID, c.Longitude, c.Latitude, e.EntityName, et.EntityTypeName, ea.AttributeValue, eat.Name, eat.Description ' +
		'FROM Coordinates c ' +
		'JOIN Entities e ON c.EntityID = e.EntityID ' +
		'JOIN EntityTypes et ON e.EntityTypeID = et.EntityTypeID ' +
		'LEFT JOIN EntityAttribute ea ON ea.KeyID = c.CoordinateID ' +
		'LEFT JOIN EntityAttributeType eat ON ea.EntityAttributeTypeID = eat.EntityAttributeTypeID ' +
		'ORDER BY et.EntityTypeID, e.EntityID, eat.EntityAttributeTypeID, ea.EntityAttributeID';
		con.query(sql,function(err,rows){
			if (err) {console.log(err); throw err; }
			res.send(rows);
			con.release();
		})
	});

})

router.get('/entitiesClose/:long/:lat', function(req, res){
	var long = req.params.long;
	var lat = req.params.lat;

	pool.getConnection(function(err, con) {
		con.query('CALL CoordinatesGetCloseEntities('+long+','+lat+');',function(err,rows){
			if (err) {console.log(err); throw err; }
			res.send(rows[0]);
			con.release();
		})	
	});
})

setInterval(function() {
	pool.getConnection(function(err,con){
		con.query('CALL CoordinatesUpdMovingEntities()', function(err,rows){
			if (err) console.log(err); throw err;
			con.release();
		})	
	});

}, 3600000);

module.exports = router; 