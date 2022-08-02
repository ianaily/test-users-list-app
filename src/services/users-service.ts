import axios, { AxiosInstance } from 'axios';

import { User } from '@/domains/user';
import { UserData } from '@/domains/user-data';

class UsersService {
    private client!: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: "https://frontend-candidate.dev.sdh.com.ua/v1",
            headers: {
                "Content-type": "application/json"
            }
        });
    }

    async getUsers(): Promise<User[]> {
        return this.client.get('contact/');
    }

    async getUser(id: number): Promise<User> {
        return this.client.get(`contact/${id}`);
    }

    async createUser(data: UserData): Promise<User> {
        return this.client.post('contact/');
    }

    async updateUser(user: User): Promise<User> {
        return this.client.put(`contact/${user.id}`);
    }

    async deleteUser(user: User): Promise<void> {
        return this.client.delete(`contact/${user.id}`);
    }
}

export default new UsersService();
