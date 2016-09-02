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
	x:[0,0,2000],
	y:[0,0,0],
	dir:[0,0,0],
	lastDir: null,
	baseMult: 1,
	speedMult: 10
}

var sun = {
	x:0,
	y:0,
	r:1000,
	soi: 150
}

var planet = {
	dist:2000,
	rot:0,
	speed:-100000,
	r:500,
	soi: 25
}

// function inSOI(object) {
// 	if (ship.x > object) {

// 	}
// }

// Launch the code
function readyplayerone() {
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

function ship_establishDir() {
	var nX=0, nY=0;
	if (keys.up) {nY+=1;}
	if (keys.down) {nY-=1;}
	if (keys.right) {nX+=1;}
	if (keys.left) {nX-=1;}
	if (nX==0 && nY==0) {
		ship.lastDir=null;
	} else {
		ship.lastDir = Math.atan2(nY,nX);
	}
}