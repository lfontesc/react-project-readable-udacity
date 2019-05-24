import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {  callLoadingCategories, callNewPost } from '../actions'
import { connect } from 'react-redux'
import { capitalize } from '../utils/utils'
import style from '../assets/style/style.css'


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
        <div class="setanewpost">
          <a class="color"><Link to="/"><i class="fas fa-arrow-left color"></i></Link></a>
        </div>
        
        <section id="box-newpost"className="main-content">
          <h3 className="post-form-title title-card">New Post</h3>

            <form onSubmit={this.handleNewPost}>
              <div class="form-group">
                <label for="exampleInputEmail1" className="roxo">Title</label>
                <input 
                type="text" 
                class="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Title"
                name="title" />
              </div>

              <div class="form-group">
                <label for="exampleInputPassword1" className="roxo">Author</label>
                <input 
                type="text" 
                class="form-control" 
                id="exampleInputPassword1" 
                placeholder="Author"
                name="author" />
              </div>
             
              <div class="form-group">
              <label for="inputState " className="roxo">Category</label>
              <select id="inputState" name="category" class="form-control">
                <option selected>Choose...</option>
                {categories !== undefined && categories.map((category) => (
                  <option key={category.name} value={category.name}>{capitalize(category.name)}</option>
                ))}
              </select>
            </div>
                  
            <div class="form-group">
              <label for="exampleFormControlTextarea1" className="roxo">Body: </label>
              <textarea name="body" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            
        <button type="submit" class="btn btn-roxo">Submit</button>
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