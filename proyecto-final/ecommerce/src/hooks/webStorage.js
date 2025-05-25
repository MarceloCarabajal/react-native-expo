export const WebStorage = {
    setItem: (key, value) => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error setting item in web storage", error);
            return false;
        }
    },
    getItem: (key) => {
        try {
            if (typeof window !== 'undefined') {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            }
            return null;
        } catch (error) {
            console.error("Error getting item from web storage", error);
            return null;
        }
    },
    removeItem: (key) => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem(key);
                return true;
            }
        } catch (error) {
            console.error("Error removing item from web storage", error);
            return false;
        }
    },

}