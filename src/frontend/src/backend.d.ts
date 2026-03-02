import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Shop {
    title: string;
    features: Array<string>;
    size: string;
    isAvailable: boolean;
    address: string;
    monthlyRent: bigint;
}
export interface Inquiry {
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface backendInterface {
    getAllInquiries(): Promise<Array<Inquiry>>;
    getShop(): Promise<Shop>;
    submitInquiry(name: string, phone: string, email: string, message: string): Promise<void>;
}
