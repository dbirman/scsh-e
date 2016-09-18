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
	if (getSOITypeSun()) {
		renderShip(ship);
		var offset = [ship.x[2], ship.y[2]];
		var zoom = viewport.d/viewport.z;
		renderSun(sun,offset,zoom);
		renderPlanet(planet,offset,zoom);
	} else {

	}
}

function getSphereOfInfluence() {
	// Returns the object whose SOI we are under
	//
	// We will render everything *relative* to the SOI. If the SOI is a planet then that
	// planet will be "down". If the SOI is a sun then we will look down at the ship
	// from above. 
}

function clearScreen() {
	ctx.fillStyle="#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderShip_relative(ship) {
	// Render ship relative to a planet
}

function renderShip_down(ship) {
	// Render ship from above (relative to a solar system)
	ctx.fillStyle="#FFFFFF";
	// ctx.fillRect(ship.x[2],ship.y[2],10,10);
	ctx.fillRect(canvas.width/2-5,canvas.height/2-5,11,11);
}

function renderPlanet_down(planet,offset,zoom) {
	ctx.beginPath();
	ctx.strokeStyle="#FFFFFF";
	ctx.arc(canvas.width/2+(sun.x-offset[0])*zoom+planet.dist*Math.cos(planet.rot)*zoom,canvas.height/2+(sun.y-offset[1])*zoom+planet.dist*Math.sin(planet.rot)*zoom,zoom*planet.r,0,2*Math.PI);
	ctx.stroke();
}

function renderSun_down(sun,offset,zoom) {
  ctx.beginPath();
  ctx.strokeStyle="#FFFF00";
  ctx.arc(canvas.width/2+(sun.x-offset[0])*zoom,canvas.height/2+(sun.y-offset[1])*zoom, zoom*sun.r, 0, 2 * Math.PI);
  ctx.stroke();
}