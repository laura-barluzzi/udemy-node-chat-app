const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Laura';
        var text = 'Test text message';
        var message = generateMessage(from, text);
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate the correct location message object', () => {
        var from = 'Admin';
        var latitude = '1';
        var longitude = '1';
        var expectedUrl = 'https://www.google.com/maps?q=1,1';
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message.from).toBe(from);
        expect(message.url).toBe(expectedUrl);
        expect(message.createdAt).toBeA('number');
    });
});