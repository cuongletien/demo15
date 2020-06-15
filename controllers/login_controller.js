var db = require("../db");
module.exports.login = (req, res, next) =>{
	res.render('login');
}

module.exports.postLogin = (req, res, next) =>{
	var email = req.body.email;
	var pass = req.body.pass;
	var userLoginTrue = db.get("users").find({ email: email }).value();
	if(! userLoginTrue){
		res.render('login',{ errors: ["Email or password wrong !!!"], values: req.body });
		return;
	}

	if(userLoginTrue.password !== pass){
		res.render('login',{ errors: ["Email or password wrong !!!"], values: req.body });
		return;
	}

	res.cookie("userId", userLoginTrue.id);
	res.locals.id = userLoginTrue.id;
	res.locals.name = userLoginTrue.name;
	console.log('login locals: ', res.locals);
    console.log('login cookies: ', req.cookies);
	res.redirect('/books');
}