import { atom } from 'jotai';

export const balanceAtom = atom<number>(0);
export const userAtom = atom<{ name: string; email: string } | null>(null);
