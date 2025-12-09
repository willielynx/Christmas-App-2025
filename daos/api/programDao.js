const con = require('../../config/dbconfig')
const {queryAction} = require('../../helpers/queryAction')

const programDao = {
    table: 'program',
// joins all the tables together using program. lists title, yr_released, w
    findProgram: (res, table)=> {

        const sql = `SELECT p.title, p.yr_released, p.runtime, p.format, p.rating, p.program_rating, p.summary,p.img_url, pr.producer, 
        GROUP_CONCAT(DISTINCT sp.streaming_platform) AS streaming_platforms,
        GROUP_CONCAT(DISTINCT CONCAT_WS(' ', a.fName, a.lName) SEPARATOR ', ') AS actors,
        GROUP_CONCAT(DISTINCT CONCAT_WS(' ', d.fName, d.lName) SEPARATOR ', ') AS directors
            FROM program p
            LEFT JOIN producer pr USING (producer_id)
            LEFT JOIN program_to_actor USING (program_id) LEFT JOIN actor a USING (actor_id)
            LEFT JOIN program_to_director USING (program_id) LEFT JOIN director d USING (director_id)
            LEFT JOIN program_to_streaming USING (program_id) LEFT JOIN streaming_platform sp USING (streaming_platform_id)
            GROUP BY p.program_id
            ORDER BY p.title;`

            con.query(
                sql,
                (error, rows)=> {
                    queryAction(res, error, rows, table)
                }
            )
    },
    // finds titles that use a certain streaming platform ex: disney plus/peacock
    findByStreaming: (res, table, streaming)=> {

        const sql = `SELECT p.title, p.yr_released, p.runtime, p.format, p.rating, p.program_rating, p.summary,      pr.producer, p.img_url 
        GROUP_CONCAT(DISTINCT sp.streaming_platform) AS streaming_platforms,
        GROUP_CONCAT(DISTINCT CONCAT_WS(' ', a.fName, a.lName) SEPARATOR ', ') AS actors,
        GROUP_CONCAT(DISTINCT CONCAT_WS(' ', d.fName, d.lName) SEPARATOR ', ') AS directors
            FROM program p
            LEFT JOIN producer pr USING (producer_id)
            LEFT JOIN program_to_actor USING (program_id) LEFT JOIN actor a USING (actor_id)
            LEFT JOIN program_to_director USING (program_id) LEFT JOIN director d USING (director_id)
            LEFT JOIN program_to_streaming USING (program_id) LEFT JOIN streaming_platform sp USING (streaming_platform_id)
            WHERE sp.streaming_platform = '${streaming}'
            GROUP BY p.program_id
            ORDER BY p.title;`

            con.query(
                sql,
                (error, rows)=> {
                    queryAction(res,error, rows, table)
                }
            )
    }
}

module.exports = programDao