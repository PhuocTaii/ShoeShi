const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

module.exports.uploadImageToCloudinary = async (fileBuffer) => {
    try {
      return new Promise((resolve, reject) => {
        const stream = streamifier.createReadStream(fileBuffer);
        const uploadStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              resolve(result.secure_url);
            } else {
              reject(error || 'Error uploading image to Cloudinary');
            }
          }
        );
        stream.pipe(uploadStream);
      });
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      console.log(error)
      throw error;
    }
};