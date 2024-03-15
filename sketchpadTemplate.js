  window.sketchpad._css = `
      .sketchpad.container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;

        gap: 1rem;

        background-color: #0a0c1d;
        color: #fff;
      }

      .sketchpad.container > canvas {
        border-radius: 10px;
      }

      .sketchpad .controls, .sketchpad .picker, .sketchpad .size, .sketchpad .options {
        display: flex;
        flex-direction: row;

        align-items: center;
      }

      .sketchpad > .picker, .size, .options {
        gap: 1rem;
      }

      .sketchpad .size {
        margin-left: 1rem;
      }

      .sketchpad .options > button {
        border: unset;
        background-color: #222639;
        padding: 10px;
        border-radius: 5px;
        color: #fff;
      }
    `;
    
    window.sketchpad._html = `
      <div class="sketchpad container">
		<header>
			<h1>Sketchpad</h1>
		</header>
		<div class="controls">
			<div class="picker">
				<label for="colour">Colour</label>
				<input type="color" value="#000" id="colour">
			</div>
			<div class="size">
				<label for="size">Size</label>
				<input type="range" value=4 min=1 max=10 id="size">
			</div>
		</div>
		<div class="options">
			<button id="toimage">Download</button>
			<button id="deleteAll">Clear</button>
		</div>
      </div>
      <style>${window.sketchpad._css}</style>
    `;

document.querySelector(".sketchpad > controls").insertAdjacentHTML("afterend", "<canvas id='drawandchat' width=400 height=400></canvas>")
