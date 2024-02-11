import { Account } from '../domains/Account/Account'
import { Email } from '../domains/valueObject/Email'
import {Phone} from "../domains/valueObject/Phone";

export interface IAccountRepo {
	save(account: Account): Promise<Account | null>
	findByEmail(email: string | Email): Promise<Account | null>
	findByPhone(phone: string | Phone): Promise<Account | null>
	findById(id: number): Promise<Account | null>
}
