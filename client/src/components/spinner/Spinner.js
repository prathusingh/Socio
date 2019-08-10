import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPuls } from '@fortawesome/free-solid-svg-icons';
import './Spinner.scss';

export function Spinner() {
  return (
    <span className="spinner">
      <i className="fa fa-spinner fa-spin" />
    </span>
  );
}
