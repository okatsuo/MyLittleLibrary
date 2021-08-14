import { createConnection, ObjectID } from 'typeorm'
const id = new ObjectID().toHexString()
console.log(id)
createConnection().then(() => console.log('[DATABASE] running...')).catch(error => console.log(error))
