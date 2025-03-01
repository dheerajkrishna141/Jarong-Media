import AddFeatureForm, { FeatureFormValues } from "@/Forms/AddFeatureForm";
import HotelService from "@/services/HotelService";
import { toaster } from "../../UI/toaster";

export interface featureDTO {
  id: string;
  categorical_features: {
    [name: string]: string;
  };
  area: string;
  bed_type: string;
}

const AddFeature = () => {
  const handleFeatureSubmit = (data: FeatureFormValues) => {
    const processedData: featureDTO = {
      area: data.area,
      bed_type: data.bed[0],
      id: data.name,
      categorical_features: {},
    };

    data.categories.forEach(
      (category) =>
        (processedData.categorical_features[category.name] = category.values)
    );

    HotelService.addFeature({
      data: processedData,
    })
      .then(() => {
        toaster.create({
          title: "Feature Added successfully!",
          type: "success",
          duration: 5 * 1000, //5 seconds
        });
      })
      .catch((res) => {
        console.log(res);

        toaster.create({
          title: "Error Adding Feature",
          type: "error",
          description: res.response.data.message,
          duration: 5 * 1000, //5 seconds
        });
      });
  };

  return (
    <>
      <AddFeatureForm handleFeatureSubmit={handleFeatureSubmit} />
    </>
  );
};

export default AddFeature;
