module.exports = (app) => {
    const data = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/create', data.create);

    // Retrieve all Notes
    app.get('/listing', data.findAll);

    // Retrieve a single Note with emailId
    app.get('/data/:emailId', data.findOne);

    // Update a Note with emailId
    app.put('/data/:emailId', data.update);

    // Delete a Note with emailId
    app.delete('/data/:emailId', data.delete);

    // Login user
    app.post('/login', data.login);
}