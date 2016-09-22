var renderer;


// A variable that will store the state of the world for the client
var state, canvas, ctx;
var lastTick = Date.now();
var keys = {};

var viewport = {
	// The viewport works as follows:
	// At dist "d" we would draw the actual pixel view, at any other distance we use
	// d/z as a multiplier on the sizes of objects
	d:10,
	z:10,
	speed: 100
}

var ship = {
	// note that x and y are calculated relative to the current sphere of influence
	// when the sphere jumps, so do the x/y positions
	x:[0,0,1399],
	y:[0,0,0],
	// dir:[0,0,0],
	// lastDir: null,
	baseMult: 0.2,
	speedMult: 1
}

var sun = {
	x:0,
	y:0,
	r:1000,
}

var planet = {
	dist:2000,
	rot:0,
	speed:-100000,
	r:500,
	soi: 100
}

// function inSOI(object) {
// 	if (ship.x > object) {

// 	}
// }

// Launch the code
function readyplayerone() {
	var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);

	// The renderer will create a canvas element for you that you can then insert into the DOM.
	document.body.appendChild(renderer.view);

	return;
	// variables
	keys.up=false;keys.left=false;keys.right=false;keys.down=false;
	// graphics
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
	// add the event listener
	document.addEventListener("keydown", keydown, false);
	document.addEventListener("keyup", keyup, false);
	document.addEventListener("blur", clearKeys, false);


	tick();
}

// Key watcher
function keydown(event) {
	changeKeys(event,true);
}
function keyup(event) {
	changeKeys(event,false);
}

function changeKeys(event,type) {
	if (event.keyCode==87) {keys.down=type;}
	if (event.keyCode==65) {keys.left=type;}
	if (event.keyCode==68) {keys.right=type;}
	if (event.keyCode==83) {keys.up=type;}
	if (event.keyCode==16) {keys.shift=type;}
	if (event.keyCode==17) {keys.ctrl=type;}
}

function clearKeys() {
	keys.down=false;keys.left=false;keys.right=false;keys.up=false;keys.shift=false;keys.ctrl=false;
}