import React from 'react';
import './SessionTimeoutModal.scss';

export class SessionTimeoutModal extends React.Component {
  modalThreshold = 20000;
  constructor(props) {
    super(props);
    this.state = {
      timerCount: 0,
      modalTimer: undefined
    };
  }

  componentWillMount() {
    if (typeof this.state.modalTimer !== 'undefined') {
      clearTimeout(this.state.modalTimer);
    }

    const newTimer = setInterval(() => {
      if (this.props.show) {
        this.setState({ timerCount: this.state.timerCount + 1 });
      }

      if (this.state.timerCount * 1000 === this.modalThreshold) {
        // automatically logged out
        this.props.handleLogout();
      }
    }, 1000);

    this.setState({ modalTimer: newTimer });
  }

  componentWillUnmount() {
    if (typeof this.state.modalTimer !== 'undefined') {
      clearTimeout(this.state.modalTimer);
    }
  }

  render() {
    const showHideClassName = this.props.show
      ? 'modal display-block'
      : 'modal display-none';

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          {this.props.children}
          <button onClick={this.props.handleContinue}>Stay Logged In</button>
          <button onClick={this.props.handleLogout}>
            Logout in (<span>{this.state.timerCount} secs</span>)
          </button>
        </section>
      </div>
    );
  }
}
