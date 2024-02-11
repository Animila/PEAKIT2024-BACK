import { PrismaClient } from '@prisma/client'
import { Account } from '../../domains/Account/Account'
import { Email } from '../../domains/valueObject/Email'
import { IAccountRepo } from '../../repositories/IAccountRepo'
import {AccountMap} from "../../mappers/AccountMap";
import * as console from "console";
import {Phone} from "../../domains/valueObject/Phone";

export class PrismaAccountRepo implements IAccountRepo {
	prisma = new PrismaClient()

	async save(account: Account): Promise<Account | null> {
		const data = await AccountMap.toPersistence(account)
		console.log('1234  ', data.id)
		const savedUser = await this.prisma.account.upsert({
			where: { id: data.id },
			update: data,
			create: data,
		})
		if (!savedUser) return null
		return AccountMap.toDomain(savedUser)
	}
	async findByEmail(email: string | Email): Promise<Account | null> {
		const result = await this.prisma.account.findUnique({
			where: {email: email instanceof Email ? email.getFull() : email,}
		})
		if (!result) return null
		return AccountMap.toDomain(result)
	}
	async findById(id: number): Promise<Account | null> {
		const result = await this.prisma.account.findUnique({
			where: {id: id}
		})
		if (!result) return null
		return AccountMap.toDomain(result)
	}

	async findByPhone(phone: string | Phone): Promise<Account | null> {
		const result = await this.prisma.account.findUnique({
			where: {phone: phone instanceof Phone ? phone.getFullPhone() : phone,}
		})
		if (!result) return null
		return AccountMap.toDomain(result)
	}
}
