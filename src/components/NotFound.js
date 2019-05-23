import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {
  render() {
    return (
      <main>
       <div> <p>Este conteúdo foi removido.</p>
            <Link to="/">Retornar para a página inicial</Link>
        </div>
      </main>
    )
  }
}


export default NotFound