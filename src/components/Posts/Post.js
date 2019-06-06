import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { callLoadingPost, callLoadingComments, callRemovePost, callVote } from '../../actions'
import { connect } from 'react-redux'
import { capitalize } from '../../utils/utils'
import Moment from 'moment'
import Comments from '../Comments/Comments'
import NotFound from '../Global/NotFound'

class Post extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.callLoadingPost(id)
    this.props.callLoadingComments(id)
  }

  handleRemovePost = (id) => {
    let confirm = window.confirm('Deseja mesmo excluir este registro?')

    if(confirm === true) {
      this.props.callRemovePost(id)

      this.props.history.push("/")
    }
  }

  handleVote = (id, option) => {
    let data = {
      option: option
    }

    this.props.callVote(id, data, 'posts', true)
  }

  render() {
    //const { post } = this.props
    let comments = this.props.comments.comments
    let post = this.props.post.post
    if(post.error | post.id === undefined){
      return <NotFound />
    }

    return (
      <main>
           <div class="setanewpost2">
              <a class="color"><Link to="/"><i class="fas fa-arrow-left color"></i></Link></a>
           </div>
           <div class="card">
              <div class="card-header">
                <h3>
                  {post.title}<span class="badge badge-secondary tag">  <Link className="categoria-item" to="#">
                  {post.category !== undefined && capitalize(post.category)}
                  </Link></span>
                </h3>
              </div>
              <div class="card-body">
                  <h5 class="card-title">
                    <span>
                      <i class="fas fa-user-circle"></i> <span> {post.author}</span> 
                      <i class="far fa-clock"></i>{Moment.unix(post.timestamp/1000).format('DD/MM/YYYY')}
                    </span>
                  </h5>
                  <p class="card-text">
                  {post.body}                  
                  </p>
                  <div>
               <a><Link to={`/posts/${post.id}/edit`}>  
                <i class="far fa-edit likes4"></i>
                <span class="roxo"> Edit</span>
                </Link>
              </a>
              <a onClick={() => this.handleRemovePost(post.id)}>
                <i class="far fa-trash-alt likes5"></i>
                <span class="roxo"> Delete</span>
              </a>          </div>
              </div>

              <div class="card-footer">
                <small class="text-muted">
                <span>
                <i class="far fa-comment-dots likes4"></i> <span class="roxo">{post.commentCount}</span>
             </span>
             <span>
                <button type="button" onClick={() => this.handleVote(post.id, 'upVote')} class="btn far fa-thumbs-up likes3"></button>
                <span class="badge badge-secondary score">Score: {post.voteScore}</span> 
                <button type="button" onClick={() => this.handleVote(post.id, 'downVote')} class="btn far fa-thumbs-down likes3"></button>
             </span> 
                </small>
              </div>
          </div>
        <Comments id={this.props.match.params.id}/>
      </main>
    )
  }
}

const mapStateToProps = ({ post, comments, error }) => ({
  post,
  comments,
  error
})

export default connect(mapStateToProps, { callLoadingPost, callLoadingComments, callRemovePost, callVote })(Post)