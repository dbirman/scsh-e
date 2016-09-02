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
	x:[0,0,150],
	y:[0,0,150],
	dir:[0,0,0],
	lastDir: null,
	speedMult: 10
}

var sun = {
	x:500,
	y:500,
	r:100,
	soi: 150
}

var planet = {
	dist:200,
	rot:Math.PI*1,
	speed:-5000,
	r:10,
	soi: 25
}

function simulate(elapsed) {
	// Ship simulation
	ship_establishDir();
	ship.x[0] = ship.x[1]; ship.x[1] = ship.x[2];
	ship.y[0] = ship.y[1]; ship.y[1] = ship.y[2];
	ship.dir[0] = ship.dir[1]; ship.dir[1] = ship.dir[2];
	ship.dir[2] = ship.lastDir;
	if (ship.lastDir!=null) {
		ship.x[2] = ship.x[1] + elapsed/ship.speedMult*Math.cos(ship.dir[2]);
		ship.y[2] = ship.y[1] + elapsed/ship.speedMult*Math.sin(ship.dir[2]);
	}
	// Planet simulation
	planet.rot = (planet.rot+elapsed/planet.speed);
	if (planet.rot>(Math.PI*2)) {planet.rot-Math.PI*2;}
	if (planet.rot<0) {planet.rot+Math.PI*2;}
	// Change z
	if (keys.shift) {viewport.z+=elapsed/viewport.speed;}
	if (keys.ctrl) {viewport.z-=elapsed/viewport.speed;}
	if (viewport.z<viewport.d) {viewport.z = viewport.d;} // bottom out at d
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