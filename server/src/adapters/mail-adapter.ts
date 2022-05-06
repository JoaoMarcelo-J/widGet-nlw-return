export interface SendMailData{
    subject:string
    body:string
}

export interface MailAdapater{
    sendMail:(data:SendMailData) => Promise<void>;
}