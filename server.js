const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
const db = require("./db");
const userRoute = require("./route/user_route");
const bookRoute = require("./route/book_route");
const transactionRoute = require('./route/transaction_route');
const loginRoute = require("./route/login_route");
//
const auth_middleware = require("./middleware/auth_middleware");
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('public'))

var i = 0;
var countCookies = (req, res, next)=>{
	// if(req.cookies.bookId =="tung"){
	// 	req.cookies.cookie = ++i
	// 	console.log(req.cookies);
	// 	next();	
	// }
	console.log(req.cookies.abc = 123);
	console.log(req.cookies);
 	next();	
}
app.use("/login", loginRoute);

app.use("/users", auth_middleware.checkCookie, userRoute);

app.use("/books", auth_middleware.checkCookie, bookRoute);

app.use('/transaction', auth_middleware.checkCookie, transactionRoute);

app.get("/logout", (req, res) => {
	res.clearCookie("userId");
	res.redirect("/login");
});
https: app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
