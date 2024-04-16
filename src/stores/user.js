import {defineStore} from 'pinia'

export const useUserStore = defineStore("user",{
    state: () =>({
        userData:"moises",
        Array: []
    }),
});