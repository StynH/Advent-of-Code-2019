const _ = require('underscore');
const input = require('./input');

(function () {

    const width = 25;
    const height = 6;
    const dim = width * height;
    const image = [];

    for(let i = 0; i < input.code.length; i+= dim){
        const layer = [];
        for(let j = i; j < i + dim; ++j){
            layer.push(parseInt(input.code[j]));
        }
        image.push(layer);
    }

    const lowestZeros = _.chain(image).map((layer) => {
        let count = _.countBy(layer, (num) => {
            return num === 0;
        });
        return { layer: layer, zeros: count.true};
    }).sortBy((layer) => {
        return layer.zeros;
    }).value();

    const lowestLayer = lowestZeros[0];
    const amountOfOnes = _.countBy(lowestLayer.layer, (num) => {
        return num === 1;
    }).true;
    const amountOfTwos = _.countBy(lowestLayer.layer, (num) => {
        return num === 2;
    }).true;

    console.log("Answer: " + (amountOfOnes * amountOfTwos));
})();