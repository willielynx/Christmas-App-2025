const con = require('../../config/dbconfig')
const {queryAction} = require('../../helpers/queryAction')

const actorDao = {
    table: 'actor',

    // shows all actors that are involved with certain rating such as G, PG, PG-13, R
    actorProgramRating: (res, table, rating)=> {

        const sql = `SELECT
        p.title, 
        p.program_rating,
        GROUP_CONCAT(DISTINCT CONCAT_WS(' ', a.fName, a.lName) SEPARATOR ', ') AS actors
                    FROM actor a
                    JOIN program_to_actor USING (actor_id) 
                    JOIN program p using (program_id)
                    WHERE p.program_rating = '${rating}'
                    GROUP BY p.program_id;`

            con.query(
                sql, (error, rows)=> {
                    queryAction(res, error, rows, table)
                }
            )
    },

    // shows all actors that are involved with certain format such as live-action or animation
    actorFormat: (res, table, format)=> {

        const sql = `SELECT
        p.title,
        p.format,
        GROUP_CONCAT(DISTINCT CONCAT_WS(' ', a.fName, a.lName) SEPARATOR ', ') AS actors
            FROM actor a
            JOIN program_to_actor USING (actor_id)
            JOIN program p using (program_id)
            WHERE p.format = '${format}'
            GROUP BY p.program_id;`

            con.query(
                sql,
                (error,rows)=> {
                    queryAction(res, error, rows, table)
                }
            )
    }
}

module.exports = actorDao