// Images are uploaded to Cloudinary (free plan, unsigned preset "pos_unsigned",
// which stores them under pos/images). Cloudinary generates a unique id per upload,
// so `path` is no longer used but kept so the callers don't change.
const CLOUDINARY_CLOUD_NAME = "hzmz8gge";
const CLOUDINARY_UPLOAD_PRESET = "pos_unsigned";

export const uploadImageAndGetURL = async (path, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.error?.message || "Image upload failed");
  }
  console.log("Uploaded an image");
  return data.secure_url;
};
