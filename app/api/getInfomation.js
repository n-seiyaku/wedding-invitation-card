const { sql } = require('./neonConfig')

export default async function getInfo() {
    const info = await sql`SELECT * FROM infomation`

    return info
}
