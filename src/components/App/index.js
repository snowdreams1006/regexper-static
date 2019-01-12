import React from 'react';

import { AppContextProvider } from 'components/App/context';
import Form from 'components/Form';
import Loader from 'components/Loader';
import Message from 'components/Message';
import SVG from 'components/SVG';

class App extends React.PureComponent {
  state={}

  handleRender = ({ syntax, expr }) => {
    console.log('Render:', syntax, expr); // eslint-disable-line no-console
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

      <SVG />
    </AppContextProvider>;
  }
}

export default App;
