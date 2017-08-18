var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.beginDialog('askName');
    },
	 // Step 1
    
    // Step 2
    function (session, results) {
        if(results.response.indexOf('hi')  > -1 ){
            session.send('Hello !');
        }else{
            session.endDialog('Fuck you %s!, why did not you say hi', results.response);    
        }
    }
	]);
bot.dialog('askName', [
    // Step 1
    function (session) {
        builder.Prompts.text(session);
    },
     function (session, results) {
        session.endDialogWithResult(results);
    }
]);