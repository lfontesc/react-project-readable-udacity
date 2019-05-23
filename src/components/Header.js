import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from '../assets/style/style.css'

class Header extends Component {
  render() {
    return ( 

        <div>
        <nav className="navbar navbar-light teste2">
          <a class="navbar-brand" href="/">
          <i class="fab fa-react"></i>
             <span className="teste"> Readable</span>
          </a>

           <a class="navbar-brand testeborda" href="/posts/new">
          <i class="fas fa-plus-circle newpost"></i>
             <span className="newpost"> New Post </span>
          </a>
       
        </nav>
        
      </div>

        
    )
  }
}

export default Header