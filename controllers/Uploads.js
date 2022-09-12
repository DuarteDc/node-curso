const path = require('path');
const fs = require('fs');
const { response } = require('express');

const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const { uploadFiles } = require('../helpers');
const { User, Products } = require('../models');


const uploadFile = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file)
        return res.status(400).json({ message: 'No se subio ningun archivo' });

    try {
        const name = await uploadFiles(req.files, ['txt', 'md', 'save'], 'text');
        res.json({
            name,
        })
    } catch (error) {
        res.status(400).json({ error });
    }

}

// const updateFile = async (req, res = response) => {

//     const { id, collection } = req.params;

//     let model;

//     switch (collection) {

//         case 'users':
//             model = await User.findById(id);
//             if (!model) return res.status(400).json({ message: 'El id no es valido' });
//             break;

//         case 'products':
//             model = await Products.findById(id);
//             if (!model) return res.status(400).json({ message: 'El id no es valido' });
//             break;

//         default:
//             return res.status(500).json({ message: 'La colección no es valida' });
//     }

//     if (model.image) {
//         const pathImage = path.join(__dirname, '../uploads', collection, model.image);
//         if (fs.existsSync(pathImage))
//             fs.unlinkSync(pathImage);
//     }

//     const name = await uploadFiles(req.files, undefined, collection);
//     model.image = name;
//     await model.save();

//     res.json({
//         message: 'La imagen se actualizo con exito',
//         collection: model,
//     })

// }

const updateFileCloudinary = async (req, res = response) => {

    const { id, collection } = req.params;

    let model;

    switch (collection) {

        case 'users':
            model = await User.findById(id);
            if (!model) return res.status(400).json({ message: 'El id no es valido' });
            break;

        case 'products':
            model = await Products.findById(id);
            if (!model) return res.status(400).json({ message: 'El id no es valido' });
            break;

        default:
            return res.status(500).json({ message: 'La colección no es valida' });
    }

    if (model.image) {
        const nameArr = model.image.split('/');
        const name = nameArr[nameArr.length - 1];
        const [public_id] = name.split('.');
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.image = secure_url;
    await model.save();

    res.json({
        message: 'La imagen se actualizo con exito',
        collection: model,
    })

}

const showImage = async (req, res = response) => {
    const { id, collection } = req.params;

    let model;



    switch (collection) {

        case 'users':
            model = await User.findById(id);
            if (!model) return res.status(400).json({ message: 'El id no es valido' });
            break;

        case 'products':
            model = await Products.findById(id);
            if (!model) return res.status(400).json({ message: 'El id no es valido' });
            break;

        default:
            return res.status(500).json({ message: 'La colección no es valida' });
    }

    if (model.image) {
        const pathImage = path.join(__dirname, '../uploads', collection, model.image);
        if (fs.existsSync(pathImage))
            return res.sendFile(pathImage);

    }

    const pathImage = path.join(__dirname, '../assets', 'no-image.jpg');

    res.sendFile(pathImage);

}

module.exports = {
    uploadFile,
    updateFileCloudinary,
    showImage,
}