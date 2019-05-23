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

    window.location = '/' + category
  }

  render() {
    let categories = this.props.categories.categories

    return (


      <div className='container space'>
          <nav class="nav nav-pills flex-column flex-sm-row">
          <a class="flex-sm-fill text-sm-center nav-link separator" href="#"><Link to="/">Todas</Link>
          <i class="fas fa-angle-right teste32"></i>
          </a>
            {categories !== undefined && categories.map((category) => (
                <a class="flex-sm-fill text-sm-center nav-link separator" href="#">
              <Link to="#" onClick={this.handleSelectCategory} category={category.name}>{capitalize(category.name)}</Link>
              {category.name === 'udacity' ? null :   
                <i class="fas fa-angle-right teste32"></i> }
                </a> 
                  

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