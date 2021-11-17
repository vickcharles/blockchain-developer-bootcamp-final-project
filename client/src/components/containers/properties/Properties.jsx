import { useEffect } from "react";
import PropertyListTitle from "./PropertyListTitle";
import { useDispatch } from "react-redux";
import { getAllProperties } from "../../../redux/Properties";
import { useSelector } from "react-redux";
import PropertyList from "./PropertyList";

const Properties = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.allProperties);

  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto">
      <PropertyListTitle />
      <PropertyList propertyOwners={properties} />
    </div>
  );
};

export default Properties;
