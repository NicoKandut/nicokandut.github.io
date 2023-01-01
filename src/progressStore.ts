import { writable } from "svelte/store";

interface ProgressStore {
  headerUnlocked: boolean
  footerUnlocked: boolean
}

export const progressStore = writable({
  headerUnlocked: false,
} as ProgressStore);