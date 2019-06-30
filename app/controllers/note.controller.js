const Note = require('../models/note.model.js');
const Hash = require('password-hash');

// Create and Save a new User
exports.create = (req, res) => {
    // Create a User
    const note = new Note({
        email: req.body.email || "Untitled Email", 
        password: Hash.generate(req.body.password)
    });

    // Validate request
    if(!req.body.email && !req.body.password) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }

    // Save User in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single note with a emailId
exports.findOne = (req, res) => {
    Note.find({'email':req.params.emailId})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Data not found with email " + req.params.emailId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Data not found with email " + req.params.emailId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving data with email " + req.params.emailId
        });
    });
};

// Update a note identified by the emailId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.email && !req.body.password) {
        return res.status(400).send({
            message: "Content can not be empty"
        });
    }

    // Find note and update it with the request body
    Note.findOneAndUpdate({'email':req.params.emailId}, {
        email: req.body.email,
        password: Hash.generate(req.body.password)
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Data not found with email " + req.params.emailId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Data not found with email " + req.params.emailId
            });                
        }
        return res.status(500).send({
            message: "Error updating data with email " + req.params.emailId
        });
    });
};

// Delete a note with the specified emailId in the request
exports.delete = (req, res) => {
    Note.findOneAndRemove({'email':req.params.emailId})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Data not found with email " + req.params.emailId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Data not found with email " + req.params.emailId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with email " + req.params.emailId
        });
    });
};

//login
exports.login = (req, res) => {
    Note.find({'email':req.body.email})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Data not found with email " + req.body.email
            });           
        }
        hashedPassword = note.map(data => {
            return data.password;
        });
        if(Hash.verify(req.body.password, hashedPassword[0])) {
            res.send(note);
        } else {
            return res.status(404).send({
                message: "Incorrect password"
            });
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Data not found with email " + req.body.email
            });                
        }
        return res.status(500).send({
            message: err.message || "Error retrieving data with email " + req.body.email
        });
    });
};