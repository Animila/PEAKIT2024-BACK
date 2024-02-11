import { ValueObject } from '../../../support/domain/ValueObject'
import { Result } from '../../../support/logic/Result'

interface IPhone {
	phone: string
}

export class Phone extends ValueObject<IPhone> {
	getFullPhone(): string {
		return this.props.phone
	}

	getOnlyNumber(): number | null {
		const number = this.props.phone.replace(/\D/g, '')
		return number ? parseInt(number) : null
	}

	getNumberCode(): number | null {
		/** получить телефонный код */
		const number = this.props.phone.replace(/\D/g, '')
		return number ? parseInt(number) : null
	}

	getRegionCode(): number | null {
		const code = this.props.phone.match(/\((\d{1,3})\)/)
		return code ? parseInt(code[1]) : null
	}

	getCountryCode(): number | null {
		const code = this.props.phone.match(/^\+(\d{1,1})/)
		return code ? parseInt(code[1]) : null
	}

	private constructor(props: IPhone) {
		super(props)
	}

	public static create(phone: string): Result<Phone> {
		if (!this.isValid(phone)) {
			return Result.fail('Телефон некорректен (+9(999)999-99-99)')
		}
		return Result.ok(new Phone({ phone: phone }))
	}

	public static isValid(phone: string): boolean {
		// +9(999)999-99-99
		return /^\+\d{1,1}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(phone)
	}
}
