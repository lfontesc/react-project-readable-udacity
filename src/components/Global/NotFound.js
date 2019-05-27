import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

class NotFound extends Component {
  render() {
    return (
      <main>
        <header />
       <div> <center><div className="sempost">Post Removido ou não Encontrado</div></center>
            <Link to="/">Retornar para a página inicial</Link>
        </div>
      </main>
    )
  }
}


export default NotFound