import { compare, genSaltSync, hashSync } from 'bcrypt'
import { ValueObject } from '../../../support/domain/ValueObject'
import { Result } from '../../../support/logic/Result'
import { Guard } from '../../../support/logic/Guard'

interface IUserPasswordProps {
	value: string
	hashed?: boolean
}

export class Password extends ValueObject<IUserPasswordProps> {
	get value(): string {
		return this.props.value
	}

	private constructor(props: IUserPasswordProps) {
		super(props)
	}

	public isAlreadyHashed(): boolean {
		return this.props.hashed!
	}

	public async comparePassword(plainTextPassword: string): Promise<boolean> {
		let hashed: string

		if (this.isAlreadyHashed()) {
			hashed = this.props.value

			return compare(plainTextPassword, hashed)
		}

		return this.props.value === plainTextPassword
	}

	public async getHashedValue(): Promise<string> {
		if (this.isAlreadyHashed()) {
			return this.props.value
		}

		const salt = genSaltSync(10)

		return hashSync(this.props.value, salt)
	}

	public static create({
		value,
		hashed,
	}: IUserPasswordProps): Result<Password> {
		const propsResult = Guard.againstNullOrUndefined(value, 'password')

		if (!propsResult.succeeded) {
			return Result.fail(propsResult.message)
		}

		const userPassword = new Password({
			value,
			hashed,
		})

		return Result.ok(userPassword)
	}
}
