import AWS from "aws-sdk";
import dotenv from "dotenv";
import { removeBackgroundFromImageBase64 } from "remove.bg";
import sharp from "sharp";

dotenv.config();
//
AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
// Create the parameters for calling listObjects
var bucketParams = {
  Bucket: "russworld",
};

// main variables
const bucket_name = "russworld";
const audio_folder = "/audio";
const video_folder = "/video";

// not being used, leaving for ref
async function myRemoveBgFunction(imageBuffer) {
  // Remove background from the image (your existing code)
  const result = await removeBackgroundFromImageBase64({
    base64img: imageBuffer.toString("base64"),
    apiKey: process.env.REMOVE_BG_KEY,
    size: "regular",
    type: "auto",
    crop: false,
  });

  // Decode the base64 image returned by removeBackgroundFromImageBase64
  const base64Image = Buffer.from(result.base64img, "base64");

  // Process the image using Sharp (e.g., resize, enhance, or adjust quality)
  const processedImage = await sharp(base64Image)
    .png({ quality: 100 })
    .toBuffer(); // Convert the image to a Buffer

  return processedImage;
}

// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
// we are not using the filestream solution (in the above url) because we are not getting the file from the node command
// it is being passed by multer, which gives us all the relevant parameters
const writeToS3 = async (file) => {
  const file_string_modified = file.originalname
    .split(" ")
    .join("_")
    .replace(/[^a-zA-Z0-9_.]/g, "");
  // .replace(/[^a-zA-Z0-9_]/g, "");
  const key = Date.now() + "_" + file_string_modified;
  const allowedFileFormats = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  const isAllowedType = allowedFileFormats.includes(file.mimetype);

  let body;
  if (isAllowedType) {
    // Remove background if the file type is allowed
    // const base64 = await myRemoveBgFunction(file.buffer.toString("base64"));
    body = await myRemoveBgFunction(file.buffer);

    // body = new Buffer.from(
    //   base64.replace(/^data:image\/\w+;base64,/, ""),
    //   "base64"
    // );
  } else {
    body = file.buffer;
  }

  // Prepare upload parameters for S3
  const uploadParams = {
    Bucket: `${bucket_name + audio_folder}`,
    Key: key,
    Body: body,
    ContentType: file.mimetype,
  };
  console.log(body);

  try {
    const data = await s3Upload(uploadParams);

    console.log(data);
    return data;
    // return process.env.AWS_S3_URL + key;
    console.log(process.env.AWS_S3_URL + key);
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { writeToS3 };
function s3Upload(params) {
  return new Promise((rsl, rej) => {
    s3.upload(params, function (err, data) {
      if (err) {
        rej(err);
      }
      if (data) {
        console.log("Upload Success", data.Location);
        rsl(data.Location);
      }
    });
  });
}
