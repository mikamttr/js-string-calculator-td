export class StringCalculator {

    add(str) {
        if (str.length === 0) return 0;
        if (!isNaN(str)) return parseInt(str);

        let delimiters = this.getDelimiters(str);
        str = this.deleteDelimiter(str);

        delimiters.forEach(delimiter => {
            str = str.replaceAll(delimiter, ',');
        });

        let numbers = str
            .replaceAll('\n', ',')
            .split(',')
            .map(Number)
            .filter(elem => elem <= 1000);

        let negatives = numbers.filter(elem => elem < 0);
        if (negatives.length > 0) throw Error(`Negatives not allowed. [${negatives.join(',')}]`);

        return numbers.reduce((sum, current) => sum + current);
    }

    hasDelimiter(str) {
        return (str.includes('//'));
    }

    getDelimiters(str) {
        if (this.hasDelimiter(str)) {
            if (str.includes('['))
                return str.split(/\[(.*?)\]/) // Get delimiters between square brackets
                    .filter((elem, key) => (key % 2 !== 0));
            else
                return [str.charAt(2)];
        }

        return [','];
    }

    deleteDelimiter(str) {
        if (this.hasDelimiter(str))
            return str.split('\n', 2)[1]

        return str;
    }

}


// export function add(input) {
//     if (!input) return 0;

//     let delimiters = [',']; // Default delimiter is comma

//     // Check if custom delimiter is specified
//     if (input.startsWith('//')) {
//         let customDelimiters = [];
//         let delimiterEndIndex = input.indexOf('\n');
//         let customDelimiterSection = input.substring(2, delimiterEndIndex);

//         // If single custom delimiter is specified without square brackets
//         if (customDelimiterSection.length === 1) {
//             delimiters.push(customDelimiterSection);
//         } else {
//             // Loop to find all custom delimiters
//             while (customDelimiterSection.includes('[') && customDelimiterSection.includes(']')) {
//                 const delimiterStartIndex = customDelimiterSection.indexOf('[');
//                 delimiterEndIndex = customDelimiterSection.indexOf(']');
//                 if (delimiterEndIndex > delimiterStartIndex) {
//                     const customDelimiter = customDelimiterSection.substring(delimiterStartIndex + 1, delimiterEndIndex);
//                     customDelimiters.push(customDelimiter);
//                     customDelimiterSection = customDelimiterSection.substring(delimiterEndIndex + 1);
//                 }
//             }

//             // Push custom delimiters into the delimiters array
//             if (customDelimiters.length > 0) {
//                 delimiters = delimiters.concat(customDelimiters);
//             }
//         }

//         // Update input to exclude the custom delimiter section
//         input = input.substring(delimiterEndIndex + 1);
//     }

//     // Generate regular expression to split numbers based on delimiters
//     const delimiterRegex = new RegExp('[' + delimiters.map(delimiter => '\\' + delimiter).join('') + '\\n]');
//     const numbers = input.split(delimiterRegex);

//     let sum = 0;
//     let negatives = [];
//     numbers.forEach((number) => {
//         const num = parseInt(number);
//         if (num < 0) {
//             negatives.push(num);
//         } else if (num <= 1000) { // Ignore numbers greater than 1000
//             sum += num;
//         }
//     });

//     if (negatives.length > 0) {
//         const negativeNumbers = negatives.join(', ');
//         throw new Error(`Negatives not allowed: ${negativeNumbers}`);
//     }

//     return sum;
// }
