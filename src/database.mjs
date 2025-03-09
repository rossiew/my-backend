// import pg from "pg"
// //pg- js/postgre байланыстыру 


// const pool = new pg.Pool({
//     user: "postgres",
//     host: "localhost",
//     password: "roza2006",
//     port: 5432,
//     database: "postgres" //database/ қай жерде турғанын жазамыз 
// })


// export default pool;


import pg from "pg";

const pool = new pg.Pool({
  connectionString: "postgresql://rossiew:At02m9D2Kts4w0bo5YMpBRnf73uOZVzd@dpg-cv6m6lqj1k6c73e64nlg-a/mydb_kf9m",
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;


//бұл код PostgreSQL дерекқорына қосылуды жеңілдетіп, оны басқа бөліктерде қолдануға мүмкіндік береді.