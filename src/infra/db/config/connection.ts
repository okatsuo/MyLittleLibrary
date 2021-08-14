import { createConnection } from 'typeorm'

createConnection().then(() => console.log('[DATABASE] running...')).catch(error => console.log(error))
