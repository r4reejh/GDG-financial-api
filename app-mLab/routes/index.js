'use strict'
var express = require('express');
var router = express.Router();

var Company=require('../models/company');

router.get('/', function(req, res, next) {	
	////res.setHeader(200, {"Content-Type": "text/plain"});
  res.sendFile(__dirname+'/rest.txt');
});

router.get('/get_schema',function(req,res,next){
	var schema={
			sym: "<String>",
			ceo: "<String>",
			nse: "<String>",
			bse: "<String>",
		};
	////res.setHeader(200, {"Content-Type": "application/json"});
	res.send(schema);
});
router.get('/list_all',function(req,res){
	var result={};
	Company.find(function(err,com){
		com.forEach(function(elem, index, array) {
				result[index]=elem.company.symbol;
		});
		//res.setHeader(200, {"Content-Type": "application/json"});
		res.send(result);
	});
});
router.post('/create',function(req,res){
		var c=new Company();
		console.log(req.body.symbol);
		c.company.symbol=req.body.sym;
		c.company.ceo=req.body.ceo;
		c.company.stock_price.nse=req.body.nse;
		c.company.stock_price.bse=req.body.bse;
		c.save(function(err,obj){
			if(!err){
				console.log("done");
				//res.setHeader(200, {"Content-Type": "application/json"});
				res.json({"message":"created"});
				}
			});
});

router.get('/:sym',function(req,res){
	Company.findOne({'company.symbol':(req.params.sym).toUpperCase()},function(err,com){
		if(!err && com!=null){
			//res.setHeader(200, {"Content-Type": "application/json"});
			res.send(com.company);
			}
		else if(com==null){
			//res.setHeader(404, {"Content-Type": "application/json"});
			res.json({"message":"null"});
			}
		else{
			console.log(err);
			//res.setHeader(500, {"Content-Type": "application/json"});
			res.json({"message":err});
		}
		});
});

router.get('/:sym/stock_price',function(req,res){
	Company.findOne({'company.symbol':req.params.sym},function(err,com){
		if(!err && com!=null){
			//res.setHeader(200, {"Content-Type": "application/json"});
			res.send(com.company.stock_price);
			}
		else if(com==null){
			//res.setHeader(404, {"Content-Type": "application/json"});
			res.json({"message":"null"});
			}
		else{
			console.log(err);
			//res.setHeader(500, {"Content-Type": "application/json"});
			res.json({"message":err});
		}
	});
});
	
router.get('/:sym/stock_price/:exchange',function(req,res){
	Company.findOne({'company.symbol':req.params.sym},function(err,com){
		if(!err && com){
			//res.setHeader(200, {"Content-Type": "application/json"});
			res.send(com.company.stock_price[req.params.exchange]);
			}
		else if(com==null){
			//res.setHeader(404, {"Content-Type": "application/json"});
			res.json({"message":"null"});
			}
		else{
			console.log(err);
			//res.setHeader(500, {"Content-Type": "application/json"});
			res.json({"message":err});
		}
	});
});

router.put('/:sym/update/all',function(req,res){
	Company.findOne({'company.symbol':req.params.sym},function(err,com){
		if(!err && com!=null){
			com.company.ceo=req.body.ceo;
			com.company.stock_price.nse=req.body.nse;
			com.company.stock_price.bse=req.body.bse;
			com.save(function(err,obj){
				if(!err){
					console.log("done");
					//res.setHeader(200, {"Content-Type": "application/json"});
					res.json({"message":"true"});
				}
			});
			}
		else if(com==null){
			//res.setHeader(404, {"Content-Type": "application/json"});
			res.json({"message":"null"});
			}
		else{
			console.log(err);
			//res.setHeader(500, {"Content-Type": "application/json"});
			res.json({"message":err});
		}
	});
});

router.put('/:sym/update/:field',function(req,res){
	console.log("HELLO");
	Company.findOne({'company.symbol':req.params.sym},function(err,com){
		if(!err && com!=null){
			try {
				if(com.company[req.params.field]!=undefined){
				com.company[req.params.field]=req.body;
				com.save(function(err,obj){
					if(!err){
						console.log("done");
						//res.setHeader(200, {"Content-Type": "application/json"});
						res.json({"message":"true"});
					}
					else{
						//res.setHeader(500, {"Content-Type": "application/json"});
						res.json({"message":"error while update, please try again"});
					}
				});
				}
				else{
					//res.setHeader(400, {"Content-Type": "application/json"});
					res.json({"message":"incorrect command"});
					}
			}
			catch(err){
				res.json({"message":err});
			}
			
		}
		else if(com==null){
			//res.setHeader(404, {"Content-Type": "application/json"});
			res.json({"message":"false"});
		}
		else{
			//res.setHeader(500, {"Content-Type": "application/json"});
			console.log(err);
		}
	});
});

router.put('/:sym/update/:field/:value',function(req,res){
	console.log("HELLO");
	Company.findOne({'company.symbol':req.params.sym},function(err,com){
		if(!err && com!=null){
			try {
				if(com.company[req.params.field]!=undefined){
				com.company[req.params.field]=req.params.value;
				com.save(function(err,obj){
					if(!err){
						console.log("done");
						//res.setHeader(200, {"Content-Type": "application/json"});
						res.json({"message":"true"});
					}
					else{
						//res.setHeader(500, {"Content-Type": "application/json"});
						res.json({"message":"error while update, please try again"});
					}
				});
				}
				else{
					//res.setHeader(400, {"Content-Type": "application/json"});
					res.json({"message":"incorrect command"});
					}
			}
			catch(err){
				//res.setHeader(500, {"Content-Type": "application/json"});
				res.json({"message":err});
			}
			
		}
		else if(com==null){
			//res.setHeader(404, {"Content-Type": "application/json"});
			res.json({"message":"false"});
		}
		else{
			//res.setHeader(500, {"Content-Type": "application/json"});
			console.log(err);
		}
	});
});

router.delete('/:sym',function(req,res){
	Company.findOne({'company.symbol':req.params.sym},function(err,com){
		if(!err && com!=null){
			com.remove(function(error){
				if(!err){
					////res.setHeader(200, {"Content-Type": "application/json"});
					res.json({"message":"true"});
				}
				else
				res.json({"message":"false"});
				});
			}
			else if(com==null){
				////res.setHeader(404, {"Content-Type": "application/json"});
				res.json({"message":"null"});
			}
			else{
				////res.setHeader(500, {"Content-Type": "application/json"});
				res.json({"message":"error in search"});
			}
		});
});

router.use('*',function(req,res){
	////res.setHeader(400, {"Content-Type": "application/json"});
	res.json({"message":"invalid request"});
});

module.exports = router;
