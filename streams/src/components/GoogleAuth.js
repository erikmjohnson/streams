import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '256198939936-5932720cbl6i6m2ip077jlu8n0q4jvco.apps.googleusercontent.com',
          scope: 'email'
        }).then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    isSignedIn ? this.props.signIn(this.auth.currentUser.get().getId()) : this.props.signOut();
  };

  onSignInClick = () => this.auth.signIn();

  onSignOutClick = () => this.auth.signOut();

  renderAuthButton() {
    if(this.props.isSignedIn) {
      return (
      <button onClick={this.onSignOutClick} className="ui blue google button">
        <i className="google icon" />
        Sign Out
      </button>
      );
    }
    else {
      return (
        <button onClick={this.onSignInClick} className="ui blue google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return <div>{ this.renderAuthButton() }</div>
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signIn, signOut }
  )(GoogleAuth);
