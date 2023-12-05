import React from 'react';
import {Route, Routes,BrowserRouter as Router} from 'react-router-dom';
import Nav from './components/Nav/Nav'
import Medicos from './components/Medicos/Medicos'
import EditarMedicos from './components/Medicos/EditarMedicos';
import AdicionarMedicos from './components/Medicos/AdicionarMedicos'
import Pacientes from './components/Pacientes/Pacientes'
import EditarPaciente from './components/Pacientes/EditarPaciente'
import AdicionarPaciente from './components/Pacientes/AdicionarPacientes'
import Consultas from './components/Consultas/Consultas'
import MarcarConsultas from './components/Consultas/MarcarConsulta';
import DesmarcarConsulta from './components/Consultas/DesmarcarConsulta'
import Add from './components/Add'
import './App.css';

export default function App() {
  return (
    <div>
      <Router>
        <Nav/>
        <Routes>
          <Route exact path='/' element={<Consultas/>} />
          <Route exact path='/consultas/marcar' element={<MarcarConsultas/>} />
          <Route exact path='/consultas/desmarcar/:id' element={<DesmarcarConsulta/>} />
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
