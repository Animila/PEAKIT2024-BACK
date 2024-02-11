import {Account} from "../../domains/Account/Account";
import {IRegisterRequestDTO, IUpdateRequestDTO} from "./IAccountDTO";

export interface IAccountService {
    changeEmail(accountId: number, newEmail: string): Promise<Account>

    changePassword(accountId: number, password: string): Promise<Account>
    changePhone(accountId: number, phone: string): Promise<Account>

    findAccountById(accountId: number): Promise<Account | null>
    findAccountByEmail(email: string): Promise<Account | null>
    findAccountByPhone(phone: string): Promise<Account | null>
    getAccount(accountId: number): Promise<any>

    isEmailAvailable(email: string): boolean
    isPhoneAvailable(phone: string): boolean

    checkEmail(user: Account, newEmail: string): Promise<void>

    login(password: string, email: string): Promise<Account>
    signUp(user: IRegisterRequestDTO): Promise<Account>
    store(account: Account): Promise<Account>
    update(data: IUpdateRequestDTO, user: Account): Promise<Account>
}