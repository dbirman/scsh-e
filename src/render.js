// Functions for rendering

function tick() {
	// Timing
	var cTick = Date.now();
	var elapsed = cTick - lastTick;
	lastTick = cTick;

	// Run simulation
	simulate(elapsed);

	render(state);

	window.requestAnimationFrame(tick);
}

function render() {
	clearScreen();
	renderShip(ship);
	var offset = [ship.x[2], ship.y[2]];
	var zoom = viewport.d/viewport.z;
	renderSun(sun,offset,zoom);
	renderPlanet(planet,offset,zoom);
}

function clearScreen() {
	ctx.fillStyle="#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function renderShip(ship) {
	ctx.fillStyle="#FFFFFF";
	// ctx.fillRect(ship.x[2],ship.y[2],10,10);
	ctx.fillRect(canvas.width/2-5,canvas.height/2-5,11,11);
}

function renderPlanet(planet,offset,zoom) {
	ctx.beginPath();
	ctx.strokeStyle="#FFFFFF";
	ctx.arc(canvas.width/2+(sun.x-offset[0])*zoom+planet.dist*Math.cos(planet.rot)*zoom,canvas.height/2+(sun.y-offset[1])*zoom+planet.dist*Math.sin(planet.rot)*zoom,zoom*planet.r,0,2*Math.PI);
	ctx.stroke();
}

function renderSun(sun,offset,zoom) {
  ctx.beginPath();
  ctx.strokeStyle="#FFFF00";
  ctx.arc(canvas.width/2+(sun.x-offset[0])*zoom,canvas.height/2+(sun.y-offset[1])*zoom, zoom*sun.r, 0, 2 * Math.PI);
  ctx.stroke();
}