export class ValueObject<T> {
    private readonly _value: T
    constructor(value: T) {
        this._value = value
    }

    get value(): T {
        return this._value
    }

    toString = () => {
        if (typeof this.value !== 'object' || this.value === null)  {
            try {
                return this.value.toString()
            } catch(e) {
                return this.value + ""
            }
        }
        const value = this.value.toString()
        if (value === '[object Object]') {
            return JSON.stringify(this.value)
        }
        return value
    }
}