import {User} from "../user/data";

export interface Device {
    id :number,
    sn :string,
    computerName :string,
    deviceName :string,
    deviceOs :DeviceOs|undefined,
    deviceStatus :DeviceStatus|undefined,
    belong :string,
    deviceType :DeviceType|undefined,
    department :Department|undefined
}

export interface HardwareFaultUploadParam {
    device :Device | null,
    description :string | null,
    imgUrl :string | null,
    emergency :number | null,
    notes :string | null,
    submitUser: User | null
}
export interface DeviceType {
    id :number,
    name :string
}
export interface DeviceOs {
    id :number,
    name :string
}
export interface DeviceStatus {
    id :number,
    name :string
}

export interface DepartmentCate{
    id :number,
    name :string
}

export interface Room{
    id :number,
    roomNo :number,
    landLine :string,
    inlinePhone :string,
    locateFloor :number,
}

export interface Department {
    id :number,
    departmentName :string,
    updatedTime :string,
    note :string,
    locateFloor :number,
    isDeleted :boolean,
    room :Room,
    category :DepartmentCate,
    status :boolean
}