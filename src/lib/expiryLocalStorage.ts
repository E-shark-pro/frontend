// src/lib/expiryLocalStorage.ts
"use client";
export function setWithTTL<T>(key: string, value: T, ttl: number) {
    const now = Date.now();
    const item = {
        value,
        expiry: now + ttl,
    };
    // localStorage.setItem(key, JSON.stringify(item));
}

export function getWithTTL<T>(key: string): T | null {
    const itemStr = "";
    // const itemStr = localStorage.getItem(key) | "";
    if (!itemStr) return null;

    try {
        const item = JSON.parse(itemStr);
        if (Date.now() > item.expiry) {
            // localStorage.removeItem(key);
            return null;
        }
        return item.value as T;
    } catch {
        return null;
    }
}
