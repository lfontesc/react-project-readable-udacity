import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { callLoadingPost, callLoadingComments, callRemovePost, callVote } from '../actions'
import { connect } from 'react-redux'
import { capitalize } from '../utils/utils'
import Moment from 'moment'
import Comments from './Comments'

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

      window.location = '/'
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

    //if(post.error){
    //  return <Redirect to='/404/notfound' />
    //}
    return (
      <main>
           <div class="setanewpost2">
              <a class="color"><Link to="/"><i class="fas fa-arrow-left color"></i></Link></a>
           </div>
        <section className="post-wrapper">
          <div className="post-header">
            <div>
              <h3>{post.title}<span class="badge badge-secondary">  <Link className="categoria-item" to="#">
                 {post.category !== undefined && capitalize(post.category)}
              </Link></span></h3>

             <span>
                <i class="fas fa-user-circle"></i> <span> {post.author}</span> 
                <i class="far fa-clock"></i>{Moment.unix(post.timestamp/1000).format('DD/MM/YYYY')}
             </span>
           
            </div>
            <div className="votes-wrapper">
            <span>
                <i class="far fa-comment-dots likes"></i> <span class="roxo">{post.commentCount}</span>
             </span>
             <span class="espacos">
                <button type="button" onClick={() => this.handleVote(post.id, 'upVote')} class="btn far fa-thumbs-up likes2"></button>
                <span class="badge badge-secondary score">Score: {post.voteScore}</span> 
                <button type="button" onClick={() => this.handleVote(post.id, 'downVote')} class="btn far fa-thumbs-down likes2"></button>
             </span>             
           </div>
          </div>
          <hr/>
          <div className="post-body">
            {post.body}
          </div>
          <div>
               <a><Link to={`/posts/${post.id}/edit`}>  
                <i class="far fa-edit likes"></i>
                <span class="roxo"> Edit</span>
                </Link>
              </a>
              <a onClick={() => this.handleRemovePost(post.id)}>
                <i class="far fa-trash-alt likes"></i>
                <span class="roxo"> Delete</span>
              </a>          </div>
          <hr/>
        </section>
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