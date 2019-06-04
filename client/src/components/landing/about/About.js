import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAd, faQuestion } from '@fortawesome/free-solid-svg-icons';

import './About.scss';

export class About extends Component {
  render() {
    return (
      <div className="about">
        <ul>
          <li>
            <FontAwesomeIcon icon={faSearch} />
            <span>Know what's happening around you.</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faAd} />
            <span>Sell/Buy from your neighbourhood.</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faQuestion} />
            <span>Let management know your queries.</span>
          </li>
        </ul>
      </div>
    );
  }
}
