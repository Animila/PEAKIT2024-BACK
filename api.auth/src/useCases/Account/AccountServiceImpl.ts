import {IAccountService} from "./IAccountService";
import {IRegisterRequestDTO, IUpdateRequestDTO} from "./IAccountDTO";
import {Account} from "../../domains/Account/Account";
import {AccountMap} from "../../mappers/AccountMap";
import {Guard} from "../../../support/logic/Guard";
import {IAccountRepo} from "../../repositories/IAccountRepo";
import {Email} from "../../domains/valueObject/Email";
import {Phone} from "../../domains/valueObject/Phone";
import {Password} from "../../domains/valueObject/Password";
import {Roles, UserRole} from "../../domains/valueObject/UserRole";
import {Result} from "../../../support/logic/Result";

export default class AccountServiceImpl implements IAccountService {
    private accountRepo: IAccountRepo

    constructor(accountRepo: IAccountRepo) {
        this.accountRepo = accountRepo
    }
    async changeEmail(accountId: number, newEmail: string): Promise<Account> {
        var account: Account = await this.getAccount(accountId)
        await this.checkEmail(account, newEmail)
        if(newEmail.match(account.getEmail().getFull())) return account
        account.updateInfo(undefined, account.getEmail()?.getFull())
        await this.store(account)
        return account
    }

    changePassword(accountId: number, password: string): Promise<Account> {
        throw new Error('Method not implemented.')
    }

    changePhone(accountId: number, phone: string): Promise<Account> {
        throw new Error('Method not implemented.')
    }

    async findAccountByEmail(email: string): Promise<Account | null> {
        const account = await this.accountRepo.findByEmail(email)
        if(!account) return null
        return account
    }

    async findAccountById(accountId: number): Promise<Account | null> {
        const guardedProps = [{ argument: accountId, argumentName: 'accountId' }]
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps)
        if (!guardResult.succeeded) return null
        const existAccount = await this.accountRepo.findById(accountId)
        if(!existAccount) return null
        return AccountMap.toPersistence(existAccount)

    }

    findAccountByPhone(phone: string): Promise<Account | null> {
        throw new Error('Method not implemented.')
    }

    async getAccount(accountId: number): Promise<any> {
        var account: Account | null = await this.findAccountById(accountId)
        if(!account) throw new Error('Ошибка получения аккаунта')
        return AccountMap.toPersistence(account)
    }

    isEmailAvailable(email: string): boolean {
        return false;
    }

    isPhoneAvailable(phone: string): boolean {
        return false;
    }

    async login(password: string, email: string): Promise<Account> {
        var passwordOrError = Password.create({value: password})
        var emailOrError = Email.create(email!)
        const result = Result.combine([passwordOrError, emailOrError])

        if (result && result.isFailure) throw new Error(result.errorValue())

        const account = await this.accountRepo.findByEmail(email!)
        if (!account) throw new Error('Логин или пароль неверный')

        const checkedPassword = passwordOrError.getValue()
        const passwordValid = await account.getPassword().comparePassword(checkedPassword!.value)
        if (!passwordValid) throw new Error('Логин или пароль неверный')

        return account
    }

    async signUp(request: IRegisterRequestDTO): Promise<Account> {
        console.log('1')
        var accountEmailOrError = Email.create(request.email!)
        var accountPhoneOrError = Phone.create(request.phone!)
        var accountPasswordOrError = Password.create({
            value: request.password,
        })
        var userRoleOrError = UserRole.create(Roles.user)
        const result = Result.combine([
            accountEmailOrError,
            accountPhoneOrError,
            accountPasswordOrError,
            userRoleOrError,
        ])
        if (result && result.isFailure) {
            throw new Error('Ошибка валидации: ' + result.error)
        }

        const email = accountEmailOrError.getValue()
        const phone = accountPhoneOrError.getValue()
        const password = accountPasswordOrError.getValue()

        const accountEmail = await this.accountRepo.findByEmail(email!)
        const accountPhone = await this.accountRepo.findByPhone(phone!)
        console.log('2345', accountEmail, accountPhone)
        if (!!accountEmail || !!accountPhone) throw new Error('Почта или телефон уже используются')

        const newAccount = Account.create({
            password: password!,
            phone: phone,
            email: accountEmailOrError.getValue()!,
            user_role: userRoleOrError.getValue()!,
            created_at: new Date(Date.now()),
        })
        if (newAccount.isFailure) {
            throw new Error('Ошибка создания пользователя')
        }

        const userSave = await this.accountRepo.save(newAccount.getValue()!)
        if (!userSave) {
            throw new Error('Ошибка сохранения пользователя')
        }
        return userSave
    }

    async store(account: Account): Promise<Account> {
        const saveAccount = await this.accountRepo.save(account)
        if (!saveAccount) {
            throw new Error('Ошибка обновления пользователя')
        }
        return saveAccount
    }

    update(data: IUpdateRequestDTO, user: Account): Promise<Account> {
        throw new Error('Method not implemented.')
    }

    async checkEmail(user: Account, newEmail: string): Promise<void> {
        if (Email.create(newEmail).isFailure) {
            throw new Error('ошибка')
        }

        var otherUser = await this.findAccountByEmail(newEmail)
        if (!otherUser) {
            throw new Error('найден')
        }
    }

}