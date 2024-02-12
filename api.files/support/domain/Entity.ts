import { UniqueEntityID } from './UniqueEntityID'

/**
 * Абстрактный класс представляющий базовую сущность.
 *
 * @template T - Тип данных для свойств сущности.
 */
export abstract class Entity<T> {
	// защищенная переменная идентификатора
	protected readonly _id: UniqueEntityID

	// передаваемое свойство в виде объекта
	public readonly props: T

	/**
	 * Конструктор класса.
	 *
	 * @param {T} props - Свойства сущности.
	 * @param {UniqueEntityID} [id] - Идентификатор сущности, если не предоставлен, то будет сгенерирован новый (UniqueEntityID).
	 */
	constructor(props: T, id?: UniqueEntityID) {
		this._id = id || new UniqueEntityID()
		this.props = props
	}

	/**
	 * Метод сравнения сущностей.
	 *
	 * @param {Entity<T>} [object] - Сущность для сравнения.
	 * @returns {boolean} - Результат сравнения.
	 */
	public equals(object?: Entity<T>): boolean {
		if (object === null || object === undefined) {
			return false
		}

		if (this === object) {
			return true
		}

		if (!(object instanceof Entity)) {
			return false
		}

		return this._id.equals(object._id)
	}
}
