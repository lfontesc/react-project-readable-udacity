import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { callLoadingComments, callNewComment, callRemoveComment, callVote } from '../../actions'
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
    this.props.callLoadingComments(this.props.id)

  //  window.location = '/posts/' + this.props.id
  }

  handleRemoveComment = (id) => {
    let confirm = window.confirm('Deseja mesmo excluir este registro?')

    if(confirm === true) {
      this.props.callRemoveComment(id)
    }

    this.props.callLoadingComments(this.props.id)

    //  window.location = '/posts/' + this.props.id
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
      
     <div class="comments" >
     <span class="textcomment"><h3 class="textcomment">Comments</h3></span> <hr></hr>
        <ul class="list-group list-group-flush">
          {comments !== undefined && comments.map((comment) => (
            <li key={comment.id} class="list-group-item">
              <div>
              <span>
                <i class="fas fa-user-circle"></i> <span> {comment.author}</span> 
                <i class="far fa-clock"></i>{Moment.unix(comment.timestamp/1000).format('DD/MM/YYYY')}
             </span>              </div>
              <div>
                {comment.body}
              </div>
              <div>
                <div>

                <a><Link to={`/comments/${comment.id}/edit`}>  
                <i class="far fa-edit likes4"></i>
                <span class="roxo"> Edit</span>
                </Link>
              </a>
              <a onClick={() => this.handleRemoveComment(comment.id)}>
                <i class="far fa-trash-alt likes5"></i>
                <span class="roxo"> Delete</span>
              </a>          
             </div>
                <div className="votes-wrapper">
                  <button type="button" onClick={() => this.handleVote(comment.id, 'upVote')} class="btn far fa-thumbs-up likes3"></button>
                  <span class="badge badge-secondary score">Score: {comment.voteScore}</span> 
                  <button type="button" onClick={() => this.handleVote(comment.id, 'downVote')} class="btn far fa-thumbs-down likes3"></button>
                </div>
              </div>
              <hr/>
            </li>
          ))}
        </ul>
        <hr/>
        <form id="box-newpost" class="comment-form" onSubmit={this.handleNewComment}>
          <div class="roxo"><b>Submit New Comment</b></div>
          <hr></hr>
          <div class="form-group col-md-12">
                <label for="exampleInputEmail1" className="roxo">Author</label>
                <input 
                type="text" 
                class="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Author"
                name="author" />
          </div>

          <div class="form-group col-md-12">
            <label for="exampleFormControlTextarea1" className="roxo">Body: </label>
            <textarea name="body" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
            <hr></hr>
          <button class="btn btn-roxo">Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ comments, comment, order }) => ({
  comments,
  comment,
  order
})

export default connect(mapStateToProps, { callLoadingComments, callNewComment, callRemoveComment, callVote })(Comments)