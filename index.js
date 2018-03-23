
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
    get angles() {
	const t = (new Date()).getTime() / 1000
	return [0.5, -t/2, t]
    }
}

const arm = new Arm()

const ar = new ArmRenderer('arm', arm)

ar.draw()
