const cloudinary = require('cloudinary').v2;

module.exports.uploadImageToCloudinary = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath);
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      console.log(error)
      throw error;
    }
};