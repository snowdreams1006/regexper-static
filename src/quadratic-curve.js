class QuadraticCurve {
  constructor() {
    this.points = [];
    this.controlPoint = { x: 0, y: 0 };
  }

  addPoint({ x, y }) {
    const { x: cx, y: cy } = this.controlPoint;
    this.points.push({ x: x - cx, y: y - cy });

    if (this.points.length % 2 === 0) {
      this.controlPoint = { x, y };
    }

    return this;
  }

  toString() {
    return `q${ this.points.map(({ x, y }) => `${ x },${ y }`).join(' ') }`;
  }
}

export default QuadraticCurve;
