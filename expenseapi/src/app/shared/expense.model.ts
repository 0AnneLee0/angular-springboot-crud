// Interface lets Angular application know the type of data it is going to receive from the remote API.

export class Expense{
    pk: string;
    date: Date;
    expense: number;
	business: String;
	category: String;
}