const con = require('../../config/dbconfig')
const {queryAction} = require('../../helpers/queryAction')

const directorDao = {
    table: 'director',

    // shows directors with a rating greater than or equal to the value given
    directorRating: (res, table, rating)=> {

        const sql = `SELECT 
                    p.title, p.rating, 
                    GROUP_CONCAT(DISTINCT CONCAT_WS(' ', d.fName, d.lName) SEPARATOR ', ') AS directors
                        FROM director d
                        LEFT JOIN program_to_director USING (director_id)
                        LEFT JOIN program p USING (program_id)
                        WHERE p.rating >= '${rating}'
                        GROUP BY p.program_id;`

            con.query(
                sql, (error, rows)=> {
                    queryAction(res, error, rows, table)
                }
            )
    },

    // gives all directors that have worked on an animation or live-action program
    directorFormat: (res, table, format)=> {

        const sql = `SELECT 
                    p.title, p.format, 
                    GROUP_CONCAT(DISTINCT CONCAT_WS(' ', d.fName, d.lName) SEPARATOR ', ') AS directors
                    FROM director d
                    LEFT JOIN program_to_director USING (director_id)
                    LEFT JOIN program p USING (program_id)
                    WHERE p.format = '${format}'
                    GROUP BY p.program_id;`

        con.query(
            sql,
            (error, rows)=> {
                queryAction(res, error, rows, table)
            }
        )
    }
}

module.exports = directorDao