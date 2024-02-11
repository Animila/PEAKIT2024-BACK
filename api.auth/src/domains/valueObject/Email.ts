import { ValueObject } from '../../../support/domain/ValueObject'
import { Result } from '../../../support/logic/Result'

export interface IEmail {
	email: string
}

export class Email extends ValueObject<IEmail> {
	getFull(): string {
		return this.props.email
	}

	getDomain(): string {
		return this.props.email.split('@')[1]
	}

	private constructor(props: IEmail) {
		super(props)
	}

	public static create(email: string): Result<Email> {
		if (!this.isValid(email)) {
			return Result.fail('Почта некорректна (--@--.ru)')
		}
		return Result.ok(new Email({ email: this.format(email) }))
	}

	private static format(email: string) {
		return email.trim().toLowerCase()
	}

	private static isValid(email: string): boolean {
		// ..@...ru
		return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		)
	}
}
