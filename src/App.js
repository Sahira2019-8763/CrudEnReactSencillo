import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter, Form } from 'reactstrap';

const datos = [
  { id: 1, nombre: "Sahira", apellido: "Reyes" },
  { id: 2, nombre: "Emmanuel", apellido: "Figueroa" },
  { id: 3, nombre: "Tania", apellido: "Medina" },
  { id: 4, nombre: "Guillermo", apellido: "Guzman" },
  { id: 5, nombre: "Scarlet", apellido: "Reyes" },
  { id: 6, nombre: "Liliana", apellido: "Reyes" }

];


class App extends React.Component {
  state = {
    datos: datos,

    form: {
      id: '',
      nombre: '',
      apellido: ''
    },
    modalInsertar: false,
    modalEditar: false
  };

  handleChange= (e) =>{
    this.setState({

      form:{
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });


  }

  mostrarModalEditar=(registro)=>{
    this.setState({modalEditar: true, form: registro});
  }

  ocultarModalEditar=()=>{
    this.setState({modalEditar: false});
  }

  mostrarModalInsertar=()=>{
    this.setState({modalInsertar: true});
  }

  ocultarModalInsertar=()=>{
    this.setState({modalInsertar: false});
  }

  editar = (elemento) => {
    var contador = 0;
    var arreglo = this.state.datos;
    arreglo.map((registro) => {
      if (elemento.id == registro.id) {
        arreglo[contador].nombre = elemento.nombre;
        arreglo[contador].apellido = elemento.apellido;
      }
      contador++;
    });

    this.setState({ datos: arreglo, modalEditar: false });
  };

  eliminar = (elemento) =>{

    var opcion=window.confirm("¿Desea eliminar este registro?"+elemento.id);
    if(opcion){
      var contador=0;
      var arreglo = this.state.datos;
      arreglo.map((registro)=>{
        if(registro.id==elemento.id){
          arreglo.splice(contador, 1);
        }
        contador++;
      })
    };
    this.setState({datos: arreglo});
  }



  insertar=()=>{
    var valorNuevo={...this.state.form};
    valorNuevo.id=this.state.datos.length+1;
    var lista = this.state.datos;
    lista.push(valorNuevo);
    this.setState({datos: lista, modalInsertar: false});
  }

  render() {
    return (



      <><Container>

        <div id='titulo'>CRUD SENCILLO</div>

        
        <br />
        
        <Button color='primary' onClick={()=>this.mostrarModalInsertar()}>Insertar nuevo</Button>
        <br></br>

        <Table>
          <thead><tr><th>Id</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th></tr></thead>
          <tbody>
            {this.state.datos.map((elemento) => (
              <tr>
                <td>{elemento.id}</td>
                <td>{elemento.nombre}</td>
                <td>{elemento.apellido}</td>
                <td><Button color='warning' onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button> {" "}
                  <Button color='danger' onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>

              </tr>
            ))}

          </tbody>

        </Table>

      </Container>
      <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido: 
              </label>
              <input
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellido}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary" onClick={() => this.editar(this.state.form)}
              
            >
              Editar 
            </Button>
            <Button
              color="danger"
              onClick={() => this.ocultarModalEditar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>




        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input className='form-control' readOnly type="text" value={this.state.datos.length+1} />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>

              <input className="form-control" name="nombre" type="text" onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Apellido:</label>

              <input className="form-control" name="apellido" type="text" onChange={this.handleChange}/>
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button color='primary' onClick={()=>this.insertar()}>Insertar</Button>
            <Button color='danger' onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>

        </Modal></>





    )


  }


}

export default App;
