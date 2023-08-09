export enum CouponType {
    Percentage = '1',
    Fixed = '2',
}

export type CouponModel = {
    id: string,
    name: string,
    code: string,
    startDate: string;
    endDate: string;
    type: CouponType,
    is_active: boolean,
    is_deleted: boolean,
    discount: number,
    amount: number,
    createdAt: string,
    updatedAt: string
};