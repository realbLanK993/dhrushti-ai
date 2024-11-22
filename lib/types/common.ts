export type FetchResponse<T> = {
    request: {
        route: string;
        type: string;
    };
    response: {
        type:string;
        success:boolean;
        data:T;
    };
}