import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

export const useDb = () => {
    const openDatabase = async () => {
    try {
        return await SQLite.openDatabaseAsync("sessions.db");
    } catch (error) {
        console.log("Falling back to openDatabase()", error);
        return SQLite.openDatabase("sessions.db");
    }
}


    const initDB = async () => {
        const db = await openDatabase();
        const sql = `CREATE TABLE IF NOT EXISTS sessions (
            localId TEXT PRIMARY KEY NOT NULL,
            email TEXT NOT NULL,
            token TEXT NOT NULL
            )`
            console.log("Creating table", sql);
        const res = await db.execAsync(sql)
        console.log("Database initialized", res);
        return res;
    }

    const insertSession = async ({localId, email, token}) => {
        const db = await openDatabase();
        const sql = `INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?)`
        const args = [localId, email, token]
        const res = await db.runAsync(sql, args)
        console.log("Session inserted", res);
        return res;
    }

    const getSession = async () => {
        const db = await openDatabase();
        const sql = `SELECT * FROM sessions`
        const firstRow = await db.getFirstAsync(sql)
        console.log("Session retrieved", firstRow);
        return firstRow;
    }

    const truncateSessionTable = async () => {
        const db = await openDatabase();
        const sql = `DELETE FROM sessions`
        const res = await db.execAsync(sql)
        console.log("Session table truncated", res);
        return res;
    }

    return {
        initDB,
        insertSession,
        getSession,
        truncateSessionTable,
    }
}