/**
 * Представляет результат операции, который может быть успешным или неудачным.
 * @template T - Тип значения, которое содержит успешный результат.
 */
export class Result<T> {
	public isSuccess: boolean
	public isFailure: boolean
	public error?: T | string

	// Значение результата
	private _value?: T

	/**
	 * Конструктор класса Result.
	 * @param {boolean} isSuccess - Флаг успешности результата.
	 * @param {T | string} error - Значение ошибки (при неудачном результате).
	 * @param {T} value - Значение успешного результата.
	 */
	constructor(isSuccess: boolean, error?: T | string, value?: T) {
		if (isSuccess && error) {
			throw new Error(
				'Недопустимая операция: результат не может быть успешным и содержать ошибку'
			)
		}
		if (!isSuccess && !error) {
			throw new Error(
				'Недопустимая операция: Неудачный результат должен содержать сообщение об ошибке'
			)
		}

		this.isSuccess = isSuccess
		this.isFailure = !isSuccess
		this.error = error
		this._value = value

		Object.freeze(this)
	}

	/**
	 * Получение значения успешного результата.
	 * @throws {Error} - Ошибка при попытке получить значение неудачного результата.
	 * @returns {T | undefined} - Значение успешного результата.
	 */
	getValue(): T | undefined {
		if (!this.isSuccess) {
			console.log(this.error)

			throw new Error(
				"Не удается получить значение результата ошибки. Вместо этого используйте 'errorValue'."
			)
		}

		return this._value
	}

	/**
	 * Получение значения ошибки (неудачного результата).
	 * @returns {T} - Значение ошибки.
	 */
	errorValue(): T {
		return this.error as T
	}

	/**
	 * Создание успешного результата.
	 * @template U - Тип значения успешного результата.
	 * @param {U} value - Значение успешного результата.
	 * @returns {Result<U>} - Результат операции.
	 */
	static ok<U>(value?: U): Result<U> {
		return new Result<U>(true, undefined, value)
	}

	/**
	 * Создание неудачного результата.
	 * @template U - Тип значения успешного результата.
	 * @param {any} error - Значение ошибки.
	 * @returns {Result<U>} - Результат операции.
	 */
	static fail<U>(error: any): Result<U> {
		return new Result<U>(false, error)
	}

	/**
	 * Комбинирование результатов операций.
	 * Возвращает первый неудачный результат или успешный результат, если все результаты успешны.
	 * @param {Result<any>[]} results - Массив результатов операций.
	 * @returns {Result<any>} - Результат операции.
	 */
	static combine(results: Result<any>[]): Result<any> {
		for (const result of results) {
			if (result.isFailure) return result
		}
		return Result.ok()
	}
}

/**
 * Тип Either представляет альтернативу (либо/или) между Failure и Success.
 * @template L - Тип значения ошибки.
 * @template A - Тип значения успешного результата.
 */
export type Either<L, A> = Failure<L, A> | Success<L, A>

/**
 * Класс Failure представляет неудачный результат операции.
 * @template L - Тип значения ошибки.
 * @template A - Тип значения успешного результата.
 */
export class Failure<L, A> {
	readonly value: L

	constructor(value: L) {
		this.value = value
	}

	/**
	 * Проверка наличия ошибки.
	 * @returns {boolean} - Всегда возвращает true.
	 */
	isFailure(): this is Failure<L, A> {
		return true
	}

	/**
	 * Проверка отсутствия успешного результата.
	 * @returns {boolean} - Всегда возвращает false.
	 */
	isSuccess(): this is Success<L, A> {
		return false
	}
}

/**
 * Класс Success представляет успешный результат операции.
 * @template L - Тип значения ошибки.
 * @template A - Тип значения успешного результата.
 */

export class Success<L, A> {
	readonly value: A

	/**
	 * Конструктор класса Success.
	 * @param {A} value - Значение успешного результата.
	 */
	constructor(value: A) {
		this.value = value
	}

	/**
	 * Проверка наличия ошибки.
	 * @returns {boolean} - Всегда возвращает false.
	 */
	isFailure(): this is Failure<L, A> {
		return false
	}

	/**
	 * Проверка наличия успешного результата.
	 * @returns {boolean} - Всегда возвращает true.
	 */
	isSuccess(): this is Success<L, A> {
		return true
	}
}

/**
 * Создание неудачного результата.
 * @template L - Тип значения ошибки.
 * @template A - Тип значения успешного результата.
 * @param {L} l - Значение ошибки.
 * @returns {Either<L, A>} - Результат операции (Failure).
 */
export const failure = <L, A>(l: L): Either<L, A> => {
	return new Failure(l)
}

/**
 * Создание успешного результата.
 * @template L - Тип значения ошибки.
 * @template A - Тип значения успешного результата.
 * @param {A} a - Значение успешного результата.
 * @returns {Either<L, A>} - Результат операции (Success).
 */
export const success = <L, A>(a: A): Either<L, A> => {
	return new Success<L, A>(a)
}

