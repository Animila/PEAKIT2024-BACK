import jwt from 'jsonwebtoken'
export class JWT {
    public generateToken(user_id: number, role: string[]) {
        const payload = {
            user_id,
            role
        }
        return jwt.sign(payload, process.env.SECRET_JWT || 'secret', {
            expiresIn: '24h'
        })
    }

    public getMeAccountIDJWT(token: string) {
        const {user_id: accountId}: any = jwt.verify(token, process.env.SECRET_JWT || 'secret')
        return accountId
    }
}