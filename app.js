/* A USSD Code Application 
 *
 * May 2020
 *
 * Copyright @Peter_Kamwati
 *
*/

// Import modules
const express = require("express");
const app = express()
const UssdMenu = require('ussd-menu-builder');

// Connect to db


// Set the port to listen on8888
app.set('port',process.env.PORT || 3002);

// Create menu instance
let menu = new UssdMenu();+

// Define menu states
menu.startState({
	run: () => {
        // use menu.con() to send response without terminating session	
		menu.con('Welcome To PCEA NYAGA CHURCH.'+
			'\nChoose option:' +
			'\n1. Get today\'s Message' +
			'\n2. Listen to a Preaching session');
	},
	// next object links to next state based on user input
	next: { '1': 'todaysMessage',
		'2': 'preachingSession'
	}
});

menu.state('todaysMessage', {
    run: () => {
	    message = 'Jesus Loves You! Always!'
	    menu.end(message);
    }
});

menu.state('preachingSession', {
    run: () => {
	    menu.con('Playing Audio...');
    }
});



// Register USSD Handler with express
 
app.post('/ussd', function(req, res){
    menu.run(req.body, ussdResult => {
        res.send(ussdResult);
    });
});
 

//the page-not-found error 404 middleware
app.use(function(req,res,next){
	res.status(404);
	res.render('404');
});

//the internal-error 500 middleware
app.use(function(err,req,res,next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

//run the server
app.listen(app.get('port'),function(){
	console.log(`Server listening on port ${app.get('port')}……`);
});

