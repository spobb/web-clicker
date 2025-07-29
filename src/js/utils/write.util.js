import { textSamples } from "../data/samples.data.js";
import { highlight } from "./highlight.util.js";

const canvas = document.getElementById('code-editor');
const ctx = canvas.getContext('2d');

const dpr = window.devicePixelRatio || 1;

canvas.width = canvas.clientWidth * dpr * 2;
canvas.height = canvas.clientHeight * dpr * 2;

canvas.style.width = canvas.clientWidth + 'px';
canvas.style.height = canvas.clientHeight + 'px';

ctx.save();
ctx.scale(dpr, dpr);

let cursorVisible = true;

setInterval(() => {
    cursorVisible = !cursorVisible;
}, 250);

export function writeToCanvas(currentIndex) {
    const text = textSamples[1];
    const fontSize = 32;

    const highlighted = highlight(text);

    ctx.font = `${fontSize}px monospace`;

    let totalLength = 0;
    let currentLine = 0;

    let x = 128;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'left';

    highlighted.map((frag, i) => {
        totalLength += frag.text.length;
        const previousLength = totalLength - frag.text.length;

        // early escape for everything past the current index
        if (currentIndex < totalLength - frag.text.length) {
            return;
        }

        if (frag.text == '\n') {
            ctx.fillStyle = '#fff'
            currentLine++;
            x = 128;
        };

        ctx.fillStyle = frag.color;
        const y = 48 + fontSize * currentLine;

        if (currentIndex >= totalLength) {
            ctx.fillText(frag.text, x, y);

            const textWidth = ctx.measureText(frag.text).width || 4;
            x += textWidth;
            return;
        }
        if (currentIndex > previousLength) {
            const textToWrite = frag.text.substring(0, currentIndex - previousLength);
            ctx.fillText(textToWrite, x, y);
            const textWidth = ctx.measureText(textToWrite).width || 4;
            x += textWidth;
        }
        if (cursorVisible) {
            ctx.fillStyle = '#fff'
            ctx.fillText('|', x, y)
        }
    });

    ctx.textAlign = 'right';
    for (let i = 0; i <= currentLine + 1; i++) {
        const y = 48 + fontSize * i;
        ctx.fillStyle = '#888';
        ctx.fillText(i + 1, 96, y);
    }
    ctx.restore();
}