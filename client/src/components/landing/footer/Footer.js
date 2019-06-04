import React from 'react';
import './Footer.scss';

export function Footer(props) {
  return (
    <div className="footer">
      <div>&copy; {new Date().getFullYear()} Socio</div>
      <div>All rights reserved</div>
    </div>
  );
}
