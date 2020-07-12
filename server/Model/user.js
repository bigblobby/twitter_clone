const createBase = require('./base');
const bcrypt = require('bcrypt');

const name = 'User';
const tableName = 'users'
const selectableProps = ['username', 'email'];

const SALT = 10;
const hashPassword = password => bcrypt.hash(password, SALT);
const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

const beforeSave = (props) => {
    return hashPassword(props.password)
        .then(hash => {
            return {...props, password: hash}
        })
        .catch(err => `Error hashing password: ${ err }`)
}

module.exports = (knex) => {
    const base = createBase({
        knex,
        name,
        tableName,
        selectableProps
    });

    const createOne = (props) => {
        return beforeSave(props).then(user => {
            return base.createOne(user);
        });
    };

    const verify = (username, password) => {
        const matchErrorMsg = 'Username or password do not match';

        knex.select()
            .from(tableName)
            .where({ username })
            .timeout(base.timeout)
            .then(user => {
                if (!user) throw matchErrorMsg;

                return user
            })
            .then(user => Promise.all([user, verifyPassword(password, user.password)]))
            .then(([user, isMatch]) => {
                if (!isMatch) throw matchErrorMsg;

                return user
            });
    }

    return {
        ...base,
        createOne,
        verify
    };
}
