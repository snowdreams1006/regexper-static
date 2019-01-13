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

    loader.width = canvas.width = width * 2;
    loader.height = canvas.height = height * 2;

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

export { createSvgLink, createPngLink };
