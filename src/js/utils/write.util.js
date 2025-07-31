import { textSamples } from "../data/samples.data.js";
import Game from "../game.js";
import { highlight } from "./highlight.util.js";

const canvas = document.getElementById('code-editor');
const ctx = canvas.getContext('2d');

const dpr = window.devicePixelRatio || 1;

canvas.width = canvas.clientWidth * dpr * 2;
canvas.height = canvas.clientHeight * dpr * 2;

canvas.style.width = canvas.clientWidth + 'px';
canvas.style.height = canvas.clientHeight + 'px';

ctx.scale(dpr, dpr);

let cursorVisible = true;

setInterval(() => {
    cursorVisible = !cursorVisible;
}, 250);

export function writeToCanvas() {
    let text = textSamples[Game.currentText];
    const fontSize = 32;

    const highlighted = highlight(text);

    ctx.font = `${fontSize}px monospace`;

    let totalLength = 0;
    let currentLine = 0;
    let x = 128;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'left';

    ctx.translate(0, -scrollY);

    highlighted.map((frag, i) => {
        totalLength += frag.text.length;
        const previousLength = totalLength - frag.text.length;

        // early escape for everything past the current index
        if (Game.textIndex < totalLength - frag.text.length) {
            return;
        }

        const y = 48 + fontSize * currentLine;

        const visibleHeight = ((canvas.height - fontSize * 8) / (window.devicePixelRatio || 1));
        if (y - scrollY > visibleHeight) {
            scrollY += fontSize;
        }

        if (frag.text == '\n') {
            ctx.fillStyle = '#fff'
            currentLine++;
            x = 128;
        };


        if (y - scrollY > 0) {
            ctx.fillStyle = frag.color;

            if (Game.textIndex >= totalLength) {
                ctx.fillText(frag.text, x, y);

                const textWidth = ctx.measureText(frag.text).width || 4;
                x += textWidth;
                return;
            }
            if (Game.textIndex > previousLength) {
                const textToWrite = frag.text.substring(0, Game.textIndex - previousLength);
                ctx.fillText(textToWrite, x, y);
                const textWidth = ctx.measureText(textToWrite).width || 4;
                x += textWidth;
            }
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

    if (Game.textIndex > text.length) {
        Game.currentText = Math.floor(Math.random() * textSamples.length);
        Game.textIndex = 0;
        scrollY = 0;
    }
}