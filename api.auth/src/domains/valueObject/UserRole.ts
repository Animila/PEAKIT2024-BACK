import { ValueObject } from '../../../support/domain/ValueObject'
import { Result } from '../../../support/logic/Result'

export enum Roles {
	user = 'user',
	moderator = 'moderator',
	admin = 'admin',
}

export interface IUserRole {
	title: string
}

export class UserRole extends ValueObject<IUserRole> {
	getValue(): string {
		return this.props.title
	}

	public static getAvailable() {
		return Roles
	}

	private constructor(props: IUserRole) {
		super(props)
	}

	public static create(role: string): Result<UserRole> {
		if (!this.isValid(role)) {
			return Result.fail('Роль некорректна')
		}
		return Result.ok(new UserRole({ title: role }))
	}

	private static isValid(role: string): boolean {
		return role in Roles
	}
}
