import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { capitalize } from '../utils/utils'
import { callLoadingCategories, selectCategory } from '../actions'
import { connect } from 'react-redux'

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
      <section className="categorias-wrapper">
        <h3>Categories</h3>
        <ul className="categorias-list">
          <li><Link to="/">Todas</Link></li>
          {categories !== undefined && categories.map((category) => (
            <li key={category.name}><Link to="#" onClick={this.handleSelectCategory} category={category.name}>{capitalize(category.name)}</Link></li>
          ))}
        </ul>
      </section>
    )
  }
}

const mapStateToProps = ({ category, categories }) => ({
  category,
  categories
})

export default connect(mapStateToProps, { callLoadingCategories, selectCategory })(CategoryList)