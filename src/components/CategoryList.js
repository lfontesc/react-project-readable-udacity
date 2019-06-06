import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from '../utils/utils'
import { callLoadingCategories, selectCategory } from '../actions'
import { connect } from 'react-redux'
import style from '../assets/style/style.css'


class CategoryList extends Component {
  componentDidMount() {
    this.props.callLoadingCategories()
  }

  handleSelectCategory = (e) => {
    e.preventDefault()

    let category = e.target.attributes.getNamedItem('category').value

    this.props.selectCategory(category)

    
   // window.location = '/' + category
  }

  render() {
    let categories = this.props.categories.categories

    return (


      <div className='container space'>
          <nav class="nav nav-pills flex-column flex-sm-row">
          <Link class="flex-sm-fill text-sm-center nav-link separator" to="/">Todas
          <i class="fas fa-angle-right teste32"></i>
          </Link>
            {categories !== undefined && categories.map((category) => (
              <Link 
              to={`/${category.name}`} 
              category={category.name}
              class="flex-sm-fill text-sm-center nav-link separator"
              > {capitalize(category.name)}
              
             
              {category.name === 'udacity' ? null :   
                <i class="fas fa-angle-right teste32"></i> }
              </Link>   
                  

              ))}
          </nav>
      </div>

    )
  }
}

const mapStateToProps = ({ category, categories }) => ({
  category,
  categories
})

export default connect(mapStateToProps, { callLoadingCategories, selectCategory })(CategoryList)