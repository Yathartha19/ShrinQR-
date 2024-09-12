import ShortModel from '../models/shortener.model.js';

export const createShort = async (req, res) => {
    let { tag, url } = req.body;
    
    const generateRandomTag = () => Math.floor(10000 + Math.random() * 90000);

    if (url === '') {
        return res.status(400).json({ message: 'URL is required' });
    }
    else if (tag === '') {
        let isUnique = false;
        while (!isUnique) {
            tag = generateRandomTag().toString(); 
            const existingShort = await ShortModel.findOne({ tag }); 
            if (!existingShort) {
                isUnique = true; 
            }
        }
    }

    const short = new ShortModel({ tag, url });
    try {
        short.save();
        res.status(200).json(short);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const deleteShort = async (req, res) => {
    const { id } = req.params; 

    try {
        const short = await ShortModel.findOneAndDelete({ tag: id }); 
        if (!short) {
            return res.status(404).json({ message: 'Short URL not found' });
        }
        res.status(200).json({ message: 'Short URL deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

export const updateShort = async (req, res) => {
    const { id } = req.params;
    const updata = req.body;

    try {
        const url = await ShortModel.findOne({ tag: id });

        if (!url) {
            return res.status(404).json({ message: 'Short URL not found' });
        }
        
        await ShortModel.findOneAndUpdate(url, updata);
        res.status(200).json({ message: 'Short URL updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

export const getShort = async (req, res) => {
    const {id} = req.params;

    try {
        const short = await ShortModel.findOne({ tag: id });
        res.redirect(short.url);
        res.status(200);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Short URL not found' });
    }
}

export const getUnShort = async (req, res) => {
    const { id } = req.params;

    try {
        const short = await ShortModel.findOne({ tag: id });
        res.status(200).json(short.url);
    } catch (error) {
        res.status(404).json({ message: 'Short URL not found' });
    }
}

export const getCheck = async (req, res) => {  
    const url = req.body.url;

    try {
        const short = await ShortModel.findOne({ url: url });
        if (!short) {
            return res.status(200).json({ exists: false });
        }
        res.status(200).json({ exists: true, data: short });
    } catch (error) {
        res.status(404).json({ message: 'Short URL not found' });
    }
}

