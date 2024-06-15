const { cloudinary } = require('../configurations/cloudinary.config');
const streamifier = require('streamifier');

const uploadImage = (fileBuffer, options) => {
    return new Promise((resolve, reject) => {
      const cld_upload_stream = cloudinary
      .uploader.upload_stream( options, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });

    streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
    })
};

const deleteImage = async (publicId) => {
  return cloudinary.uploader.destroy(publicId);
}

const updateImage = async (fileBuffer, publicId, options) => {
  return uploadImage(fileBuffer, {
    ...options,
    public_id: publicId,
    overwrite: true,
  })
}
module.exports = {
  uploadImage,
  deleteImage,
  updateImage,
}
