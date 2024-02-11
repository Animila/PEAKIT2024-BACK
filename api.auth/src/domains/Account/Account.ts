import { AggregateRoot } from '../../../support/domain/AggregateRoot'
import { UniqueEntityID } from '../../../support/domain/UniqueEntityID'
import { Guard } from '../../../support/logic/Guard'
import { Result } from '../../../support/logic/Result'
import { Email } from '../valueObject/Email'
import { Password } from '../valueObject/Password'
import { Phone } from '../valueObject/Phone'
import { UserRole } from '../valueObject/UserRole'

interface IAccount {
	email: Email
	password: Password
	phone?: Phone
	user_role: UserRole
	created_at: Date
	updated_at?: Date
}

export class Account extends AggregateRoot<IAccount> {
	private constructor(props: IAccount, id?: UniqueEntityID) {
		super(props, id)
	}

	getEmail(): Email {
		return this.props.email
	}

	getPhone(): Phone | null {
		return this.props.phone || null
	}

	getRole(): UserRole {
		return this.props.user_role
	}

	getDateCreate(): Date {
		return this.props.created_at
	}
	getDateLastChange(): Date | undefined {
		return this.props.updated_at
	}

	getPassword(): Password {
		return this.props.password
	}


	setPassword(password: string): void {
		this.props.password = Password.create({ value: password }).getValue()!
	}

	updateInfo(phone?: string, email?: string): void {
		var newPhone
		var newEmail
		if (phone) newPhone = Phone.create(phone)
		if (email) newEmail = Email.create(email)

		if (newPhone && newPhone.isFailure)
			throw new Error('' + newPhone.errorValue())

		if (newEmail && newEmail.isFailure)
			throw new Error('' + newEmail.errorValue())

		if (newPhone) this.props.phone = newPhone.getValue()!
		if (newEmail) this.props.email = newEmail.getValue()!
	}
	public static create(props: IAccount, id?: UniqueEntityID): Result<Account> {
		const guardedProps = [
			{ argument: props.email, argumentName: 'почта' },
			{ argument: props.phone, argumentName: 'телефон' }
		]

		const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps)

		if (!guardResult.succeeded) {
			return Result.fail<Account>(guardResult.message)
		}
		const user = new Account(props, id)
		const idIsNotEmpty = !!id
		return Result.ok<Account>(user)
	}
}
