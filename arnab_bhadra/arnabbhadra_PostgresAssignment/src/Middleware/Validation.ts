import {page} from "./Page";

const validationPageAndPageSize = function (pageSize: page, noOfrecords: number): Array<number> | boolean {
    if (Number.isInteger(pageSize.page) && Number.isInteger(pageSize.size)) {
        const maxNumberOfPages = Math.ceil(noOfrecords / pageSize.size);
        let minIndex = 0;
        if (pageSize.page < maxNumberOfPages) {
            minIndex = pageSize.page * pageSize.size;
            const maxIndex = noOfrecords < pageSize.size ? noOfrecords : pageSize.size * (pageSize.page + 1);
            return [minIndex, maxIndex];
        }
        else {
            return false;
        }

    }
    else {
        return false;
    }
}

export {validationPageAndPageSize};