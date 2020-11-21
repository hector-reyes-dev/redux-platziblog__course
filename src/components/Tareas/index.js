import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as tareasActions from "../../actions/tareasActions";
import Spinner from "../general/Spinner";
import Fatal from "../general/Fatal";

class Tareas extends Component {
  componentDidMount() {
    if (!Object.keys(this.props.tareas).length) {
      this.props.traerTodas();
    }
  }
  componentDidUpdate() {
    const { tareas, cargando, traerTodas } = this.props;
    if (!Object.keys(tareas).length && !cargando) {
      traerTodas();
    }
  }

  mostrarContenido = () => {
    const { tareas, cargando, error } = this.props;

    if (cargando) {
      return <Spinner />;
    }
    if (error) {
      return <Fatal mensaje={error} />;
    }

    return Object.keys(tareas).map((usr_id) => (
      <div key={usr_id}>
        <h2>Usuario {usr_id}</h2>
        <div className="contenedor_tareas">{this.ponerTareas(usr_id)}</div>
      </div>
    ));
  };

  ponerTareas = (usr_id) => {
    const { tareas, cambioCheck, eliminar } = this.props;
    const por_usuario = {
      ...tareas[usr_id],
    };

    return Object.keys(por_usuario).map((tar_id) => (
      <div key={tar_id}>
        <input
          type="checkbox"
          defaultChecked={por_usuario[tar_id].completed}
          onChange={() => cambioCheck(usr_id, tar_id)}
        />
        {por_usuario[tar_id].title}
        <button className="m_left">
          <Link to={`/tareas/guardar/${usr_id}/${tar_id}`}>Editar</Link>
        </button>
        <button className="m_left" onClick={() => eliminar(tar_id)}>
          Eliminar
        </button>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <button>
          <Link to="/tareas/guardar">Agregar tarea</Link>
        </button>
        {this.mostrarContenido()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
