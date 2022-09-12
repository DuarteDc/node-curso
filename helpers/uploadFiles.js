const path = require('path');

const { v4: uuidv4 } = require('uuid');

const validExtensions = ['jpg', 'png', 'jpeg', 'webp'];

const uploadFiles = (files, extensions = validExtensions, directiory = '') => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const splitName = file.name.split('.');
        const extension = splitName[splitName.length - 1];

        if (!extensions.includes(extension))
            return reject(`La extensión .${extension} no es valida`);

        const tempName = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads', directiory, tempName);
        file.mv(uploadPath, (error) => {

            if (error) return reject(error)
            resolve(tempName);

        });

    });

}

module.exports = {
    uploadFiles
}