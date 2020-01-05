const User = require('./user');

/**
 * Validate user
 * @param {User} user User
 * @param {Object} schema Validation schema
 */
function validateSchema(user, schema) {
    for (const property in schema) {
        if (schema.hasOwnProperty(property)) {
            const value = schema[property];

            if (typeof value != 'string') throw new TypeError('Property must be a string only');
            
            if (typeof user[property] != value) 
                throw new TypeError('Not valid user');
        }
    }
}

/**
 * Compare two users with same propertys
 * @param {User} one First user
 * @param {User} two Second user
 */
function compareUsers(one, two) {
    let tmp = 0;
    Object.keys(one).forEach(name => tmp += Math.pow(one[name] - two[name], 2));

    return Math.sqrt(tmp);
}

module.exports = class Network {
    constructor(schema) {
        if (typeof schema == 'undefined') throw new Error('Schema must be defined');

        if (schema instanceof Object) this.schema = schema;

        // Declare array of users
        this.users = [];
    }

    /**
     * Add new user to the network
     * @param {User} user User object
     * @param {number|string} tag User tag
     */
    add(user, tag = undefined) {
        if (!(user instanceof User))
            throw new TypeError('user must be User instance only');

        let tagType = typeof tag; 
        if (tagType != 'undefined')
            if (tagType != 'string') throw new TypeError('tag must be String only');

        validateSchema(user, this.schema);

        if (tagType == 'string') this.users[tag] = user;
        else this.users.push(user);
    }

    /**
     * Find user by tag
     * @param {string|number} tag User tag
     * @returns {User}
     */
    find(tag) {
        let usr = this.users[tag];

        if (typeof usr != 'undefined') return usr;
        else throw new Error('User not found');
    }

    /**
     * Compare two local users
     * @param {User} one First user
     * @param {User} two Second user
     */
    static compare(one, two) {
        if (!(one instanceof User)) 
            throw new TypeError('one must be User instance only');

        if (!(two instanceof User)) 
            throw new TypeError('two must be User instance only');

        return compareUsers(one, two);
    }

    /**
     * Compare two users in the network
     * @param {string|number} one First user
     * @param {string|number} two Second user
     */
    compare(one, two) {
        let type = typeof one;
        if (type != 'string' && type != 'number') throw new TypeError('one must be a string or a number');

        type = typeof two;
        if (type != 'string' && type != 'number') throw new TypeError('two must be a string or a number');

        one = this.find(one);
        two = this.find(two);

        return compareUsers(one, two);
    }

    /**
     * Find best friends
     * @param {string|number} tag User tag
     * @returns {Array<User>|User}
     */
    best(tag) {
        let type = typeof tag;
        if (type != 'string' && type != 'number') throw new TypeError('tag must be a string or a number');

        let usr = this.find(tag);
        let usrIndex = this.users.indexOf(usr);

        let min;

        for (let i = 0; i < this.users.length; i++) {
            if (i == usrIndex) continue;

            const user = this.users[i];
            min = compareUsers(usr, user);
        }
    }
}