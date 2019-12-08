const _ = require('underscore');
const input = require('./input');

(function () {

    const colorWhite = 1;
    const colorBlack = 0;

    const width = 25;
    const height = 6;
    const dim = width * height;
    const image = [];

    const canvas = document.getElementById("imageCanvas");
    const context = canvas.getContext("2d");

    canvas.width = width * 32;
    canvas.height = height * 32;

    for(let i = 0; i < input.code.length; i+= dim){
        const layer = [];
        for(let j = i; j < i + dim; ++j){
            layer.push(parseInt(input.code[j]));
        }
        image.push(layer);
    }

    for(let i = image.length - 1; i >= 0; --i){
        const layer = image[i];
        let x = 0;
        let y = 0;
        for(let j = 0; j < layer.length; ++j) {
            switch (layer[j]) {
                case colorWhite:
                    context.fillStyle = "rgba(125, 125, 125, 1)";
                    break;
                case colorBlack:
                    context.fillStyle = "rgba(0, 0, 0, 1)";
                    break;
                default:
                    context.fillStyle = "rgba(255, 255, 255, 0)";
                    break;
            }

            context.fillRect(x * 32, y * 32, 32, 32);

            ++x;
            if(x >= width){
                x = 0;
                ++y;
            }
        }
    }
})();