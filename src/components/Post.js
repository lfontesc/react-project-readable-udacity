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
    const { post } = this.props
    let comments = this.props.comments.comments
    console.log(post.error)
    if(post.error){
      return <Redirect to='/404/notfound' />
    }
    return (
      <main>
        <div className="voltar-btn-wrapper">
          <button><Link to="/">Back</Link></button>
        </div>
        <section className="post-wrapper">
          <div className="post-header">
            <div>
              <h3>{post.title}</h3>
              <span className="small">
                Por {post.author} em {Moment.unix(post.timestamp/1000).format('DD/MM/YYYY')}
              </span>
              <Link className="categoria-item" to="#">
                {post.category !== undefined && capitalize(post.category)}
              </Link>
            </div>
            <div className="votes-wrapper">
              <span>{comments.length} comments | </span>
              <span>{post.voteScore} votos</span>
              <button style={{'marginRight':'5px'}} onClick={() => this.handleVotar(post.id, 'upVote')}>+1</button>
              <button onClick={() => this.handleVotar(post.id, 'downVote')}>-1</button>
            </div>
          </div>
          <hr/>
          <div className="post-body">
            {post.body}
          </div>
          <div>
            <button style={{ 'marginRight':'5px' }}><Link to={`/posts/${post.id}/edit`}>Edit</Link></button>
            <button onClick={() => this.handleRemovePost(post.id)}>Remove</button>
          </div>
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