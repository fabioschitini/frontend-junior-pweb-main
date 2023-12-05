import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,Form,Alert} from 'react-bootstrap';
import { Formik } from 'formik';
import { useNavigate,useLocation,useSearchParams } from "react-router-dom";
import * as yup from 'yup';
import { useState,useEffect } from 'react';
import { Link} from 'react-router-dom';
import { ReactComponent as KleverLogo } from '../assets/logo.svg';
import { ReactComponent as StarLogo } from '../assets/shooting-star.svg';
import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'http://localhost:8082/consulta-ms',
  });
const EditarMedicos=()=>{
  const [desmarcarError,setDesmarcarError]=useState(false)
  const location = useLocation();
  const filteredId=location.pathname.replace('/consultas/desmarcar/','');
  const navigate=useNavigate()

    const schema = yup.object().shape({
    motivo: yup.string().required("Esse campo é obrigatorio")
    });

  return(
        <div  style={{display:'flex',flexDirection:'center'}} className="container col-xl-10 col-xxl-8 px-4 py-5"> 
        <div style={{display:'flex',flex:'2'}} className="row align-items-center g-lg-5 py-5">
        <div  style={{display:'flex',flexDirection:'column',flexGap:'1rem'}} className="col-md-10 mx-auto col-lg-7"> 
        <div className='my-3' style={{display:'flex',justifyContent:'center'}}><KleverLogo style={{height:'3rem'}} /> </div>
        <div className='my-3' style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{display:'flex'}}>
            <StarLogo style={{height:'3rem',color:'white'}}/>
            <h2>Desmarcar consultas</h2> 
            </div>
          </div>
        <div className='my-3' style={{display:'flex',justifyContent:'space-between'}}><h5>Desmarcar consultas</h5>
        <Link to='/'> <Button style={{backgroundColor:'#641864',borderColor:'black'}} className="w-10 btn btn-sm btn-primary">Voltar</Button> </Link>
        </div>
        
       <Formik
        validator={() => ({})}
        validationSchema={schema}
        onSubmit={values=>{
            //console.log(filteredId)
            instance.put(`/consultas`,{consulta:filteredId,motivo:values.motivo}).then(datads=>{ 
               console.log(datads,'a info que retorna')
                navigate('/')
           })
              .catch(e=>console.log(e))
        }}
      initialValues={{
        motivo: '',
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
              <Form.Label>Motivo</Form.Label>
              <Form.Control
                as='select'
                name="motivo"
                value={values.motivo}
                onChange={handleChange}
                isInvalid={errors.motivo}
                placeholder="Email..."
                required
              >
              <option disabled value="">Selecione o motivo</option>
              <option value='PacienteDesistiu'>Paciente Desistiu</option>
              <option value='MedicoCancelou'>Medico Cancelou</option>
              <option value='Outros'>Outros</option>
                </Form.Control>
              <Form.Control.Feedback type='invalid'>{errors.motivo}</Form.Control.Feedback>
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

export default EditarMedicos