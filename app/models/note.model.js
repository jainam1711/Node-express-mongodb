const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const NoteSchema = mongoose.Schema({
    email: {
	    type: String,
	    unique: true,
	    required: true
  	},
    password: {
	    type: String,
	    required: true,
  	}
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);