import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callLoadingComments, callNewComment, callRemoveComment, callVote } from '../actions'
import { connect } from 'react-redux'
import Moment from 'moment'
import sortBy from 'sort-by'

class Comments extends Component {
  state = {
    order: 'voteScore'
  }

  componentDidMount() {
    this.props.callLoadingComments(this.props.id)
  }

  handleNewComment = (e) => {
    e.preventDefault()

    let comment = {
      id: Date.now(),
      parentId: this.props.id,
      timestamp: Date.now(),
      author: e.target.author.value,
      body: e.target.body.value,
    }

    this.props.callNewComment(comment)

    window.location = '/posts/' + this.props.id
  }

  handleRemoveComment = (id) => {
    let confirm = window.confirm('Deseja mesmo excluir este registro?')

    if(confirm === true) {
      this.props.callRemoveComment(id)
    }

    window.location = '/posts/' + this.props.id
  }

  handleVote = (id, option) => {
    let data = {
      option: option
    }

    this.props.callVote(id, data, 'comments')
  }

  render() {
    let comments = this.props.comments.comments

    comments.sort(sortBy(`-${this.state.order}`))

    return (
      <section className="comentarios-wrapper">
        <ul>
          {comments !== undefined && comments.map((comment) => (
            <li key={comment.id} className="comment">
              <div><b>{comment.author} em {Moment.unix(comment.timestamp/1000).format('DD/MM/YYYY')}:</b></div>
              <div className="comentario-body">
                {comment.body}
              </div>
              <div className="comentario-footer">
                <div>
                  <button style={{'marginRight':'5px'}}><Link to={`/comments/${comment.id}/edit`}>Edit</Link></button>
                  <button onClick={() => this.handleRemoveComment(comment.id)}>Remove</button>
                </div>
                <div className="votes-wrapper">
                  <span>{comment.voteScore} votes</span>
                  <button style={{'marginRight':'5px'}} onClick={() => this.handleVote(comment.id, 'upVote')}>+1</button>
                  <button onClick={() => this.handleVote(comment.id, 'downVote')}>-1</button>
                </div>
              </div>
              <hr/>
            </li>
          ))}
        </ul>
        <hr/>
        <form className="comentario-form" onSubmit={this.handleNewComment}>
          <div style={{'marginBottom':'10px'}}><b>Submit Comment</b></div>
          <input name="author" type="text" placeholder="Autor" style={{'marginBottom':'10px'}} required/>
          <br/>
          <textarea name="body" placeholder="Corpo do comentário" required/>
          <br/>
          <button>Comentar</button>
        </form>
      </section>
    )
  }
}

const mapStateToProps = ({ comments, comment, order }) => ({
  comments,
  comment,
  order
})

export default connect(mapStateToProps, { callLoadingComments, callNewComment, callRemoveComment, callVote })(Comments)