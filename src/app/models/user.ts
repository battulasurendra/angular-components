export interface User {
    emailID: string;
    bizID?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: Address;
    gender?: string;
    dob?: string;
    profilePic?: string;
    role?: string;
}

export interface Address {
    street: string;
    city: string;
    province: string;
    country: string;
    postalcode: string;
}

export interface Signup {
    role: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailID: string;
    password: string;
}

export interface Login {
    role: string;
    emailID: string;
    password: string;
}

export interface Forgot {
    emailID: string;
}

export interface Reset {
    password: string;
    verificationCode: string;
}
export interface NotificationList {
    unread: number;
    data: any[];
}
