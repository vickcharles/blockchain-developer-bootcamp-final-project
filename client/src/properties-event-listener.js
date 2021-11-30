import RealEstateProperty from "../src/services/RealEstateProperty";
import { getAllProperties } from "./redux/Properties";

const PropertyEvents = async (dispatch) => {
  const instance = await RealEstateProperty();
  await instance.events.PropertyCreated(() => {
    dispatch(getAllProperties());
  });
};

export default PropertyEvents;
