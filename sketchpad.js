const canvas = document.getElementById('drawandchat');
const colourInput = document.getElementById('colour');
const sizeInput = document.getElementById('size');
const captionInput = document.getElementById('caption');
const ctx = canvas.getContext('2d');

var skip1, skip2, cp1x, cp2x, cp1y, cp2y;

var currentColour = "#000";
var currentSize = 5;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);

colourInput.addEventListener('change', (ev) => {
	currentColour = ev.target.value;
});

sizeInput.addEventListener('change', (ev) => {
	currentSize = ev.target.value;
});

for (const button of document.querySelectorAll(".picker > button")) {
	button.addEventListener('click', () => {
		currentColour = button.id;
		colourInput.value = currentColour;
	});
};

for (const button of document.querySelectorAll(".pentools > button")) {
	if (button.id === "pen") {
		button.addEventListener('click', () => {
			currentColour = "#000000";
			colourInput.value = currentColour;
		});
	} else if (button.id === "eraser") {
		button.addEventListener('click', () => {
			currentColour = "#ffffff";
			colourInput.value = currentColour;
		});
	} else {
		button.addEventListener('click', () => {
			currentSize = button.id;
			sizeInput.value = currentSize;
		});
	};
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
	ctx.lineWidth = currentSize;
	ctx.strokeStyle = currentColour;
	
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
	draw2(pos.x, pos.y)
}

function clearAll() {
	canvas.width = canvas.width
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
	await window.sketchpad.uploadSketchpad(atmnid, caption.value ?? "");
	clearAll();
        caption.value = "";
}


canvas.addEventListener('mousedown', (ev) => {
	canvas.addEventListener('mousemove', draw, false)
	const mousePos = getMousePos(ev)
	ctx.fillStyle = currentColour;
	ctx.fillRect(mousePos.x, mousePos.y, currentSize, currentSize)
	ctx.stroke();
}, false)

canvas.onmouseleave = () => {
	canvas.removeEventListener('mousemove', draw, false);
	pressed = false; 
	ctx.save();
}

canvas.addEventListener('mouseup', function() {
	canvas.removeEventListener('mousemove', draw, false);
	pressed = false;
	ctx.save();
}, false);
