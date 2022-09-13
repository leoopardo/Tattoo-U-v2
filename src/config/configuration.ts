export default () => ({
  database: {
    global: {
      uri: `${process.env.DATABASE_URI}`,
    },
  },
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    confirmationTokenSecret: process.env.JWT_CONFIRMATION_TOKEN_SECRET,
  },
  cloudinary: {
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
  },
});
