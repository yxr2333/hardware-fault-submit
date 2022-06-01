import request from "../../utils/request";
import {QueryHistoryData} from "./data";

export function queryHistoryData(data : QueryHistoryData) {
    return request('/hardware/get/submit/record',{
        method: 'POST',
        data
    })
}