module.exports = function(app)
{
    app.get("/api/test", findAllMessages);
    app.post("/api/test", createMessage);
    app.delete("/api/test/:id", deleteMessage);

    // Edited Code

    // app.get("./test", findAllMessages);
    // app.post("./test", createMessage);
    // app.delete("./test/:id", deleteMessage);

    // Edited Code Ends

    //Original Code

    // var connectionString = 'mongodb://127.0.0.1:27017/test';
    //
    // if(process.env.MLAB_USERNAME) {
    //     connectionString = process.env.MLAB_USERNAME + ":" +
    //         process.env.MLAB_PASSWORD + "@" +
    //         process.env.MLAB_HOST + ':' +
    //         process.env.MLAB_PORT + '/' +
    //         process.env.MLAB_APP_NAME;
    // }

    // Original Code ends

    // Edited Code

    var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
    if(1 < 2) { // check if running remotely
    	var username = admin //process.env.MLAB_USERNAME_WEBDEV; // get from environment
    	var password = admin //process.env.MLAB_PASSWORD_WEBDEV;
    	connectionString = 'mongodb://' + username + ':' + password;
    	connectionString += '@ds119820.mlab.com:19820/heroku_v7xp8bm1'; // user yours
    }


    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var TestSchema = mongoose.Schema({
        message: String
    });

    var TestModel = mongoose.model("TestModel", TestSchema);

    function findAllMessages(req, res) {
        TestModel
            .find()
            .then(
                function(tests) {
                    res.json(tests);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createMessage(req, res) {
        TestModel
            .create(req.body)
            .then(
                function(test) {
                    res.json(test);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteMessage(req, res) {
        TestModel
            .remove({_id: req.params.id})
            .then(
                function(result) {
                    res.json(result);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};
