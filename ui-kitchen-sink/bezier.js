/* bezier editor */
const svgSchema = "http://www.w3.org/2000/svg";
const BEZIER_KEYS = ["ep1", "cc1", "cc2", "ep2"];
const BEZIER_KEY_MAP = { ep1: 0, cc1: 1, cc2: 2, ep2: 3 };
class BezierEditor {
  #container;
  #svgElement;
  #pathOriginalCurve;
  #pathNewCurve;
  #pathControlLines;
  #controlPoints;
  #initialCurve;
  #curve;
  #interactive;
  #fixedEndPoints;

  #width = 100;
  #height = 100;
  #editing = "";
  #deNormPoint = {x: 0, y: 0};
  #downPoint = {x: 0, y: 0};

  constructor({mountPoint, initialCurve, interactive = true, fixedEndPoints = false} = {}) {
    this.#initialCurve = initialCurve;
    this.#interactive = interactive;
    this.#fixedEndPoints = fixedEndPoints;
    this.#curve = initialCurve.map(({x, y}) => ({x, y})); // clone!
    this.createDOM();
    this.mount(mountPoint);
  }

  createDOM() {
    // create the bezier editor container
    // <div class="cc-bezier-editor" style="position: absolute; trbl: 0; wh: 100%">
    const container = document.createElement("div");
    container.className = "cc-bezier-editor";
    container.style.position = "absolute";
    container.style.top = "0";
    container.style.left = "0";
    container.style.right = "0";
    container.style.bottom = "0";
    container.style.width = "100%";
    container.style.height = "100%";

    // create the paths and lines using SVG -- gotta have a container first
    const svgElement = document.createElementNS(svgSchema, "svg");

    // create the two curve elements
    const pathOriginalCurve = document.createElementNS(svgSchema, "path");
    pathOriginalCurve.setAttribute("class", "cc-bezier-original-curve");

    const pathNewCurve = document.createElementNS(svgSchema, "path");
    pathNewCurve.setAttribute("class", "cc-bezier-new-curve");

    // create the two lines indicating the end and control points
    const pathControlLines = [ 
      document.createElementNS(svgSchema, "path"),
      document.createElementNS(svgSchema, "path")
    ];
    pathControlLines.forEach(el => el.setAttribute("class", "cc-bezier-control-line"));

    // add to the svg element
    [pathOriginalCurve, pathNewCurve, ...pathControlLines].forEach(el => svgElement.appendChild(el));

    // create four control points
    const controlPoints = BEZIER_KEYS.map(key => {
      const el = document.createElement("div");
      el.className = "cc-bezier-point";
      el.setAttribute("data-key", key);
      el.setAttribute("tabindex", "0");
      return el;
    });
    // add to the container
    container.appendChild(svgElement);
    controlPoints.forEach(el => container.appendChild(el));

    const onresize = () => {
        this.#width = container.offsetWidth;
        this.#height = container.offsetHeight;
        console.log(this.#width, this.#height);
        this.redraw();
    }

    // set up for getting resize events
    if (navigator.userAgent.includes("UXP")) {
      container.addEventListener("resize", onresize);
    } else {
      window.addEventListener("resize", onresize);
      window.requestAnimationFrame(onresize);
    }

    // set up for managing dragging
    container.addEventListener("pointerdown", evt => {
      if (!this.#interactive) return;
      // pointer button is down -- may be start of editing a node
      const target = evt.target;
      const key = target.getAttribute("data-key");
      if (key) {
        if (this.#fixedEndPoints && key.startsWith("ep")) return;
        // user selected a control point!
        this.#editing = key; // ... and that's it, until the user moves the mouse
        this.#downPoint = {x: evt.clientX, y: evt.clientY};
        const normPoint = this.#curve[BEZIER_KEY_MAP[key]];
        this.#deNormPoint = {
          x: normPoint.x * this.#width,
          y: normPoint.y * this.#height
        };
      }
    });

    container.addEventListener("pointermove", evt => {
      if (!this.#interactive) return;
      // pointer moved; may be editing a node
      if (!this.#editing) return; // no node selected; bail early
      if (evt.buttons === 0 ) {
        this.#editing = "";
        return;                   // no button down? bail.
      }
      const delta = {
        x: evt.clientX - this.#downPoint.x,
        y: evt.clientY - this.#downPoint.y
      };
      const deNormPoint = {
        x: Math.max(Math.min(this.#deNormPoint.x + delta.x, this.#width), 0),
        y: Math.max(Math.min(this.#deNormPoint.y + delta.y, this.#height), 0)
      };
      this.#curve[BEZIER_KEY_MAP[this.#editing]] = {
        x: deNormPoint.x / this.#width,
        y: deNormPoint.y / this.#height
      };
      this.redraw();
    });

    container.addEventListener("pointerup", evt => {
      if (!this.#interactive) return;
      // pointer button is up -- done editing!
      this.#editing = "";
    });

    this.#container = container;
    this.#svgElement = svgElement;
    this.#pathOriginalCurve = pathOriginalCurve;
    this.#pathNewCurve = pathNewCurve;
    this.#pathControlLines = pathControlLines;
    this.#controlPoints = controlPoints;
  }

  mount(mountPoint) {
    // make sure the mount point is using relative positioning so our editor can
    // use absolute positioning to pin to the corners
    mountPoint.style.position = "relative";

    // add to the mount point
    mountPoint.appendChild(this.#container);
  }

  redraw() {
    // based upon the current width and height, place the curves and points
    // at the de-normalized positions.
    const denormalizePoint = ({x, y}) => ({
      x: x * this.#width,
      y: y * this.#height
    });
    
    const toCoords = ({x, y}) => `${x},${y}`;
    const toCurvedPath = pts => `M${toCoords(pts[0])} C${[...pts.slice(1)].map(toCoords).join(" ")}`;
    const toLinePath = pts => `M${toCoords(pts[0])} L${[...pts.slice(1)].map(toCoords).join(" ")}`;

    // get denormalized values
    const denormalizedOriginalCurve = this.#initialCurve.map(denormalizePoint);
    const denormalizedNewCurve = this.#curve.map(denormalizePoint);
    const denormalizedLines = [
      [ denormalizedNewCurve[0], denormalizedNewCurve[1] ],
      [ denormalizedNewCurve[2], denormalizedNewCurve[3] ]
    ];

    // update the SVG paths
    this.#pathOriginalCurve.setAttribute("d", toCurvedPath(denormalizedOriginalCurve));
    this.#pathNewCurve.setAttribute("d", toCurvedPath(denormalizedNewCurve));
    this.#pathControlLines.forEach((line,idx) => line.setAttribute("d", toLinePath(denormalizedLines[idx])));

    // and control point divs
    this.#controlPoints.forEach((pt, idx) => {
      pt.style.left = `${denormalizedNewCurve[idx].x}px`;
      pt.style.top = `${denormalizedNewCurve[idx].y}px`;
    });

    // make sure the svg element is the right size
    this.#svgElement.setAttribute("viewBox", `0 0 ${this.#width} ${this.#height}`);
  }
}

/*
const bezierEditor = new BezierEditor({
  mountPoint: document.querySelector("#bezier1"),
  initialCurve: [ {x:.1, y:.9}, {x:.1, y:.1}, {x:.9, y:.1}, {x: .9, y:.9} ]
})
*/

const bezierEditor = new BezierEditor({
  mountPoint: document.querySelector("#bezier1"),
  fixedEndPoints: true,
  initialCurve: [ {x:0, y:1}, {x:.1, y:.1}, {x:.9, y:.1}, {x: 1, y:0} ]
})