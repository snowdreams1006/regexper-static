import React from 'react';

import { AppContextProvider } from 'components/AppContext';
import Form from 'components/Form';
import Loader from 'components/Loader';
import Message from 'components/Message';
import Render from 'components/Render';

class App extends React.PureComponent {
  state={}

  handleRender = ({ syntax, expr }) => {
    this.setState({ syntax, expr });
  }

  handleRetry = event => {
    event.preventDefault();
    this.handleRender(this.state);
  }

  render() {
    return <AppContextProvider onExpressionChange={ this.handleRender }>
      <Form />

      <Loader />

      <Message type="error" heading="Render Failure">
        <p>An error occurred while rendering the regular expression.</p>
        <a href="#retry" onClick={ this.handleRetry }>Retry</a>
      </Message>

      <Render />
    </AppContextProvider>;
  }
}

export default App;
