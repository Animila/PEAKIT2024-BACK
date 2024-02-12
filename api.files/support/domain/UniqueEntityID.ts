/**
 * Генерация случайного цифрового идентификатора по дате (4 цифры).
 *
 * Возвращает цифровой идентификатор (number).
 */
function generateNumberId(): number {
	return parseInt(Date.now().toString().slice(-7))
}

/**
 * Класс представляющий уникальный цифровой идентификатор.
 */
export class UniqueEntityID {
	private value: number

	/**
	 * Конструктор класса.
	 *
	 * @param {number} [id] - Идентификатор, если не предоставлен, то будет сгенерирован.
	 */
	constructor(id?: number) {
		this.value = id || generateNumberId()
	}

	/**
	 * Проверка равенства идентификаторов.
	 *
	 * @param {UniqueEntityID} [id] - Идентификатор для сравнения (UniqueEntityID).
	 * @returns {boolean} - Результат сравнения.
	 */
	equals(id?: UniqueEntityID): boolean {
		if (id === null || id === undefined) {
			return false
		}

		if (!(id instanceof UniqueEntityID)) {
			return false
		}

		return id.toValue() === this.value
	}

	toString(): string {
		return String(this.value)
	}

	toValue(): number {
		return this.value
	}
}
