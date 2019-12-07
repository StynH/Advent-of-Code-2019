const m = require('./intcodemachine');
const _ = require('underscore');
const input = require('./input');

(function () {
    let processor = (settings, optcode) =>{
        let input = 0;

        _.each(settings, (setting) => {
            input = m.intCodeMachine([setting, input], optcode);
        });

        return input
    };

    let permutation = (array) => {
        let p = (array, temp) =>{
            let x;
            if (!array.length) {
                result.push(temp);
            }
            for (let i = 0; i < array.length; i++) {
                x = array.splice(i, 1)[0];
                p(array, temp.concat(x));
                array.splice(i, 0, x);
            }
        };

        const result = [];
        p(array, []);
        return result;
    };

    const outputs = [];
    _.each(permutation([0,1,2,3,4]), (array) => {
        outputs.push(processor(array, input.code));
    });

    console.log("Best output: " + outputs.sort((a, b) => b - a)[0]);
})();