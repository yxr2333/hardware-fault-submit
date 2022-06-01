/*
报障编号
设备编号
设备名称
上报时间
报障描述
报障备注
报障状态
 */
export interface IHistoryData {
    id: number;
    deviceId: number;
    deviceName: string;
    submitTime: string;
    description: string;
    notes: string;
    status: string;
}
export interface QueryHistoryData {
    userId  :number | null;
    pageNum :number;
    pageSize: number;
}