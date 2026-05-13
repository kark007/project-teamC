export interface SMSMessage {
    id: number;
    sender: string;
    content: string;
    display_url:string;
    link_url: string;
    threat_type: 'steganography' | 'phishing' | 'smishing' | 'vishing';
    description: string;
}