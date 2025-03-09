import pg from "pg"
//pg- js/postgre байланыстыру 


const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    password: "roza2006",
    port: 5432,
    database: "postgres" //database/ қай жерде турғанын жазамыз 
})


export default pool;


//бұл код PostgreSQL дерекқорына қосылуды жеңілдетіп, оны басқа бөліктерде қолдануға мүмкіндік береді.