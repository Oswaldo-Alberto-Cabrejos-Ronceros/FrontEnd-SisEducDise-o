import './VHonerEstudianteBimestral.css'
import SelectComponent from '../../generalsComponets/SelectComponent/SelectComponent';
import CardHonor from '../../generalsComponets/CardHonor/CardHonor'
import PropTypes from "prop-types";

function VHonorEstudianteBimestral({info, estudiantesHonor}) {
    let optionsBimestre = [
        "Bimestre 1",
        "Bimestre 2",
        "Bimestre 3",
        "Bimestre 4",
      ];
  return (
    <div className='VHonorEstudianteBimestralContainer'>
              <div className="TitleHonorEstudianteBimestralContainer">
        <h3>Bimestral</h3>
      </div>
      <div className="SelectBimestralHonorEstudianteContainer">
        <SelectComponent name={"Bimestre"} options={optionsBimestre} />
      </div>
      <div className="VHonorEstudianteBimestralContent">
        <CardHonor info={info} estudiantesHonor={estudiantesHonor}/>
      </div>
    </div>
  )
}
VHonorEstudianteBimestral.propTypes={
  info:PropTypes.object.isRequired,
  estudiantesHonor:PropTypes.array.isRequired
}
export default VHonorEstudianteBimestral