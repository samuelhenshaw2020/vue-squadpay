declare module "vue-squadpay"{
    
    interface Metadata {
        [key: string]: unknown
    }
    
    type PaymentChannelsType = 'card'| 'bank' | 'ussd'|'bank_transfer';
    
    type CurrencyType = "NGN" | "USD"

    export interface SquadParams {
        key: string,
        email: string,
        amount: number,
        currencyCode: CurrencyType | string | null, 
        metaData?: Metadata | null,
        passCharge?: boolean | null,
        callbackUrl?: string | null,
        customerName?: string | null,
        reference?: string | null,
        paymentChannels?: PaymentChannelsType[] | null
    }
    
    export interface SquadPayProps {
        text?: string,
        params: SquadParams
    }

    type SquadEvents = {
        close?(): void
        loaded?(): void,
        success?(data: unknown): void,
        err?(): void
    }

    
}