const m = require('./intcodemachine');
const _ = require('underscore');
const input = require('./input');

(function () {
    let processor = (settings, optcode) =>{
        let input = 0;

        const A = new m.intCodeMachine(settings[0], optcode);
        const B = new m.intCodeMachine(settings[1], optcode);
        const C = new m.intCodeMachine(settings[2], optcode);
        const D = new m.intCodeMachine(settings[3], optcode);
        const E = new m.intCodeMachine(settings[4], optcode);

        while(true){
            let output1 = A.run(input);
            let output2 = B.run(output1);
            let output3 = C.run(output2);
            let output4 = D.run(output3);
            input = E.run(output4);

            if(E.halted || input === Infinity){
                break;
            }
        }

        console.log(input);
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
    _.each(permutation([5, 6, 7, 8, 9]), (array) => {
        outputs.push(processor(array, input.code));
    });

    console.log("Best output: " + outputs.sort((a, b) => b - a)[0]);
})();