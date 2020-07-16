// Repeat nodes are for the various repetition syntaxes (`a*`, `a+`, `a?`, and
// `a{1,3}`). It is not rendered directly, but contains data used for the
// rendering of [MatchFragment](./match_fragment.html) nodes.

function formatTimes(times) {
  return `${times} 次`;
}

export default {
  definedProperties: {
    // Translation to apply to content to be repeated to account for the loop
    // and skip lines.
    contentPosition: {
      get: function() {
        var matrix = Snap.matrix();
        if (this.hasSkip) {
          return matrix.translate(15, 10);
        } else if (this.hasLoop) {
          return matrix.translate(10, 0);
        } else {
          return matrix.translate(0, 0);
        }
      }
    },

    // label: {
    //   get: function() {
    //     if (this.minimum === this.maximum) {
    //       if (this.minimum === 0) {
    //         return undefined;
    //       }
    //       return formatTimes(this.minimum - 1);
    //     } else if (this.minimum <= 1 && this.maximum >= 2) {
    //       return `at most ${formatTimes(this.maximum - 1)}`;
    //     } else if (this.minimum >= 2) {
    //       if (this.maximum === -1) {
    //         return `${this.minimum - 1}+ times`;
    //       } else {
    //         return `${this.minimum - 1}\u2026${formatTimes(this.maximum - 1)}`;
    //       }
    //     }
    //   }
    // },


    // Label to place of loop path to indicate the number of times that path
    // may be followed.
    label: {
      get: function() {
        if (this.minimum === this.maximum) {
          if (this.minimum === 0) {
            return '直接跳过';
          }
          return `匹配 ${formatTimes(this.minimum)}`;
        } else {
          // repeat_any_spec * {0,-1} {0,} 匹配零次或多次
          if (this.minimum === 0 && this.maximum === -1) {
            return '匹配零次或多次';
          }
          // repeat_optional_spec ? {0,1} 匹配零次或一次
          if (this.minimum === 0 && this.maximum === 1) {
            return '匹配零次或一次';
          }
          // repeat_required_spec + {1,-1} {1,} 至少匹配一次
          if (this.minimum === 1 && this.maximum === -1) {
            return '至少匹配一次';
          }
          if (this.maximum === -1) {
            return `至少匹配 ${formatTimes(this.minimum)}`;
          } else {
            return `匹配 ${this.minimum} 到 ${formatTimes(this.maximum)}`;
          }
        }
      }

      // if (this.minimum === this.maximum) {
      //     if (this.minimum === 0) {
      //       return '直接跳过';
      //     }
      //     return `匹配 ${formatTimes(this.minimum)}`;
      //   } else if (this.minimum <= 1 && this.maximum >= 2) {
      //     return `at most ${formatTimes(this.maximum - 1)}`;
      //   } else if (this.minimum >= 2) {
      //     if (this.maximum === -1) {
      //       return `${this.minimum - 1}+ times`;
      //     } else {
      //       return `${this.minimum - 1}\u2026${formatTimes(this.maximum - 1)}`;
      //     }
      //   }
      // }

    },

    // Tooltip to place of loop path label to provide further details.
    tooltip: {
      get: function() {
        let repeatCount;
        if (this.minimum === this.maximum) {
          if (this.minimum === 0) {
            repeatCount = '直接跳过';
          } else {
            repeatCount = `匹配 ${formatTimes(this.minimum)}`;
          }
        } else {
          if (this.maximum === -1) {
            repeatCount = `至少匹配 ${formatTimes(this.minimum)}`;
          } else {
            repeatCount = `匹配 ${formatTimes(this.minimum)} ~ ${formatTimes(this.maximum)}`;
          }
        }
        return repeatCount;
      }
    }
  },

  // Returns the path spec to render the line that skips over the content for
  // fragments that are optionally matched.
  skipPath(box) {
    let paths = [];

    if (this.hasSkip) {
      let vert = Math.max(0, box.ay - box.y - 10),
          horiz = box.width - 10;

      paths.push(`M0,${box.ay}q10,0 10,-10v${-vert}q0,-10 10,-10h${horiz}q10,0 10,10v${vert}q0,10 10,10`);

      // When the repeat is not greedy, the skip path gets a preference arrow.
      if (!this.greedy) {
        paths.push(`M10,${box.ay - 15}l5,5m-5,-5l-5,5`);
      }
    }

    return paths;
  },

  // Returns the path spec to render the line that repeats the content for
  // fragments that are matched more than once.
  loopPath(box) {
    let paths = [];

    if (this.hasLoop) {
      let vert = box.y2 - box.ay - 10;

      paths.push(`M${box.x},${box.ay}q-10,0 -10,10v${vert}q0,10 10,10h${box.width}q10,0 10,-10v${-vert}q0,-10 -10,-10`);

      // When the repeat is greedy, the loop path gets the preference arrow.
      if (this.greedy) {
        paths.push(`M${box.x2 + 10},${box.ay + 15}l5,-5m-5,5l-5,-5`);
      }
    }

    return paths;
  },

  setup() {
    this.minimum = this.properties.spec.minimum;
    this.maximum = this.properties.spec.maximum;
    this.greedy = (this.properties.greedy.textValue === '');
    this.hasSkip = (this.minimum === 0);
    this.hasLoop = (this.maximum === -1 || this.maximum > 1);
  }

}
