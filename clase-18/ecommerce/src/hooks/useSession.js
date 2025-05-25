import { Platform } from "react-native";
import { WebStorage } from "./webStorage";

let SQLite;
if (Platform.OS !== "web") {
    SQLite = require("expo-sqlite");
}

class WebSessionManager {
    constructor() {
        this.STORAGE_KEY = "user_session";
    }

    async initDB() {
        return true;
    }

    async insertSession({ localId, email, token }){
        try {
            const session = {
                localId,
                email,
                token,
                //createdAt: new Date().toISOString(), // VER SI ESTA OK
            }

            return WebStorage.setItem(this.STORAGE_KEY, session);
        } catch (error) {
            console.error("Error inserting session", error);
        }
    }

    async getSession() {
        try {
            const session = WebStorage.getItem(this.STORAGE_KEY);
            return session;
        } catch (error) {
            console.error("Error getting session", error);
            return null;
        }
    }

    async truncateSessionTable() {
        try {
            return WebStorage.removeItem(this.STORAGE_KEY);
        } catch (error) {
            console.error("Error removing session from localStorage", error);
            return { success: false, error };
        }
    }


}

class MobileSessionManager {
    constructor() {
        this.db = null;
    }

    async openDatabase() {
        if (!this.db) {
            this.db = SQLite.openDatabaseAsync("sessions.db");
        }
        return this.db;
    }

    async initDB() {
        const db = await this.openDatabase();
        const sql = `CREATE TABLE IF NOT EXISTS sessions (
            localId TEXT PRIMARY KEY NOT NULL,
            email TEXT NOT NULL,
            token TEXT NOT NULL
            )`
        const res = await db.execAsync(sql)
        return res;
    }

    async insertSession({ localId, email, token }) {
        const db = await this.openDatabase();
        const sql = `INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?)`
        const args = [localId, email, token]
        const res = await db.runAsync(sql, args)
        return res;
    }

    async getSession() {
        const db = await this.openDatabase();
        const sql = `SELECT * FROM sessions`
        const firstRow = await db.getFirstAsync(sql)
        return firstRow;
    }

    async truncateSessionTable() {
        const db = await this.openDatabase();
        const sql = `DELETE FROM sessions`
        const res = await db.execAsync(sql)
        return res;
    }
}

export const useSession = () => {
    const sessionManager = Platform.OS === "web" 
    ? new WebSessionManager() 
    : new MobileSessionManager();
    
    return {
        initDB: () => sessionManager.initDB(),
        insertSession: ({ localId, email, token }) => sessionManager.insertSession({ localId, email, token }),
        getSession: () => sessionManager.getSession(),
        truncateSessionTable: () => sessionManager.truncateSessionTable(),
    }
}