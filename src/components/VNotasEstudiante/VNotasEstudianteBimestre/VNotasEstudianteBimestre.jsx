import './VNotasEstudianteBimestre.css'
import ComponentNotasEstudianteElement from '../../generalsComponets/ComponentNotasEstudianteElement/ComponentNotasEstudianteElement'

function VNotasEstudianteBimestre() {
  const bimestres=[1,2,3,4]
  return (
    <div className='VNotasEstudianteBimestreContainer'>
        {
          bimestres.map((bimestre,index)=>(
            <ComponentNotasEstudianteElement key={index} title={"Bimestre " + bimestre} tipo={"bimestre"} indicador={bimestre}/>
          ))
        }
    </div>
  )
}

export default VNotasEstudianteBimestre