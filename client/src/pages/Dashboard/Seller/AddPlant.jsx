import axios from "axios";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import { imageUpload } from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";

const AddPlant = () => {
  const {user} = useAuth()
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form?.name.value;
    const category = form?.category?.value;
    const description = form?.description?.value;
    const price = form.price?.value;
    const quantity = form.quantity?.value;
    const image = form.image?.files[0];
    // image url responsive from imgbb
    const imageUrl = await imageUpload(image);
    const plantData = {
      name,
      category,
      description,
      price,
      quantity,
      image: imageUrl,
      seller: {
        name:user?.displayname,
        email:user?.email,
      }
    };
    console.table(plantData);
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/add-plant`,
      plantData
    );
    console.log(data)
  };
  return (
    <div>
      {/* Form */}
      <AddPlantForm handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default AddPlant;
