import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// Auth service implementation
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectID);
    this.account = new Account(this.client);
  }

  // create account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //Login method
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount :: error  " , error);
    }
  }

  // Login method
  async login({ email, password }) {
    try {
        return await this.account.createEmailSession(email, password);
    } catch (error) {
        console.log("Appwrite service :: login :: error  " , error);
    }
  }

  // Logout method
  async logout() {
    try {
        return await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logOut :: error  " , error);
    }
  }

  // current user status
  async getCurrentUser() {
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite service :: getCurrentUser :: error  " , error);
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
