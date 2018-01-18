const {Users} = require('./users');
const expect = require('expect');

describe('Users', () => {
    var users = [];
    
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Clemens',
            room: 'Cocktails'
        },{
            id: '2',
            name: 'Laura',
            room: 'Food'
        }, {
            id: '3',
            name: 'Felix',
            room: 'Cocktails'
        }];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {id: '123', name: 'Laura', room: 'Room'};
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });
    
    it('should return list of names in Cocktails room', () => {
        var namesArray = users.getUserList('Cocktails');
        expect(namesArray).toEqual(['Clemens', 'Felix']);
    });

    it('should return list of names in Food room', () => {
        var namesArray = users.getUserList('Food');
        expect(namesArray).toEqual(['Laura']);
    });

    it('should find user matching id', () => {
        var user = users.fetchUser('1');
        expect(user).toEqual(users.users[0]);
    });
    
    it('should not find user matching id', () => {
        var user = users.fetchUser('99');
        expect(user).toNotExist();
    });
    
    it('should return and remove user matching id', () => {
        var user = users.removeUser('3');
        expect(users.users.length).toBe(2);
        expect(user).toEqual({
            id: '3',
            name: 'Felix',
            room: 'Cocktails'
        });
    });

    it('should not remove user if not matching id', () => {
        var user = users.removeUser('99');
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
});