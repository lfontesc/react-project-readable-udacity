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
import { capitalize } from '../utils/utils'
import style from '../assets/style/style.css'


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

        <div class="row rowespace">
        <div class="col-md-1"></div>
          <div class="col-md-10">
            <div class="dropdown dropsorted">
              <span class="sortedby">Sorted By </span> 
                <select className="form-control col-md-10" onChange={this.handleSelectOrder}>
                      <option value="voteScore">votes</option>
                      <option value="timestamp">Date</option>
                </select>
            </div>

          {posts == 0
            ? <center><div className="sempost">Nenhum Post encontrado</div></center> : console.log("tem posts")
          }
          {posts !== undefined && posts.map((post) => ( 

              <div class="card cardespace">
                  <div class="card-header">
                    <a>
                      <Link to={`/${post.category}/${post.id}`}> {post.title}</Link>
                    </a>
                  </div>
                  
              <div class="card-body">
                    <h5 class="card-title text-muted"> 
                    <i class="fas fa-user-circle"></i> <span> {post.author}</span> 
                    <i class="far fa-clock"></i>{Moment.unix(post.timestamp/1000).format('DD/MM/YYYY')}</h5>
                    <p class="card-text">{post.body}</p>
                </div>
              <div class="card-footer text-muted">
              <a><Link to={`/posts/${post.id}/edit`}>  
                <i class="far fa-edit likes"></i>
                <span class="roxo"> Edit</span>
                </Link>
              </a>
              <a onClick={() => this.handleRemovePost(post.id)}>
                <i class="far fa-trash-alt likes"></i>
                <span class="roxo"> Delete</span>
              </a>
                <span class="espacos">
                <i class="far fa-comment-dots likes"></i> <span class="roxo">{post.commentCount}</span>
                </span>
                <span class="espacos">
                <button type="button" onClick={() => this.handleVote(post.id, 'upVote')} class="btn far fa-thumbs-up likes2"></button>
                <span class="badge badge-secondary score">Score: {post.voteScore}</span> 
                <button type="button" onClick={() => this.handleVote(post.id, 'downVote')} class="btn far fa-thumbs-down likes2"></button>
                </span>
                <span class="badge badge-roxo">{capitalize(post.category)}</span>
                </div>
                
              </div>
            ))}
       
    </div>
    </div>
    )
  }
}

const mapStateToProps = ({ posts, post, order }) => ({
  posts,
  post,
  order
})

export default connect(mapStateToProps, { callLoadingPosts, callLoadingPostsByCategory, callRemovePost, selectOrder, callVote })(PostList)