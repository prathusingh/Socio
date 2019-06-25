import React from 'react';
import './SessionTimeoutModal.scss';

export class SessionTimeoutModal extends React.Component {
  constructor({ handleContinue, handleLogout, show, threshold, children }) {
    super({ handleContinue, handleLogout, show, threshold, children });
    this.state = {
      currentTimerCount: 0
    };
  }

  componentWillMount() {
    setInterval(() => {
      this.setState({ currentTimerCount: this.state.currentTimerCount + 1 });

      if (this.state.currentTimerCount === this.threshold) {
        // automatically logged out
        this.handleLogout();
      }
    }, 1000);
  }
  render() {
    const showHideClassName = show
      ? 'modal display-block'
      : 'modal display-none';

    return (
      <div className={this.showHideClassName}>
        <section className="modal-main">
          {this.children}
          <button onClick={this.handleContinue}>Stay Logged In</button>
          <button onClick={this.handleLogout}>
            Logout (<span>{this.state.currentTimerCount}</span>)
          </button>
        </section>
      </div>
    );
  }
}
