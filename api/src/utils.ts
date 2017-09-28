import * as Bcrypt from 'bcrypt';

export default {
    genPassword(password: string): Promise<string> {
        let encryptPassword
        let saltRounds: number = 10

        Bcrypt.genSalt(saltRounds, function(err, salt) {
            Bcrypt.hash(password, salt, function(err, hash) {
                return hash
            })
        })

        return encryptPassword
    }
}
