'use strict'
var express = require('express');
var router = express.Router();

var Company=require('../models/company');
router.get('/', function(req, res, next) {	
  res.send("Finance Api By Reejh Ghosh");
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
				res.send("created");
				}
			});
});

router.get('/:sym',function(req,res){
	Company.findOne({'company.symbol':(req.params.sym).toUpperCase()},function(err,com){
		if(!err && com!=null){
			res.send(com.company);
			}
		else if(com==null){
			res.send("No info");
			}
		else{
			console.log(err);
		}
		});
});

router.get('/:sym/stockprice',function(req,res){
	Company.findOne({'company.symbol':req.params.sym},function(err,com){
		if(!err && com!=null){
			res.send(com.company.stock_price);
			}
		else if(!com){
			res.send("false");
			}
		else{
			console.log(err);
		}
	});
});
	
router.get('/:sym/stockprice/:exchange',function(req,res){
	Company.findOne({'company.symbol':req.params.sym},function(err,com){
		if(!err && com){
			res.send(com.company.stock_price[req.params.exchange]);
			}
		else if(com==null){
			res.send("false");
			}
		else{
			console.log(err);
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
					res.send("true");
				}
			});
			}
		else if(com==null){
			res.send("false");
			}
		else{
			console.log(err);
		}
	});
});

router.put('/:sym/update/:field/:value',function(req,res){
	console.log("HELLO");
	Company.findOne({'company.symbol':req.params.sym},function(err,com){
		if(!err && com!=null){
			try {
				console.log("HELLO");
				if(com.company[req.params.field]!=undefined){
				com.company[req.params.field]=req.params.value;
				com.save(function(err,obj){
					if(!err){
						console.log("done");
						res.send("true");
					}
					else{
						res.send(err);
					}
				});
				}
				else{
					res.send("incorrect command");
					}
			}
			catch(err){
				res.send(err);
			}
			
		}
		else if(com==null){
			res.send("false");
		}
		else{
			console.log(err);
		}
	});
});


module.exports = router;
