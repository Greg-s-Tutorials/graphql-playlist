import mongoose  from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        message: "You must provide an author id"
    }
});

export default mongoose.model('Book', bookSchema);
