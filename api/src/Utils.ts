import DBH from './DBH'

export default {
    addUserToDatabase(payload: string) {
        const PAYLOAD = JSON.parse(payload)
        DBH.addUser(PAYLOAD)
    }
}
