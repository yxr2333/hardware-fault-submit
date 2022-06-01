import {Department} from "../home/data";

export interface UserLoginParam {
    code: string | null,
    id: number | null,
    password: string | null
}

export interface User {
    id: number,
    name: string,
    department: Department | null,
    userPosition: UserPosition | null,
    phone: string | null,
    shortPhone: string | null,
    workPhone: string | null,
    email: string | null,
    qq: string | null,
    wechat: string | null,
    userRole :UserRole | null,
    isChairMan: boolean,
    isNurseBoos: boolean,
    password: string | null,
    status: boolean,
    isDeleted: boolean,
    createTime: string,
    bannedTime: string | null,
    deleteTime: string | null,
    updateTime: string | null,

}
export interface UserRole {
    id: number,
    roleName: string,
}

export interface UserPosition {
    id: number,
    name: string
}