import { connection } from './connection';

// Create the database table. if the some table are missing it will automatically create the databases.
console.log('database start')
connection.sync()
console.log('database end')

export { connection };