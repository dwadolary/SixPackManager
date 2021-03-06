var express = require('express'),
router = express.Router();
var moment = require('moment');

var Karnet = require('../models/karnet.js');

router.get('/', ensureAuthenticated, function(req, res){

Karnet.getByUserId(req.user.id, function(err, rslt){

  rslt = Karnet.convertDate(rslt);

  var Gym = require('../models/gym.js');

    res.render('karnety', {
        karnety : rslt
      });
  });
});

router.get('/add', ensureAuthenticated, function(req, res){
    res.render('newSubCard');
});

router.post('/add', function(req,res){
  var months = req.body.months,
      price = months * 10;
      callbck = function(subcardId){
        res.redirect('/payment/' + price + '/USD/' +  subcardId + '/' + req.user.id);
      }

    Karnet.addNewSubCard(req.user.id, months, price, callbck);
});

router.get('/add/:id', ensureAuthenticated, function(req, res){
  res.render('newSubCard', {
    id: req.params.id
  });
});

router.post('/add/:id', function(req,res){
  var months = req.body.months,
      price = months * 10;
      callbck = function(subcardId){
        res.redirect('/payment/' + price + '/USD/' +  subcardId + '/' + req.user.id);
      }

    Karnet.addNewSubCard(req.user.id, req.params.id, months, price, callbck);
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}


module.exports = router;
