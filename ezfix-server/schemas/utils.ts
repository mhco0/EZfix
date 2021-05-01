
export default {
    copyArray(any_arr: Array<any>) {
        return JSON.parse(JSON.stringify(any_arr));
    }
} 