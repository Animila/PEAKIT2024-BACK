import { shallowEqual } from 'shallow-equal-object'

/**
 * Интерфейс, представляющий свойства объекта значения.
 */
interface IValueObjectProps {
	[index: string]: any
}

/**
 * Абстрактный класс, представляющий объект значения (Value Object) в предметной области.
 *
 * @template T - Тип данных для свойств объекта значения.
 */
export abstract class ValueObject<T extends IValueObjectProps> {
	//Публичное поле для свойств объекта значения.
	public readonly props: T

	/**
	 * Конструктор класса.
	 *
	 * @param {T} props - Свойства объекта значения.
	 */
	constructor(props: T) {
		this.props = Object.freeze(props)
	}

	/**
	 * Метод сравнения объектов значения.
	 *
	 * @param {ValueObject<T>} [vo] - Объект значения для сравнения.
	 * @returns {boolean} - Результат сравнения. Возвращает `true`, если объекты равны, иначе `false`.
	 */
	public equals(vo?: ValueObject<T>): boolean {
		if (vo === null || vo === undefined) {
			return false
		}

		if (vo.props === undefined) {
			return false
		}

		// Используем shallowEqual для сравнения свойств объектов значения.
		return shallowEqual(this.props, vo.props)
	}
}
