const expect = require('expect');
const {isRealString} = require('./validation')

describe('isRealString', () => {
    it('should reject non-string value', () => {
        var result = isRealString(1);
        expect(result).toBe(false);
    });

    it('should reject empty string value', () => {
        var result = isRealString('   ');
        expect(result).toBe(false);
    });
    it('should accept true string value', () => {
        var result = isRealString('Correct');
        expect(result).toBe(true);
    });
});