/**
 * Абстрактный класс WatchedList представляет собой список, который отслеживает изменения в элементах.
 * Этот класс позволяет добавлять, удалять и проверять элементы в списке,
 * а также получать новые и удаленные элементы с учетом заданного метода сравнения compareItems.
 *
 * @template T - Тип элементов в списке.
 */
export abstract class WatchedList<T> {
	// Массивы текущих, изначальных, новых и удаленных элементов в списке.
	public currentItems: T[]
	private initial: T[]
	private new: T[]
	private removed: T[]

	/**
	 * Конструктор класса.
	 * @param {T[]} [initialItems] - Изначальные элементы при создании списка.
	 */
	constructor(initialItems?: T[]) {
		this.currentItems = initialItems || []
		this.initial = initialItems || []
		this.new = []
		this.removed = []
	}

	/**
	 * Абстрактный метод для сравнения двух элементов списка.
	 *
	 * @abstract
	 * @param {T} a - Первый элемент.
	 * @param {T} b - Второй элемент.
	 * @returns {boolean} - Результат сравнения (boolean).
	 */
	abstract compareItems(a: T, b: T): boolean

	/**
	 * Получение текущих элементов списка.
	 *
	 * @returns {T[]} - Массив текущих элементов .
	 */
	public getItems(): T[] {
		return this.currentItems
	}

	/**
	 * Получение новых элементов, добавленных в список.
	 *
	 * @returns {T[]} - Массив новых элементов.
	 */
	public getNewItems(): T[] {
		return this.new
	}

	/**
	 * Проверка, существует ли элемент в текущем списке.
	 *
	 * @param {T} item - Элемент для проверки.
	 * @returns {boolean} - Результат проверки.
	 */
	public exists(item: T): boolean {
		return this.isCurrentItem(item)
	}

	/**
	 * Добавление элемента в список.
	 *
	 * @param {T} item - Элемент для добавления.
	 */
	public add(item: T): void {
		if (this.isRemovedItem(item)) {
			this.removeFromRemoved(item)
		}

		if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
			this.new.push(item)
		}

		if (!this.isCurrentItem(item)) {
			this.currentItems.push(item)
		}
	}

	/**
	 * Удаление элемента из списка.
	 *
	 * @param {T} item - Элемент для удаления.
	 */
	public remove(item: T): void {
		this.removeFromCurrent(item)

		if (this.isNewItem(item)) {
			this.removeFromNew(item)
			return
		}

		if (!this.isRemovedItem(item)) {
			this.removed.push(item)
		}
	}

	/**
	 * Получение удаленных элементов из списка.
	 *
	 * @returns {T[]} - Массив удаленных элементов.
	 */
	public getRemovedItems(): T[] {
		return this.removed
	}

	/**
	 * Проверка, присутствует ли элемент в текущем списке.
	 *
	 * @private
	 * @param {T} item - Элемент для проверки.
	 * @returns {boolean} - Результат проверки.
	 */
	private isCurrentItem(item: T): boolean {
		return (
			this.currentItems.filter((v: T) => this.compareItems(item, v)).length !==
			0
		)
	}

	/**
	 * Проверка, является ли элемент новым (добавленным после инициализации).
	 *
	 * @private
	 * @param {T} item - Элемент для проверки.
	 * @returns {boolean} - Результат проверки.
	 */
	private isNewItem(item: T): boolean {
		return this.new.filter((v: T) => this.compareItems(item, v)).length !== 0
	}

	/**
	 * Проверка, является ли элемент удаленным.
	 *
	 * @private
	 * @param {T} item - Элемент для проверки.
	 * @returns {boolean} - Результат проверки.
	 */
	private isRemovedItem(item: T): boolean {
		return (
			this.removed.filter((v: T) => this.compareItems(item, v)).length !== 0
		)
	}

	/**
	 * Удаление элемента из списка новых элементов.
	 *
	 * @private
	 * @param {T} item - Элемент для удаления.
	 */
	private removeFromNew(item: T): void {
		this.new = this.new.filter(v => !this.compareItems(v, item))
	}

	/**
	 * Удаление элемента из текущего списка.
	 *
	 * @private
	 * @param {T} item - Элемент для удаления.
	 */
	private removeFromCurrent(item: T): void {
		this.currentItems = this.currentItems.filter(
			v => !this.compareItems(item, v)
		)
	}

	/**
	 * Удаление элемента из списка удаленных элементов.
	 *
	 * @private
	 * @param {T} item - Элемент для удаления.
	 */
	private removeFromRemoved(item: T): void {
		this.removed = this.removed.filter(v => !this.compareItems(item, v))
	}

	/**
	 * Проверка, был ли элемент добавлен в список при инициализации.
	 *
	 * @private
	 * @param {T} item - Элемент для проверки.
	 * @returns {boolean} - Результат проверки.
	 */
	private wasAddedInitially(item: T): boolean {
		return (
			this.initial.filter((v: T) => this.compareItems(item, v)).length !== 0
		)
	}
}
