import axios from "axios";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const AddPlant = () => {
  const { user } = useAuth();
  const [isUpLoading, setIsUpLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(false)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsUpLoading(true);
    const form = e.target;
    const name = form?.name.value;
    const category = form?.category?.value;
    const description = form?.description?.value;
    const price = form.price?.value;
    const quantity = form.quantity?.value;

    try {
      const plantData = {
        name,
        category,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        image: uploadedImage,
        seller: {
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        },
      };
      // console.table(plantData);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-plant`,
        plantData
      );
      toast.success("Plant Data Added Successfully, Yee!");
      form.reset();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    console.log(image);
    try{
      // image url responsive from imgbb
    const imageUrl = await imageUpload(image);
    console.log(imageUrl)
    setUploadedImage(imageUrl);
    }catch(error){
      setImageUploadError('image upload failed')
      console.log(error)
    }
  };
  return (
    <div>
      {/* Form */}
      <AddPlantForm
        handleFormSubmit={handleFormSubmit}
        isUpLoading={isUpLoading}
        uploadedImage={uploadedImage}
        handleImageUpload={handleImageUpload}
        imageUploadError={imageUploadError}
      />
    </div>
  );
};

export default AddPlant;
