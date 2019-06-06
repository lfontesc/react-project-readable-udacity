import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callLoadingCategories, callEditPost, callLoadingPost } from '../../actions'
import { connect } from 'react-redux'
import { capitalize } from '../../utils/utils'

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

    this.props.history.push("/")
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
       <div class="setanewpost">
          <a class="color"><Link to="/"><i class="fas fa-arrow-left color"></i></Link></a>
       </div>

       <section id="box-newpost"className="main-content">
          <h3 className="post-form-title title-card">Edit Post</h3>

            <form onSubmit={this.handleEditPost}>
              <div class="form-group">
                <label for="exampleInputEmail1" className="roxo">Title</label>
                <input 
                type="text" 
                class="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={(e) => this.handleInput(e)}
                 />
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1" className="roxo">Author</label>
                <input 
                type="text" 
                class="form-control" 
                id="exampleInputPassword1" 
                placeholder="Author"
                name="author" 
                value={this.state.author}
                onChange={(e) => this.handleInput(e)}
                />
              </div>
             
              <div class="form-group">
              <label for="inputState " className="roxo">Category</label>
              <select id="inputState" name="category" value={this.state.category} onChange={(e) => this.handleInput(e)} class="form-control">
                <option selected>Choose...</option>
                {categories !== undefined && categories.map((category) => (
                  <option key={category.name} value={category.name}>{capitalize(category.name)}</option>
                ))}
              </select>
            </div>
                  
            <div class="form-group">
              <label for="exampleFormControlTextarea1" className="roxo">Body: </label>
              <textarea name="body"  value={this.state.body} onChange={(e) => this.handleInput(e)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            
        <button type="submit" class="btn btn-roxo">Submit</button>
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