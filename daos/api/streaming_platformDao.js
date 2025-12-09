const con = require('../../config/dbconfig')
const {queryAction} = require('../../helpers/queryAction')

const streaming_platformDao = {
    table: 'streaming_platform',

    // every production company involved with a streaming platform
    streamingProduction: (res, table)=> {

        const sql = `SELECT sp.streaming_platform, GROUP_CONCAT(DISTINCT pr.producer SEPARATOR ', ') AS production
                    FROM streaming_platform sp
                    LEFT JOIN program_to_streaming USING (streaming_platform_id)
                    LEFT JOIN program p USING (program_id)
                    LEFT JOIN producer pr USING (producer_id)
                    GROUP BY sp.streaming_platform;`

            con.query(
                sql,
                (error, rows)=> {
                    queryAction(res, error, rows, table)
                }
            )
    },
// shows all programs on streaming_platforms
    programsOnStreaming: (res, table)=> {

        const sql = `SELECT sp.streaming_platform, GROUP_CONCAT(DISTINCT p.title SEPARATOR ', ') AS programs
                    FROM streaming_platform sp
                    LEFT JOIN program_to_streaming USING (streaming_platform_id)
                    LEFT JOIN program p USING (program_id)
                    GROUP BY sp.streaming_platform;`

                    con.query(
                        sql,
                        (error, rows)=> {
                            queryAction(res, error, rows, table)
                        }
                    )
    }
}

module.exports = streaming_platformDao