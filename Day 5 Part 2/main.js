$( document ).ready(function() {
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

    //Input
    const input = 5;

    //Puzzle
    let optcode = [
        3,225,1,225,6,6,1100,1,238,225,104,0,1101,90,64,225,1101,15,56,225,1,14,153,224,101,-147,224,224,4,224,1002,223,8,223,1001,224,3,224,1,224,223,223,2,162,188,224,101,-2014,224,224,4,224,1002,223,8,223,101,6,224,224,1,223,224,223,1001,18,81,224,1001,224,-137,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,1102,16,16,224,101,-256,224,224,4,224,1002,223,8,223,1001,224,6,224,1,223,224,223,101,48,217,224,1001,224,-125,224,4,224,1002,223,8,223,1001,224,3,224,1,224,223,223,1002,158,22,224,1001,224,-1540,224,4,224,1002,223,8,223,101,2,224,224,1,223,224,223,1101,83,31,225,1101,56,70,225,1101,13,38,225,102,36,192,224,1001,224,-3312,224,4,224,1002,223,8,223,1001,224,4,224,1,224,223,223,1102,75,53,225,1101,14,92,225,1101,7,66,224,101,-73,224,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1101,77,60,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,7,226,677,224,1002,223,2,223,1005,224,329,1001,223,1,223,1007,226,677,224,1002,223,2,223,1005,224,344,101,1,223,223,108,226,226,224,1002,223,2,223,1006,224,359,101,1,223,223,7,226,226,224,102,2,223,223,1005,224,374,101,1,223,223,8,677,677,224,1002,223,2,223,1005,224,389,1001,223,1,223,107,677,677,224,102,2,223,223,1006,224,404,101,1,223,223,1107,677,226,224,102,2,223,223,1006,224,419,1001,223,1,223,1008,226,226,224,1002,223,2,223,1005,224,434,1001,223,1,223,7,677,226,224,102,2,223,223,1006,224,449,1001,223,1,223,1107,226,226,224,1002,223,2,223,1005,224,464,101,1,223,223,1108,226,677,224,102,2,223,223,1005,224,479,101,1,223,223,1007,677,677,224,102,2,223,223,1006,224,494,1001,223,1,223,1107,226,677,224,1002,223,2,223,1005,224,509,101,1,223,223,1007,226,226,224,1002,223,2,223,1006,224,524,101,1,223,223,107,226,226,224,1002,223,2,223,1005,224,539,1001,223,1,223,1108,677,677,224,1002,223,2,223,1005,224,554,101,1,223,223,1008,677,226,224,102,2,223,223,1006,224,569,1001,223,1,223,8,226,677,224,102,2,223,223,1005,224,584,1001,223,1,223,1008,677,677,224,1002,223,2,223,1006,224,599,1001,223,1,223,108,677,677,224,102,2,223,223,1006,224,614,1001,223,1,223,108,226,677,224,102,2,223,223,1005,224,629,101,1,223,223,8,677,226,224,102,2,223,223,1005,224,644,101,1,223,223,107,677,226,224,1002,223,2,223,1005,224,659,101,1,223,223,1108,677,226,224,102,2,223,223,1005,224,674,1001,223,1,223,4,223,99,226
    ];

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
                optcode[optcode[i + 1]] = input;

                stepSize = 2;
                break;
            case OPT_OUT:
                output = getValue(optcode[i + 1], split.par1);

                stepSize = 2;
                break;
            case OPT_JIT:
                first = getValue(optcode[i + 1], split.par1);

                if(first !== 0){
                    second = getValue(optcode[i + 2], split.par2);
                    i = second;
                    stepSize = 0;
                    break;
                }

                stepSize = 3;
                break;
            case OPT_JIF:
                first = getValue(optcode[i + 1], split.par1);

                if(first === 0){
                    second = getValue(optcode[i + 2], split.par2);
                    i = second;
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
            break;
        }
    }

    console.log(output);
});