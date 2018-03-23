
class ArmRenderer {
    constructor(canvas_id) {
	this.canvas = document.getElementById(canvas_id)
	this.ctx = this.canvas.getContext("2d")
	this.arm = arm
	this.fitParent()
	window.addEventListener('resize', this.fitParent())
	this.onFrame()
    }
    
    draw() {
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	this.ctx.fillStyle = "#FF6030"
	this.ctx.beginPath()
	this.ctx.translate(this.canvas.width/2, this.canvas.height)
	const m = Math.min(this.canvas.width, this.canvas.height)
	this.ctx.scale(m, m)
	this.ctx.moveTo(0, 0)
	const angles = this.arm.angles
	const lineLen = -1 / (angles.length + 1)
	for (const angle of angles) {
	    this.ctx.lineTo(0, lineLen)
	    this.ctx.translate(0, lineLen)
	    this.ctx.rotate(angle)
	}
	this.ctx.lineTo(0, lineLen)
	this.ctx.setTransform(1, 0, 0, 1, 0, 0)
	this.ctx.stroke()
    }

    fitParent() {
	this.canvas.width = this.canvas.parentElement.clientWidth
	this.canvas.height = this.canvas.parentElement.clientHeight
    }

    onFrame() {
	this.draw()
	window.requestAnimationFrame(() => this.onFrame())
    }
}

class Arm {
    constructor() {
	this.angles = [0.5, -1/2, 1]
	this.velocities = [0, 0, 0]
    }
    centerOfMass(i) { // This is local center of mass, we need global
	i = i || 0
	const lineCenter = [0, 1/2]
	const local = i == this.angles.length - 1
	      ? lineCenter
	      : add(lineCenter, this.centerOfMass(i + 1))
	return rotate(local, this.angles[i])
    }
    torque(i) { // This is not done
	let globalAngle = this.angles[i]
	for (let j = i - 1; j != 0; j--) {
	    globalAngle += this.angles[j]
	}
	const c = this.centerOfMass(i)
	const r = mag(c)
    }
}

const arm = new Arm()

const ar = new ArmRenderer('arm', arm)

function applyGravity(arm, elapsed) {
    // Todo
}

function applyInertia(arm, elapsed) {
    // Todo
}

function rotate([x, y], angle) {
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return [c * x - s * y, c * y + s * x]
}

function add([a, b], [x, y]) {
    return [a + x, b + y]
}
