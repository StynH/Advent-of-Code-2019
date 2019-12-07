const _ = require('underscore');

//Modes
const POSITION_MODE = 0;
const IMMEDIATE_MODE = 1;

//Optcodes
const OPT_ADD = 1;
const OPT_MUL = 2;
const OPT_INP = 3;
const OPT_OUT = 4;
const OPT_JIT = 5;
const OPT_JIF = 6;
const OPT_CLT = 7;
const OPT_CEQ = 8;
const OPT_END = 99;

const machine = (input, optcode) =>{
    let output = 0;
    let done = false;
    let first = 0;
    let second = 0;
    let stepSize = 4;

    let splitCode = (combination) => {
        return {
            opt:  parseInt(combination % 100),
            par1: parseInt((combination / 100) % 10),
            par2:  parseInt(combination / 1000),
            par3: POSITION_MODE
        }
    };

    let getValue = (value, mode) =>{
        switch (mode) {
            case POSITION_MODE:
                return optcode[value];
            case IMMEDIATE_MODE:
                return value;
        }
    };

    for(let i = 0; i < optcode.length; i += stepSize){
        const split = splitCode(optcode[i]);
        switch (split.opt) {
            case OPT_ADD:
                first = getValue(optcode[i + 1], split.par1);
                second = getValue(optcode[i + 2], split.par2);

                optcode[optcode[i + 3]] = first + second;

                stepSize = 4;
                break;
            case OPT_MUL:
                first = getValue(optcode[i + 1], split.par1);
                second = getValue(optcode[i + 2], split.par2);

                optcode[optcode[i + 3]] = first * second;

                stepSize = 4;
                break;
            case OPT_INP:
                optcode[optcode[i + 1]] = input.shift();

                stepSize = 2;
                break;
            case OPT_OUT:
                output = getValue(optcode[i + 1], split.par1);

                stepSize = 2;
                break;
            case OPT_JIT:
                first = getValue(optcode[i + 1], split.par1);

                if(first !== 0){
                    i = getValue(optcode[i + 2], split.par2);
                    stepSize = 0;
                    break;
                }

                stepSize = 3;
                break;
            case OPT_JIF:
                first = getValue(optcode[i + 1], split.par1);

                if(first === 0){
                    i = getValue(optcode[i + 2], split.par2);
                    stepSize = 0;
                    break;
                }

                stepSize = 3;
                break;
            case OPT_CLT:
                first = getValue(optcode[i + 1], split.par1);
                second = getValue(optcode[i + 2], split.par2);

                optcode[optcode[i + 3]] = first < second ? 1 : 0;

                stepSize = 4;
                break;
            case OPT_CEQ:
                first = getValue(optcode[i + 1], split.par1);
                second = getValue(optcode[i + 2], split.par2);

                optcode[optcode[i + 3]] = first === second ? 1 : 0;

                stepSize = 4;
                break;
            default:
                if(split.opt !== OPT_END){
                    console.log("Unknown optcode: " + split.opt);
                }
                done = true;
                break;
        }

        if(done){
            return output;
        }
    }
};

exports.intCodeMachine = machine;