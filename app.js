var express = require ('express');
var http = require ('http');
var app = express();
var bodyParser = require('body-parser')
var crypto = require('crypto');
app.set('port',2000);
app.set("view engine", "jade");

var arrayglobal = {};





app.use(bodyParser.json({ type: 'application/*+json' }));

app.get("/login",function (req,res, next){
	var token = req.query.token;
	var objO = arrayglobal[token];
	res.send(objO);
});

app.put("/sumar",function (req,res, next){
	console.log(req.query)
	console.log(req.body)
	var token = req.query.token;
	var flag = true;
	var index = 0;

	var objO = arrayglobal[token];

	if (objO !== undefined) {
		objO.cont++;
		res.send(objO);
	} else {
		res.send({status: 'no existe'});
	}
});

app.post("/login", function (req,res, next){
	
var randomToken = crypto.randomBytes(5).toString('hex');

	var objI = {
		name : req.query.name,
		token:  randomToken,
		cont: 0
	};
	
	arrayglobal[randomToken] = objI;
	res.send(objI);


});

app.get("/stats",function (req,res, next){
	

	var token = req.query.token;
	var objO = arrayglobal[token];

	var objRes = {total: 0};


 	for (var key in arrayglobal) {  
		objRes.total += arrayglobal[key].cont; 
 		if (req.query.detalle !== undefined && req.query.detalle == 1) {
			objRes[arrayglobal[key].name] = arrayglobal[key].cont;
		}
	}


	

res.render('index',{
   users: arrayglobal,
   total: objRes.total
 });
	

});
/*
app.get("/panel",function (req,res, next){
	res.render('index', {
  	name: req.query.name,
  	cont: arrayglobal[key].cont
	});
})
*/


http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});



//res.render("index")
/*


var suma = function(numeroUno,numeroDos){
   var resultado = numeroUno + numeroDos;
   console.log(resultado);
}
*/


/*
// Create a token generator with the default settings:
var randtoken = require('rand-token');

// Generate a 16 character alpha-numeric token:
var token = randtoken.generate(16);

// Use it as a replacement for uid:
var uid = require('rand-token').uid;
var token = uid(16);

// Generate mostly sequential tokens:
var suid = require('rand-token').suid;
var token = suid(16);


*/
