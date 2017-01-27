//finance schema

var mongoose = require('mongoose');
var companySchema = mongoose.Schema({
  company: {
	  symbol: String,
	  ceo: String,
	  stock_price: {
		  nse: String,
		  bse: String,
		  },
  },
});

module.exports = mongoose.model('Company', companySchema);

