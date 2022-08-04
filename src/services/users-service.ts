import axios, { AxiosInstance } from "axios";

import { User } from "@/domains/user";
import { UserData } from "@/domains/user-data";

class UsersService {
  private client!: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: "https://frontend-candidate.dev.sdh.com.ua/v1",
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.client.get("contact/").then((response) => response.data);
  }

  async getUser(id: number): Promise<User> {
    return this.client.get(`contact/${id}`).then((response) => response.data);
  }

  async createUser(data: UserData): Promise<User> {
    return this.client.post("contact/", data).then((response) => response.data);
  }

  async updateUser(id: number, user: UserData): Promise<User> {
    return this.client
      .put(`contact/${id}`, user)
      .then((response) => response.data);
  }

  async deleteUser(id: number): Promise<void> {
    return this.client.delete(`contact/${id}`);
  }
}

export default new UsersService();
