import React from 'react';
import {Route, Routes,BrowserRouter as Router} from 'react-router-dom';
import Medicos from './components/Medicos/Medicos'
import EditarMedicos from './components/Medicos/EditarMedicos';
import AdicionarMedicos from './components/Medicos/AdicionarMedicos'
import Pacientes from './components/Pacientes/Pacientes'
import EditarPaciente from './components/Pacientes/EditarPaciente'
import AdicionarPaciente from './components/Pacientes/AdicionarPacientes'
import Consultas from './components/Consultas/Consultas'
import Add from './components/Add'
import Edit from './components/Edit'
import './App.css';

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Consultas/>} />
          <Route exact path='/pacientes' element={<Pacientes/>} />
          <Route exact path='/paciente/edit/:id'  element={<EditarPaciente/>} />
          <Route exact path='/pacientes/adicionar' element={<AdicionarPaciente/>} />
          <Route exact path='/medicos' element={<Medicos/>} />
          <Route exact path='/medicos/adicionar' element={<AdicionarMedicos/>} />
          <Route exact path='/medico/edit/:id'  element={<EditarMedicos/>} />
          <Route exact path='/add'  element={<Add/>} />
              </Routes>
      </Router>
    </div>
  );
}
