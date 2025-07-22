import "./CardHonor.css";
import TablaHonor from "./TablaHonor/TablaHonor";
import PropTypes from "prop-types";
function CardHonor({ info, estudiantesHonor }) {
  let headerCardHonor = "";
  let conElementHeader = 0;
  info.map((element) => {
    headerCardHonor += element;
    conElementHeader++;
    if (conElementHeader < info.length) {
      headerCardHonor += " - ";
    }
  });

  return (
    <div className="CardHonorContainer">
      <div className="CardHonorHeaderContainer">
        <h3>{headerCardHonor}</h3>
      </div>
      <div className="CardHonorContent">
        <TablaHonor estudiantesHonor={estudiantesHonor} />
      </div>
    </div>
  );
}
CardHonor.propTypes = {
  info: PropTypes.object.isRequired,
  estudiantesHonor: PropTypes.array.isRequired,
};
export default CardHonor;
