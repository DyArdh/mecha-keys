import jwt from 'jsonwebtoken';

export function generateToken(
    payload: string | object,
    expiresIn: string | number,
    secret = process.env.NEXTAUTH_SECRET || ''
) {
    return jwt.sign(payload, secret, {
        expiresIn: expiresIn,
        algorithm: 'HS256'
    });
}

export function verifyToken(token: string, secret = process.env.NEXTAUTH_SECRET || '') {
    return jwt.verify(token, secret, {
        algorithms: ['HS256']
    });
}
