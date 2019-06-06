import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

class NotFound extends Component {
  render() {
    return (
      <main>
        <header />
       <div> <center><div className="sempost">Post Removido ou não Encontrado</div></center>
       <Link to="/"><i class="fas fa-arrow-left color">Retornar para Pagina Inicial</i></Link>
        </div>
      </main>
    )
  }
}


export default NotFound