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
          <h4><span>Carlo</span> said:</h4>
          <h4>Posted on: <span>20 jan 2019</span></h4>
        </div>
        <div className="comment__body">
          <p>His putant aeterno interesset at. Usu ea mundi tincidunt, omnium virtute aliquando ius ex. Ea aperiri sententiae duo. Usu nullam dolorum quaestio ei, sit vidit facilisis ea. Per ne impedit iracundia neglegentur.</p>
        </div>
      </div>
    );
  }




export default Comment;
