import request from "../../utils/request";
import {HardwareFaultUploadParam} from "./data";
export function submitHardwareFault(data :HardwareFaultUploadParam) {
    return request('/hardware', {
        method: 'POST',
        data,
    });
}