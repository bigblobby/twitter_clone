module.exports = ({
    knex: {},
    name = 'name',
    tableName = 'tableName',
    selectableProps = [],
    timeout = 1000
}) => {

    const createOne = (props) => {
        delete props.id;

        return knex.insert(props)
            .into(tableName)
            .timeout(timeout);
    }

    const findAll = () => {
        return knex.select(selectableProps)
            .from(tableName)
            .timeout(timeout)
    }

    const find = (filters) => {
        return knex.select(selectableProps)
            .from(tableName)
            .where(filters)
            .timeout(timeout)
    }

    const findOne = (filters) => {
        return find(filters)
            .then(result => {
               if(!Array.isArray(result)) return result;
               return result[0];
            });
    }

    const findById = (id) => {
        return knex.select(selectableProps)
            .from(tableName)
            .where('id', id)
            .timeout(timeout);
    }

    const update = (id, props) => {
        return knex(tableName)
            .where('id', id)
            .update(props)
            .timeout(timeout)
    }

    const destroy = (id) => {
        return knex(tableName)
            .where('id', id)
            .del()
            .timeout(timeout)
    }

    return {
        name,
        tableName,
        selectableProps,
        timeout,
        createOne,
        findAll,
        find,
        findOne,
        findById,
        update,
        destroy
    };
};
