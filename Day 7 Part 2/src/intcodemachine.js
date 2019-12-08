const _ = require('underscore');

//Modes
const POSITION_MODE = 0;
const IMMEDIATE_MODE = 1;

//this.optcodes
const OPT_ADD = 1;
const OPT_MUL = 2;
const OPT_INP = 3;
const OPT_OUT = 4;
const OPT_JIT = 5;
const OPT_JIF = 6;
const OPT_CLT = 7;
const OPT_CEQ = 8;
const OPT_END = 99;

class Machine{
    constructor(input, optcode) {
        this.input = [input];
        this.optcode = [...optcode];
        this.output = 0;
        this.done = false;
        this.first = 0;
        this.second = 0;
        this.stepSize = 4;
        this.pointer = 0;
        this.halted = false;
    }

    splitCode(combination){
        return {
            opt:  parseInt(combination % 100),
            par1: parseInt((combination / 100) % 10),
            par2:  parseInt(combination / 1000),
            par3: POSITION_MODE
        }
    };

    getValue(value, mode){
        switch (mode) {
            case POSITION_MODE:
                return this.optcode[value];
            case IMMEDIATE_MODE:
                return value;
        }
    };


    run(signal){
        if(signal !== undefined){
            this.input.push(signal);
        }

        while(this.pointer < this.optcode.length){
            const i = this.pointer;
            const split = this.splitCode(this.optcode[i]);
            switch (split.opt) {
                case OPT_ADD:
                    this.first = this.getValue(this.optcode[i + 1], split.par1);
                    this.second = this.getValue(this.optcode[i + 2], split.par2);

                    this.optcode[this.optcode[i + 3]] = this.first + this.second;

                    this.stepSize = 4;
                    break;
                case OPT_MUL:
                    this.first = this.getValue(this.optcode[i + 1], split.par1);
                    this.second = this.getValue(this.optcode[i + 2], split.par2);

                    this.optcode[this.optcode[i + 3]] = this.first * this.second;

                    this.stepSize = 4;
                    break;
                case OPT_INP:
                    this.optcode[this.optcode[i + 1]] = this.input.shift();

                    this.stepSize = 2;
                    break;
                case OPT_OUT:
                    this.output = this.getValue(this.optcode[i + 1], split.par1);

                    this.stepSize = 2;
                    this.pointer += this.stepSize;
                    return this.output;
                case OPT_JIT:
                    this.first = this.getValue(this.optcode[i + 1], split.par1);

                    if(this.first !== 0){
                        this.pointer = this.getValue(this.optcode[i + 2], split.par2);
                        this.stepSize = 0;
                        break;
                    }

                    this.stepSize = 3;
                    break;
                case OPT_JIF:
                    this.first = this.getValue(this.optcode[i + 1], split.par1);

                    if(this.first === 0){
                        this.pointer = this.getValue(this.optcode[i + 2], split.par2);
                        this.stepSize = 0;
                        break;
                    }

                    this.stepSize = 3;
                    break;
                case OPT_CLT:
                    this.first = this.getValue(this.optcode[i + 1], split.par1);
                    this.second = this.getValue(this.optcode[i + 2], split.par2);

                    this.optcode[this.optcode[i + 3]] = this.first < this.second ? 1 : 0;

                    this.stepSize = 4;
                    break;
                case OPT_CEQ:
                    this.first = this.getValue(this.optcode[i + 1], split.par1);
                    this.second = this.getValue(this.optcode[i + 2], split.par2);

                    this.optcode[this.optcode[i + 3]] = this.first === this.second ? 1 : 0;

                    this.stepSize = 4;
                    break;
                default:
                    if(split.opt !== OPT_END){
                        console.log("Unknown this.optcode: " + split.opt);
                    }
                    this.halted = true;
            }

            if(this.halted){
                return this.output;
            }

            this.pointer += this.stepSize;
        }
    }
}

exports.intCodeMachine = Machine;