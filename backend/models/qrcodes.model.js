import mongoose from 'mongoose';

const qrcodeSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true
    }
});

const QrcodeModel = mongoose.model('Qrcode', qrcodeSchema);

export default QrcodeModel;