import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { 
    callLoadingPosts,
    callLoadingPostsByCategory,
    callRemovePost,
    selectOrder,
    callVote
 } from '../actions'
import Moment from 'moment'
import sortBy from 'sort-by'

class PostList extends Component {
  state = {
    order: 'voteScore'
  }

  componentDidMount() {
    let category = this.props.match.params.category

    if(category === undefined) {
      this.props.callLoadingPosts()
    } else {
      this.props.callLoadingPostsByCategory(category)
    }
  }

  componentWillReceiveProps(nextProps) {
    let order = nextProps.order.order

    this.setState({
      order: order
    })
  }

  handleRemovePost = (id) => {
    let confirm = window.confirm('Deseja mesmo excluir este registro?')

    if(confirm === true) {
      this.props.callRemovePost(id)
    }
  }

  handleSelectOrder = (e) => {
    let order = e.target.value

    this.props.selectOrder(order)
  }

  handleVote = (id, option) => {
    let data = {
      option: option
    }

    this.props.callVote(id, data, 'posts')
  }

  render() {
    let posts = this.props.posts.posts

    posts.sort(sortBy(`-${this.state.order}`))

    return (
      <section className="posts-table-wrapper">
        <div className="h3-wrapper">
          <h3>All Posts</h3>
          
          <div className="ordenar-por">
            <label>Order by:</label>
            <select onChange={this.handleSelectOrder}>
              <option value="voteScore">votes</option>
              <option value="timestamp">Date</option>
            </select>
          </div>
          <button><Link to="/posts/new">New Post</Link></button>
        </div>
        <table className="posts-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Comments</th>
              <th>Votes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts !== undefined && posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.author}</td>
                <td>{Moment.unix(post.timestamp/1000).format('DD/MM/YYYY')}</td>
                <td>{post.commentCount}</td>
                <td>
                  <span style={{ 'marginRight':'5px' }}>{post.voteScore}</span>
                  <button style={{ 'marginRight':'5px' }} onClick={() => this.handleVote(post.id, 'upVote')}>+1</button>
                  <button onClick={() => this.handleVote(post.id, 'downVote')}>-1</button>
                </td>
                <td>
                  <button style={{ 'marginRight':'5px' }}><Link to={`/${post.category}/${post.id}`}>More Info</Link></button>
                  <button style={{ 'marginRight':'5px' }}><Link to={`/posts/${post.id}/edit`}>Edit</Link></button>
                  <button onClick={() => this.handleRemovePost(post.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  }
}

const mapStateToProps = ({ posts, post, order }) => ({
  posts,
  post,
  order
})

export default connect(mapStateToProps, { callLoadingPosts, callLoadingPostsByCategory, callRemovePost, selectOrder, callVote })(PostList)