const canvas = document.getElementById('drawandchat');
const colourInput = document.getElementById('colour');
const sizeInput = document.getElementById('size');

const ctx = canvas.getContext('2d');

var skip1, skip2, cp1x, cp2x, cp1y, cp2y;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let coords = {
	x: 0,
	y: 0
};

var pressed = false;

function getMousePos(ev) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: ev.clientX - rect.left - 2,
		y: ev.clientY - rect.top - 2
	};
}

function draw2(x, y) {
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	ctx.lineWidth = sizeInput.value;
	ctx.strokeStyle = colourInput.value;
	
	if (!pressed) {
		ctx.beginPath();
		ctx.moveTo(x, y);
		pressed = true;
		skip1 = true;
		skip2 = false;
	} else {
		if (skip1) {
			cp1x = x;
			cp1y = y;
			skip1 = false;
			skip2 = true;
		}
		if (skip2) {
			cp2x = x;
			cp2y = y;
			skip1 = false;
			skip2 = false;
		} else {
			ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
			skip1 = true;
			skip2 = false;
		}
	}
	ctx.stroke();
}

function draw(ev) {
	const pos = getMousePos(ev);
	draw2(pos.x, pos.y);
}

function clearAll() {
	canvas.width = canvas.width;
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function convertToImage() {
	var img = canvas.toDataURL("image/png");
	return img;
}

async function startUpload() {
	const bs = convertToImage();
	const blb = window.sketchpad.internal.dataURItoBlob(bs);
	const atmnid = await window.sketchpad.internal.autumnUpload(blb);
	await window.sketchpad.uploadSketchpad(atmnid);
	clearAll()
}

canvas.addEventListener('mousedown', (ev) => {
	canvas.addEventListener('mousemove', draw, false);
	draw(ev);
}, false);

canvas.addEventListener('mouseup', function() {
	canvas.removeEventListener('mousemove', draw, false);
	pressed = false;
	ctx.save();
}, false);
