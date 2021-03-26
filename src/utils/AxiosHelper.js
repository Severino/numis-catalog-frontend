export default class AxiosHelper {


    static ok(answer) {
        if (answer.data.errors && answer.data.errors.length > 0) {
            return false
        } else return true
    }


    static getErrors(answer) {
        let errors = [];
        if (answer.data.errors && answer.data.errors.length > 0) {
            errors = answer.data.errors.map(errObj => errObj.message)
        }
        return errors
    }
}