import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from 'react-bootstrap';
import { useState,useEffect } from "react";
import { Link} from 'react-router-dom';
import { ReactComponent as KleverLogo } from '../assets/logo.svg';
import { ReactComponent as StarLogo } from '../assets/shooting-star.svg';
import { ReactComponent as Trash } from '../assets/trash.svg';
import Axios from 'axios'
const instance = Axios.create({
    baseURL: 'http://localhost:8082/consulta-ms',
  });

const Consultas=()=>{
    const [consultas,setConsultas]=useState([])
    function deletar(id){
        instance.delete(`consultas/${id}`).then(setConsultas(consultas.filter(consulta=>consulta.id!=id)))
    }
    useEffect(()=>{
        instance.get(`/consultas`).then(data=>{ 
            console.log(data)
            setConsultas(data.data)
          }
        )
        .catch()
          },[])
    return(
<div  style={{display:'flex',flexDirection:'center',gap:'3rem'}} className="container col-xl-10 col-xxl-8 px-3 py-0"> 
  <div style={{display:'flex',flex:'2'}} className="row align-items-center g-lg-5 py-5">
    <div  style={{display:'flex',flexDirection:'column',flexGap:'1rem'}} className="col-md-10 mx-auto col-lg-7"> 
        <div className='my-3' style={{display:'flex',justifyContent:'center'}}><KleverLogo style={{height:'3rem'}} /> </div>
            <div className='my-3' style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{display:'flex'}}>
                <StarLogo style={{height:'3rem',color:'white'}}/>
                <h2>Clinica do IFBA</h2> 
                </div>
       <Link to='/add'> <Button  style={{backgroundColor:'#641864',borderColor:'black'}}>Add Token</Button></Link>
        </div>
        <div style={{display:'flex',flexDirection:'column'}}>
            <div className='my-0' style={{display:'flex',justifyContent:'space-between'}}><h5>Consulta</h5><h5>Data</h5></div>
                {consultas.map(consulta=>{
                    return(
                        <div key={consulta.id}className='my-0'  style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}} >
                            <div className='my-0' style={{display:'flex',flexDirection:'column',justifyContent: 'space-between'}}>
                                <h3 id={consulta.id}>Especialidade: {consulta.medico.especialidade}</h3>
                                <p>Médico: {consulta.medico.nome}-crm:{consulta.medico.crm}</p>
                                <div className='mr-3' style={{display:'flex',alignItems: 'center',marginRight:'20px'}}>
                                <Trash onClick={()=>deletar(consulta.id)} id={consulta.id} style={{height:'3rem',color:'white'}}/>
                                </div>
                            </div> 
                            <div className='mr-3' style={{display:'flex',alignItems: 'end',flexDirection: 'column'}}>      
                                <h3 >{consulta.data.dia}/{consulta.data.mes}/{consulta.data.dia}</h3>
                                <h3>horario: {consulta.data.hora}:{consulta.data.minuto}</h3>
                                <p>Paciente:{consulta.paciente.nome}-cpf:{consulta.paciente.cpf}</p>

                            </div>
                    </div>)
                        })}
        </div>
    </div>
    </div>
    </div>
    )
}
export default Consultas