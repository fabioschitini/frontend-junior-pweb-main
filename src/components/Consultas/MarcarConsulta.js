import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Form} from 'react-bootstrap';
import { Formik } from 'formik';
import { useNavigate} from "react-router-dom";
import * as yup from 'yup';
import { useState,useEffect } from 'react';
import { Link} from 'react-router-dom';
import { ReactComponent as KleverLogo } from '../assets/logo.svg';
import { ReactComponent as StarLogo } from '../assets/shooting-star.svg';
import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'http://localhost:8082',
  });
const MarcarConsultas=()=>{
  const [consultaError,setConsultaError]=useState(false)
  const [dataError,setDataError]=useState(false)
  const navigate=useNavigate()
  const [medicos,setMedicos]=useState(false)
  const [pacientes,setPacientes]=useState([])
  var diaaDaSemana=new Array(7);
  diaaDaSemana[0]="DOMINGO";
  diaaDaSemana[1]="SEGUNDA";
  diaaDaSemana[2]="TERCA";
  diaaDaSemana[3]="QUARTA";
  diaaDaSemana[4]="QUINTA";
  diaaDaSemana[5]="SEXTA";
  diaaDaSemana[6]="SABADO";

  useEffect(()=>{
    instance.get(`/medico-ms/medicos/api`).then(data=>{ 
        setMedicos(data.data)
        console.log(data.data)
        }
      )
      .catch()

    instance.get(`/paciente-ms/pacientes/api`).then(data=>setPacientes(data.data)).catch()
      },[])


    const schema = yup.object().shape({ 
    paciente: yup.string().required("Esse campo é obrigatorio"),
    medico: yup.string().required("Esse campo é obrigatorio"),
    data:yup.string().required("Esse campo é obrigatorio")
    });

  return(
        <div  style={{display:'flex',flexDirection:'center'}} className="container col-xl-10 col-xxl-8 px-4 py-5"> 
        <div style={{display:'flex',flex:'2'}} className="row align-items-center g-lg-5 py-5">
        <div  style={{display:'flex',flexDirection:'column',flexGap:'1rem'}} className="col-md-10 mx-auto col-lg-7"> 
        <div className='my-3' style={{display:'flex',justifyContent:'center'}}><KleverLogo style={{height:'3rem'}} /> </div>
        <div className='my-3' style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{display:'flex'}}>
            <StarLogo style={{height:'3rem',color:'white'}}/>
            <h2>Wish Wallet</h2> 
            </div>
          </div>
        <div className='my-3' style={{display:'flex',justifyContent:'space-between'}}><h5>Marcar Consulta </h5>
        <Link to='/'> <Button style={{backgroundColor:'#641864',borderColor:'black'}} className="w-10 btn btn-sm btn-primary">Voltar</Button> </Link>
        </div>
        
       <Formik
        validator={() => ({})}
        validationSchema={schema}
        onSubmit={values=>{
           let date= new Date(values.data)
           var mes = date.getMonth();
           var diaDaSemana = date.getDay();
           var dia=date.getDate()
           var ano = date.getFullYear();
           var hora= date.getHours();
           var minuto = date.getMinutes();
 
           instance.post(`/consulta-ms/consultas`,{medico:values.medico,paciente:values.paciente,dataConsulta:{
            ano:ano,
            mes:mes+1,
            dia:dia,
            dia_da_semana:diaaDaSemana[diaDaSemana],
            hora:hora,
            minuto:minuto
        }}).then(datads=>{ 
            console.log(datads,'a info que retorna')
            navigate('/')
        })
         .catch(e=>{
          if(e.response.data.mensagem)setConsultaError(e.response.data.mensagem)
          else setDataError(e.response.data.errors[0])
    })

        }}
      initialValues={{
        medico: '',
        paciente:'',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>

            <Form.Group   md="10" controlId="validationFormik01">
              <Form.Label>Medico</Form.Label>
              <Form.Control
                as='select'
                name="medico"
                value={values.medico}
                onChange={handleChange}
                isInvalid={errors.medico}
                placeholder="Medico"
                required
              >
              <option disabled value="" >Selecione o medico</option>
             {medicos && medicos.map(medico=>{
                return(
                <option value={medico.id}>{medico.nome}-{medico.especialidade}</option>
                        )
             })}
                </Form.Control>
              <Form.Control.Feedback type='invalid'>{errors.medico}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group   md="10" controlId="validationFormik01">
              <Form.Label>Paciente</Form.Label>
              <Form.Control
                as='select'
                name="paciente"
                value={values.paciente}
                onChange={handleChange}
                isInvalid={errors.paciente}
                placeholder="Paciente"
                required
              >
              <option disabled value="">Selecione o paciente</option>
             {pacientes && pacientes.map(paciente=>{
                return(
                <option value={paciente.id}>{paciente.nome}-{paciente.cpf}</option>
                        )
             })}
                </Form.Control>
              <Form.Control.Feedback type='invalid'>{errors.paciente}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group   md="10" controlId="validationFormik01">
              <Form.Label>Data da consulta</Form.Label>
              <Form.Control
                type="datetime-local"
                name="data"
                value={values.data}
                onChange={handleChange}
                isInvalid={errors.data||consultaError|| dataError}
                placeholder="Data"
                required
              />
              <Form.Control.Feedback type='invalid'>{errors.data}</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{dataError}</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{consultaError}</Form.Control.Feedback>

            </Form.Group>

            <div style={{display:'flex',justifyContent:'space-between'}}>
              <Button style={{backgroundColor:'#641864',borderColor:'black'}}  type="submit"  className="w-10 btn btn-sm btn-primary px-5 my-3 " >Save</Button>
            </div>
        </Form>
      )}
    </Formik> 

    </div>
    </div>
    <div  style={{display:'none'}}data-testid='test'></div>
    </div>
    )
}

export default MarcarConsultas