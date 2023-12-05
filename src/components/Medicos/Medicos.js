import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from 'react-bootstrap';
import { useState,useEffect } from "react";
import { Link} from 'react-router-dom';
import { ReactComponent as KleverLogo } from '../assets/logo.svg';
import { ReactComponent as StarLogo } from '../assets/shooting-star.svg';
import { ReactComponent as Trash } from '../assets/trash.svg';
import Axios from 'axios'
const instance = Axios.create({
    baseURL: 'http://localhost:8082/medico-ms',
  });

const Medicos=()=>{
    const [medicos,setMedicos]=useState([])
    function deletar(id){
        instance.delete(`medicos/${id}`).then(setMedicos(medicos.filter(medico=>medico.id!==id)))
    }
    useEffect(()=>{
        instance.get(`/medicos/api`).then(data=>{ 
          setMedicos(data.data)
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
       <Link to='/medicos/adicionar'> <Button  style={{backgroundColor:'#641864',borderColor:'black'}}>Adicionar Medico</Button></Link>
        </div>
        <div style={{display:'flex',flexDirection:'column'}}>
            <div className='my-0' style={{display:'flex',justifyContent:'space-between'}}><h5>Medico</h5><h5>Endereço</h5></div>
                {medicos.map(medico=>{
                    return(
                        <div key={medico.id}className='my-0'  style={{display:'flex',flexDirection:'row',justifyContent: 'space-between'}} >
                            <div className='my-0' style={{display:'flex',flexDirection:'column',justifyContent: 'space-between'}}>
                                <div  style={{display:'flex',alignItems: 'center',marginRight:'20px'}}>
                              <Trash onClick={()=>deletar(medico.id)} id={medico.id} style={{height:'3rem',color:'black'}}/>
                            <Link to={{pathname:`/medico/edit/${medico.id}`}}>
                            <svg color='black' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                            </svg>
                            </Link>
                                </div>
                                <h3 id={medico.id}>{medico.nome}</h3>
                                <p>email: {medico.email}</p>
                                <p>crm: {medico.crm}</p>
                                <p>especialidade: {medico.especialidade}</p>
                            </div>    
                            <div className='my-0' style={{display:'flex',flexDirection:'column',justifyContent: 'space-between'}}>
                                <p >Estado:{medico.endereco.uf}</p>
                                <p >Cidade:{medico.endereco.cidade}</p>
                                <p >Bairro:{medico.endereco.bairro}</p>
                                <p >Logradouro:{medico.endereco.logradouro}</p>
                                <p >Cep:{medico.endereco.cep}</p>
                            </div>
                    </div>)
                        })}
        </div>
    </div>
    </div>
    </div>
    )
}
export default Medicos