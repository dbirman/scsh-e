
function simulate(elapsed) {
	simulateShip(elapsed);
	// Planet simulation
	planet.rot = (planet.rot+elapsed/planet.speed);
	if (planet.rot>(Math.PI*2)) {planet.rot-Math.PI*2;}
	if (planet.rot<0) {planet.rot+Math.PI*2;}
	// Change z
	if (keys.shift) {viewport.z+=elapsed/viewport.speed;}
	if (keys.ctrl) {viewport.z-=elapsed/viewport.speed;}
	if (viewport.z<viewport.d) {viewport.z = viewport.d;} // bottom out at d
}

function simulateShip(elapsed) {
	// Ship simulation
	ship_establishDir();
	ship.x[0] = ship.x[1]; ship.x[1] = ship.x[2];
	ship.y[0] = ship.y[1]; ship.y[1] = ship.y[2];
	ship.dir[0] = ship.dir[1]; ship.dir[1] = ship.dir[2];
	ship.dir[2] = ship.lastDir;
	ship.speedMult = ship.baseMult/(viewport.d/viewport.z);
	if (ship.lastDir!=null) {
		ship.x[2] = ship.x[1] + elapsed/ship.speedMult*Math.cos(ship.dir[2]);
		ship.y[2] = ship.y[1] + elapsed/ship.speedMult*Math.sin(ship.dir[2]);
	}
}