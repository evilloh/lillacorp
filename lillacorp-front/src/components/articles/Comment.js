import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';


function Comment (props) {
  const [comment, setComment] = useState({})

  useEffect(() => {
    setComment(props.comment)
  })

    return (
      <div className="comment__container">
        <div className="comment__header">
          <h4><span>{props.author ? props.author.username : null}</span> said:</h4>
          <h4>Posted on: <span>{props.createdAt}</span></h4>
        </div>
        <div className="comment__body">
          <p>{props.body}</p>
        </div>
      </div>
    );
  }




export default Comment;
