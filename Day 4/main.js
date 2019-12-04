$( document ).ready(function() {
    //Regex
    const reg = /(\d)\1/;

    //Recursive checker, number must be string.
    const orderChecker = (number, prev) =>{
        if(number.length === 0){
            return true;
        }

        const front = parseInt(number[0]);
        if(front < prev){
            return false;
        }

        return orderChecker(number.substring(1), front);
    };

    //Checks for double digits.
    const containsDouble = (number) =>{
        return reg.test(number);
    };

    //Assumed range = XXXXXX-XXXXXX
    const combinationFinder = (range) =>{
        let passwords = [];
        const numbers = range.split('-');
        const lowerBound = parseInt(numbers[0]);
        const upperBound = parseInt(numbers[1]);

        for(const password of _.range(lowerBound, upperBound, 1)){
            const stringPassword = password.toString();
            if(orderChecker(stringPassword, -1) && containsDouble(stringPassword)){
                passwords.push(stringPassword);
            }
        }

        return passwords;
    };

    const passwords = combinationFinder("138307-654504");
    console.log("Amount of passwords: " + passwords.length);
});