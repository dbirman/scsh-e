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
	// var down = getSOITypeSun();
	var down = isSOIsun();

	renderShip(ship,down);
	var offset = [ship.x[2], ship.y[2]];
	var zoom = viewport.d/viewport.z;
	renderSun(sun,offset,zoom,down);
	renderPlanet(planet,offset,zoom,down);
}

function isSOIsun() {
	px = Math.cos(planet.rot)*planet.dist;
	py = Math.sin(planet.rot)*planet.dist;
	var dPlanet = Math.hypot(ship.x[2]-px,ship.y[2]-py);
	var dSun = Math.hypot(ship.x[2]-sun.x,ship.y[2]-sun.y);
	if (dPlanet < (planet.r+planet.soi)) {
		return false;
	}
	return true;
}

function clearScreen() {
	ctx.fillStyle="#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderShip(ship,down) {
	if (down) {
		renderShip_down(ship);
	} else {
		renderShip_planet(ship);
	}
}

function renderPlanet(planet,offset,zoom,down) {
	if (down) {
		renderPlanet_down(planet,offset,zoom);
	} else {
		renderPlanet_planet(planet,offset,zoom);
	}
}

function renderSun(sun,offset,zoom,down) {
	if (down) {
		renderSun_down(sun,offset,zoom);
	}
}

function renderShip_down(ship) {
	// Render ship from above (relative to a solar system) 
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(canvas.width/2-5,canvas.height/2-5,11,11);
}

function renderShip_planet(ship) {
	// Render ship relative to the planet---we still draw the ship at the same place
	// but we will draw the planet "down" from it
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(canvas.width/2-5,canvas.height/2-5,11,11);
}

function renderPlanet_down(planet,offset,zoom) {
	ctx.beginPath();
	ctx.strokeStyle="#FFFFFF";
	ctx.arc(canvas.width/2+(sun.x-offset[0])*zoom+planet.dist*Math.cos(planet.rot)*zoom,canvas.height/2+(sun.y-offset[1])*zoom+planet.dist*Math.sin(planet.rot)*zoom,zoom*planet.r,0,2*Math.PI);
	ctx.stroke();
}

function renderPlanet_planet(planet,offset,zoom) {
	// Render the planet so that the center of the planet is always directly below us
	ctx.beginPath();
	ctx.strokeStyle="#FFFFFF";
	// Get the real x/y coordinates of the planet
	px = canvas.width/2+(sun.x-offset[0])*zoom+planet.dist*Math.cos(planet.rot)*zoom;
	py = canvas.height/2+(sun.y-offset[1])*zoom+planet.dist*Math.sin(planet.rot)*zoom;
	r = zoom*planet.r;
	// Now we will rotate the coordinates relative to the user
	ang = Math.atan2(px-ship.x[2],py-ship.y[2]);
	dang = Math.PI*1.5-ang; // the difference we need to rotate by
	hypot = Math.hypot(px-ship.x[2],py-ship.y[2]); // get the distance
	// get the final positions (rotated)
	tx = hypot*Math.cos(dang);
	ty = hypot*Math.sin(dang);
	console.log(ang);
}

function renderSun_down(sun,offset,zoom) {
  ctx.beginPath();
  ctx.strokeStyle="#FFFF00";
  ctx.arc(canvas.width/2+(sun.x-offset[0])*zoom,canvas.height/2+(sun.y-offset[1])*zoom, zoom*sun.r, 0, 2 * Math.PI);
  ctx.stroke();
}