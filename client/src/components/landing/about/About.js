import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './About.scss';

export class About extends Component {
  render() {
    return (
      <div className="about">
        <ul>
          <li>
            <FontAwesomeIcon icon={faSearch} />
            Know what's happening around you
          </li>
          <li>Sell/Buy something from people around you</li>
        </ul>
      </div>
    );
  }
}
