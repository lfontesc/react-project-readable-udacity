import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {  callLoadingCategories, callNewPost } from '../actions'
import { connect } from 'react-redux'
import { capitalize } from '../utils/utils'

class NewPost extends Component {
  componentDidMount() {
    this.props.callLoadingCategories()
  }

  handleNewPost = (e) => {
    e.preventDefault()

    let post = {
      id: Date.now(),
      timestamp: Date.now(),
      author: e.target.author.value,
      body: e.target.body.value,
      title: e.target.title.value,
      category: e.target.category.value
    }

    this.props.callNewPost(post)

    window.location = '/'
  }

  render() {
    let categories = this.props.categories.categories

    return (
      <main>
        <div className="voltar-btn-wrapper">
          <a><Link to="/">Voltar</Link></a>
        </div>
        
        <section className="main-content">
          <h3 className="post-form-title">Criar Postagem</h3>
          <form className="post-form" onSubmit={this.handleNewPost}>
            <div className="form-group">
              <label>Títle:</label>
              <input
                name="title"
                type="text"
                placeholder="Título"
                required
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                name="author"
                type="text"
                placeholder="Autor"
                required
              />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select name="category">
                <option value="">Select</option>
                {categories !== undefined && categories.map((category) => (
                  <option key={category.name} value={category.name}>{capitalize(category.name)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Body:</label>
              <textarea
                name="body"
              ></textarea>
            </div>
            <div className="form-group">
              <button>Create</button>
            </div>
          </form>
        </section>
      </main>
    )
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
})

export default connect(mapStateToProps, { callLoadingCategories, callNewPost })(NewPost)