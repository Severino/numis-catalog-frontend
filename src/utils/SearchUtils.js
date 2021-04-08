import latinize from "latinize"


export default class SearchUtils {


    static filter(filterText, list, property = "name") {
        if (filterText) {
            let text = latinize(filterText).toLowerCase();
            console.log(list);

            list = list.filter((item) => {
                return latinize(item[property]).toLowerCase().match(text);
            });
        }
        return list
    }

}