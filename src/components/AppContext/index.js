import React from 'react';
import PropTypes from 'prop-types';
import URLSearchParams from '@ungap/url-search-params';

const AppContext = React.createContext();

const toUrl = params => new URLSearchParams(params).toString();

const readURLHash = () => {
  const query = document.location.hash.slice(1);
  const params = new URLSearchParams(query);

  if (params.get('syntax')) {
    return {
      syntax: params.get('syntax'),
      expr: params.get('expr')
    };
  } else {
    // Assuming old-style URL
    return {
      syntax: 'js',
      expr: query || ''
    };
  }
};

const createSvgLink = async ({ svg }) => {
  try {
    const type = 'image/svg+xml';
    const blob = new Blob([svg], { type });

    return {
      url: URL.createObjectURL(blob),
      label: 'Download SVG',
      filename: 'image.svg',
      type
    };
  }
  catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
};

const createPngLink = async ({ svg, width, height }) => {
  try {
    const type = 'image/png';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const loader = new Image();

    loader.width = canvas.width = Number(width) * 2;
    loader.height = canvas.height = Number(height) * 2;

    await new Promise(resolve => {
      loader.onload = resolve;
      loader.src = 'data:image/svg+xml,' + encodeURIComponent(svg);
    });

    context.drawImage(loader, 0, 0, loader.width, loader.height);

    const blob = await new Promise(resolve => canvas.toBlob(resolve, type));

    return {
      url: URL.createObjectURL(blob),
      label: 'Download PNG',
      filename: 'image.png',
      type
    };
  }
  catch (e) {
    console.error(e); // eslint-disable-line no-console
  }
};

class AppContextProvider extends React.PureComponent {
  state = {}

  mutations = {
    svgData: async ({ svg, width, height }) => {
      if (svg !== this.state.svg) {
        this.setState({
          svg,
          svgLink: await createSvgLink({ svg }),
          pngLink: await createPngLink({ svg, width, height })
        });
      }
    },

    renderExpr: ({ syntax, expr }) => {
      if (expr) {
        document.location.hash = toUrl({ syntax, expr });
      }
    }
  }

  componentDidMount() {
    // Gatsby doesn't have document.location, so readURLHash can't be called
    // until here
    this.setState(readURLHash());

    window.addEventListener('hashchange', this.handleHashChange);
    this.handleHashChange();
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  handleHashChange = () => {
    const { expr, syntax } = readURLHash();

    if (!expr) {
      return;
    }

    this.setState({
      syntax,
      expr,
      permalinkUrl: document.location.toString()
    });

    if (this.props.onExpressionChange) {
      this.props.onExpressionChange({ syntax, expr });
    }
  }

  render() {
    const { children } = this.props;
    const context = {
      ...this.state,
      ...this.mutations
    };

    return <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>;
  }
}

AppContextProvider.propTypes = {
  onExpressionChange: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export { AppContextProvider };
export default AppContext;
