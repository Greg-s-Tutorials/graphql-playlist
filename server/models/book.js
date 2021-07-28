const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: {
        type: Schema.Types.ObjectId,
        required: true,
        message: "You must provide an author id"
    }
});

module.exports = mongoose.model('Book', bookSchema);
