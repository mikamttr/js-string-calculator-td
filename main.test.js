import { describe, beforeAll, test, expect } from 'vitest'
import { StringCalculator } from './main';

describe('string calculator tdd', () => {

    let stringCalculator;

    beforeAll(() => {
        stringCalculator = new StringCalculator();
    })

    // 1
    test('for empty string returns 0', () => {
        expect(stringCalculator.add("")).toBe(0);
    });

    test('for 1 returns 1', () => {
        expect(stringCalculator.add("1")).toBe(1);
    });

    test('for 2 returns 2', () => {
        expect(stringCalculator.add("2")).toBe(2);
    });

    test('for 1,2 returns 3', () => {
        expect(stringCalculator.add("1,2")).toBe(3);
    });

    // 2
    test('for 1,2,6 returns 9', () => {
        expect(stringCalculator.add("1,2,6")).toBe(9);
    });

    // 3
    test('for 1\n2,3 returns 6', () => {
        expect(stringCalculator.add("1\n2,3")).toBe(6);
    });

    test('for 1\n2,3\n5 returns 11', () => {
        expect(stringCalculator.add("1\n2,3\n5")).toBe(11);
    });

    // 4
    test('for //;\n1;2 returns 3', () => {
        expect(stringCalculator.add('//;\n1;2')).toBe(3);
    });

    test('for //a\n1a2 returns 3', () => {
        expect(stringCalculator.add('//a\n1a2')).toBe(3);
    });

    // 5
    test('for 1,-3 throws an exception', () => {
        expect(() => (stringCalculator.add('1,-3'))).toThrow();
        expect(() => (stringCalculator.add('1,-3'))).toThrow(Error);
        expect(() => (stringCalculator.add('1,-3'))).toThrow('Negatives not allowed. [-3]');
    });

    // 6
    test('for -1,-3,-5 throws an exception', () => {
        expect(() => (stringCalculator.add('-1,-3,-5'))).toThrow();
        expect(() => (stringCalculator.add('-1,-3,-5'))).toThrow(Error);
        expect(() => (stringCalculator.add('-1,-3,-5'))).toThrow('Negatives not allowed. [-1,-3,-5]');
    });

    // 7
    test('for 1\n2,1002 returns 3', () => {
        expect(stringCalculator.add('1\n2,1002')).toBe(3);
    });

    // 8
    test('for "//[***]\n1***2***3" returns 6', () => {
        expect(stringCalculator.add('//[***]\n1***2***3')).toBe(6);
    });

    test('for "//[ppp]\n1ppp2ppp53" returns 56', () => {
        expect(stringCalculator.add('//[ppp]\n1ppp2ppp53')).toBe(56);
    });

    // 9
    test('for //[*][%]\n1*2%3" returns 6', () => {
        expect(stringCalculator.add('//[*][%]\n1*2%3')).toBe(6);
    });

    // 10
    test('for //[***][%%]\n1***2%%3" returns 6', () => {
        expect(stringCalculator.add('//[***][%%]\n1***2%%3')).toBe(6);
    });

});