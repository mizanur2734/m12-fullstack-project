import axios from "axios";

// upload image and return image url
export const imageUpload = async (imagedata) => {
  const imageFormData = new FormData();
  imageFormData.append("image", imagedata);

  // upload image in imgbb server using post request
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    imageFormData
  );

  // image url responsive from imgbb
  return data?.data?.display_url;
  
};
