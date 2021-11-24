import RealEstateProperty from "../src/services/RealEstateProperty";
import { getAllProperties } from "./redux/Properties";

const PropertyEvents = async (dispatch, getState) => {
  const instance = await RealEstateProperty();
  await instance.events.PropertyCreated((error, candidateList) => {
    dispatch(getAllProperties());
  });
};

export default PropertyEvents;
