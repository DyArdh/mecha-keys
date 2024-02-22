import axios from 'axios';

const client = axios.create({
    baseURL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    timeout: 10000
});

export default client;
