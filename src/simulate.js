
function simulate(elapsed) {
	simulateShip(elapsed);
	simulatePlanet(elapsed);
	// Change z
	if (keys.shift) {viewport.z+=elapsed/viewport.speed;}
	if (keys.ctrl) {viewport.z-=elapsed/viewport.speed;}
	if (viewport.z<viewport.d) {viewport.z = viewport.d;} // bottom out at d
}

function simulatePlanet(elapsed) {
	// Planet simulation
	planet.rot = (planet.rot+elapsed/planet.speed);
	if (planet.rot>(Math.PI*2)) {planet.rot-Math.PI*2;}
	if (planet.rot<0) {planet.rot+Math.PI*2;}
}

function simulateShip(elapsed) {
	// Ship simulation
	ship.x[0] = ship.x[1]; ship.x[1] = ship.x[2];
	ship.y[0] = ship.y[1]; ship.y[1] = ship.y[2];
	ship_establishDir(elapsed);
}

function ship_establishDir(elapsed) {
	var delta = elapsed*ship.baseMult*ship.speedMult;
	if (keys.up) {ship.y[2]=ship.y[1]+delta;}
	if (keys.down) {ship.y[2]=ship.y[1]-delta;}
	if (keys.right) {ship.x[2]=ship.x[1]+delta;}
	if (keys.left) {ship.x[2]=ship.x[1]-delta;}
}