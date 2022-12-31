import mysql from 'serverless-mysql';

// const db = mysql({
//   config: {
//     host: process.env.MYSQL_HOST,
//     port: process.env.MYSQL_PORT,
//     database: process.env.MYSQL_DATABASE,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD
//   }
// });

const db = mysql({
  config: {
    host: 'divvly-dev-1.csrod58lcx34.ap-south-1.rds.amazonaws.com',
    port: 3306,
    database: 'divvly',
    user: 'divvly',
    password: 'DivvlyGlobal!1202'
  }
});

export default async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}