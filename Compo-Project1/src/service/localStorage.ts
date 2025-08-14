// src/service/localStorage.ts
// Utility for storing and retrieving user interaction data in localStorage
export type UserInteraction = {
    type: string;
    payload: unknown;
    timestamp: number;
};

const STORAGE_PREFIX = 'user_interactions_';

export function saveInteraction(section: string, type: string, payload: unknown) {
    const key = STORAGE_PREFIX + section;
    const interactions: UserInteraction[] = getInteractions(section);
    interactions.push({ type, payload, timestamp: Date.now() });
    localStorage.setItem(key, JSON.stringify(interactions));
}

export function getInteractions(section: string): UserInteraction[] {
    const key = STORAGE_PREFIX + section;
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
}

export function clearInteractions(section: string) {
    const key = STORAGE_PREFIX + section;
    localStorage.removeItem(key);
}
