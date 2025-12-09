const con = require('../../config/dbconfig')
const {queryAction} = require('../../helpers/queryAction')

const producerDao = {
    table: 'producer',
    // get all programs produced by the production company
    producerPrograms: (res, table)=> {
        
        const sql = `SELECT 
                GROUP_CONCAT(DISTINCT p.title SEPARATOR ', ') AS titles, pr.producer as production
                    FROM program p
                    LEFT JOIN producer pr USING (producer_id)
                    GROUP BY pr.producer;`

            con.query(
                sql,
                (error, rows)=> {
                    queryAction(res, error, rows, table)
                }
            )
    },
// gives all actors who have worked with the given production company
    producerActors: (res, table)=> {

        const sql = `SELECT
                GROUP_CONCAT(DISTINCT CONCAT_WS(' ', a.fName, a.lName) SEPARATOR ', ') AS actors,
                pr.producer as production
                FROM producer pr
                LEFT JOIN program p USING (producer_id)
                LEFT JOIN program_to_actor USING (program_id)
                LEFT JOIN actor a USING (actor_id)
                GROUP BY pr.producer;`

                con.query(
                    sql,
                    (error, rows)=> {
                        queryAction(res,error, rows, table)
                    }
                )
    }
}

module.exports = producerDao