import mongoose from 'mongoose';

const shortenerSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const ShortModel = mongoose.model('ShortModel', shortenerSchema);

export default ShortModel;