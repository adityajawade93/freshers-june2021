import { app } from "../app/index"
import { setPath } from "../database/clientdb"

const startServer = async () => {
    try {
        await setPath()
        await app.listen(3001)
    
    } catch (e) {
        throw new Error(e)
    }

}

startServer()