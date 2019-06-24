import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Spinner.scss';

export function Spinner() {
  return (
    <span className="spinner">
      <FontAwesomeIcon icon={faSpinner} />
    </span>
  );
}
