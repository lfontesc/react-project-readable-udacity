import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callLoadingCategories, callEditPost, callLoadingPost } from '../actions'
import { connect } from 'react-redux'
import { capitalize } from '../utils/utils'

class EditPost extends Component {
  state = {
    title: '',
    author: '',
    category: '',
    body: ''
  }

  componentDidMount() {
    this.props.callLoadingCategories()
    this.props.callLoadingPost(this.props.match.params.id)

    let post = this.props.post.post

    this.setState({
      title: post.title,
      author: post.author,
      category: post.category,
      body: post.body
    })
  }

  componentWillReceiveProps(nextProps) {
    let post = nextProps.post.post

    this.setState({
      title: post.title,
      author: post.author,
      category: post.category,
      body: post.body
    })
  }

  handleEditPost = (e) => {
    e.preventDefault()

    let post = {
      id: this.props.match.params.id,
      timestamp: Date.now(),
      author: e.target.author.value,
      body: e.target.body.value,
      title: e.target.title.value,
      category: e.target.category.value
    }

    this.props.callEditPost(post)

    window.location = '/'
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let categories = this.props.categories.categories

    return (
      <main>
        <div className="voltar-btn-wrapper">
          <button><Link to="/">Voltar</Link></button>
        </div>
        <section className="main-content">
          <h3 className="post-form-title">Editar Postagem</h3>
          <form className="post-form" onSubmit={this.handleEditPost}>
            <div className="form-group">
              <label>Título:</label>
              <input
                name="title"
                type="text"
                placeholder="Título"
                required
                value={this.state.title}
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="form-group">
              <label>Autor:</label>
              <input
                name="author"
                type="text"
                placeholder="Autor"
                required
                value={this.state.author}
                onChange={(e) => this.handleInput(e)}
              />
            </div>
            <div className="form-group">
              <label>Categoria:</label>
              <select name="category" value={this.state.category} onChange={(e) => this.handleInput(e)}>
                <option value="">Selecione</option>
                {categories !== undefined && categories.map((category) => (
                  <option key={category.name} value={category.name}>{capitalize(category.name)}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Corpo:</label>
              <textarea name="body" value={this.state.body} onChange={(e) => this.handleInput(e)}/>
            </div>
            <div className="form-group">
              <button>Edit</button>
            </div>
          </form>
        </section>
      </main>
    )
  }
}

const mapStateToProps = ({ categories, post }) => ({
  categories,
  post
})

export default connect(mapStateToProps, { callLoadingCategories, callEditPost, callLoadingPost })(EditPost)