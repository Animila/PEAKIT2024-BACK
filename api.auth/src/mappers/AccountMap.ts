// @ts-ignore
import {Account as PersistanceAccount} from "@prisma/client";
import {Account} from "../domains/Account/Account";
import {Email} from "../domains/valueObject/Email";
import {Phone} from "../domains/valueObject/Phone";
import {Password} from "../domains/valueObject/Password";
import {Result} from '../../support/logic/Result'
import {UserRole} from "../domains/valueObject/UserRole";
import {UniqueEntityID} from "../../support/domain/UniqueEntityID";
export class AccountMap {
    public static toDomain(raw: PersistanceAccount): Account | null {
        const emailOrError = Email.create(raw.email)
        const phoneOrError = raw.phone ? Phone.create(raw.phone) : Result.ok(null)
        const roleOrError = UserRole.create(raw.user_role)
        const passwordOrError = raw.password ? Password.create({value: raw.password, hashed: true}) : Result.ok(null)

        const isError =
            emailOrError.isFailure ||
            phoneOrError.isFailure ||
            roleOrError.isFailure ||
            passwordOrError.isFailure

        if (isError) {
            return null
        }

        const accountOrError = Account.create({
            email: emailOrError.getValue()!,
            phone: phoneOrError.getValue()!,
            user_role: roleOrError.getValue()!,
            password: passwordOrError.getValue()!,
            created_at: new Date(raw.created_at),
            updated_at: raw.updated_at ? new Date(raw.updated_at) : undefined,
        },
            new UniqueEntityID(raw.id))

        if (accountOrError.isFailure) {
            console.log(accountOrError.error)
            return null
        }

        if (accountOrError.isSuccess) {
            return accountOrError.getValue()!
        }

        return null

    }

    public static async toPersistence(account: Account): Promise<any> {
        return {
            id: account.id.toValue(),
            phone: account.getPhone()?.getFullPhone(),
            email: account.getEmail().getFull(),
            user_role: account.getRole().getValue(),
            password: await account.getPassword().getHashedValue(),
            created_at: account.getDateCreate(),
            updated_at: account.getDateLastChange(),
        }
    }
}