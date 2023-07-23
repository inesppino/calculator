import { render, screen } from "@testing-library/react";
import Calculator from "./Calculator";

describe("Calculator", () => {
  it("renders", () => {
    render(<Calculator />);
  });
});

// describe('add', () => {
//   it('returns 0 for empty input', () => {
//     expect(add('')).toBe(0)
//   })
//   it('returns the number when input has just a number', () => {
//     expect(add('3')).toBe(3)
//   })
//   it('adds two numbers in the input', () => {
//     expect(add('3,6')).toBe(9)
//   })
//   it('adds n numbers in the input', () => {
//     expect(add('3,7,6')).toBe(16)
//   })
//   it('adds n numbers in the input with new line separator', () => {
//     expect(add('3\n7,6')).toBe(16)
//   })
//   it('allows to specify the delimitator', () => {
//     expect(add('//;\n1;2')).toBe(3)
//   })
//   it('throws exception when negative numbers in input', () => {
//     expect(() => add('3,-7,6')).toThrow('negatives not allowed -7')
//   })
//   it('ignores numbers bigger than 1000', () => {
//     expect(add('3,1001,6')).toBe(9)
//   })
// })
