import { type DeviceStateObject, PropertyType, ValueType } from './DeviceStateObject';
import ElectricityDataDevice from './ElectricityDataDevice';
import { type DetectedDevice, type DeviceOptions, StateAccessType } from './GenericDevice';

class Ct extends ElectricityDataDevice {
    #dimmer?: DeviceStateObject<number>;
    #brightness?: DeviceStateObject<number>;
    #saturation?: DeviceStateObject<number>;
    #temperature?: DeviceStateObject<number>;
    #setPower?: DeviceStateObject<boolean>;
    #getPower?: DeviceStateObject<boolean>;

    constructor(detectedDevice: DetectedDevice, adapter: ioBroker.Adapter, options?: DeviceOptions) {
        super(detectedDevice, adapter, options);

        this._construction.push(
            this.addDeviceStates([
                {
                    name: 'DIMMER',
                    valueType: ValueType.NumberPercent,
                    accessType: StateAccessType.ReadWrite,
                    type: PropertyType.Dimmer,
                    callback: state => (this.#dimmer = state),
                },
                {
                    name: 'BRIGHTNESS',
                    valueType: ValueType.NumberPercent,
                    accessType: StateAccessType.ReadWrite,
                    type: PropertyType.Brightness,
                    callback: state => (this.#brightness = state),
                },
                {
                    name: 'SATURATION',
                    valueType: ValueType.NumberPercent,
                    accessType: StateAccessType.ReadWrite,
                    type: PropertyType.Saturation,
                    callback: state => (this.#saturation = state),
                },
                {
                    name: 'TEMPERATURE',
                    valueType: ValueType.NumberMinMax,
                    accessType: StateAccessType.ReadWrite,
                    type: PropertyType.Temperature,
                    callback: state => (this.#temperature = state),
                },
                // actual value first, as it will be read first
                {
                    name: 'ON_ACTUAL',
                    valueType: ValueType.Boolean,
                    accessType: StateAccessType.Read,
                    type: PropertyType.Power,
                    callback: state => (this.#getPower = state),
                },
                {
                    name: 'ON',
                    valueType: ValueType.Boolean,
                    accessType: StateAccessType.ReadWrite,
                    type: PropertyType.Power,
                    callback: state => (this.#setPower = state),
                },
            ]),
        );
    }

    getDimmer(): number | undefined {
        if (!this.#dimmer) {
            throw new Error('Dimmer state not found');
        }
        return this.#dimmer.value;
    }

    async setDimmer(value: number): Promise<void> {
        if (!this.#dimmer) {
            throw new Error('Dimmer state not found');
        }
        return this.#dimmer.setValue(value);
    }

    getBrightness(): number | undefined {
        if (!this.#brightness) {
            throw new Error('Brightness state not found');
        }
        return this.#brightness.value;
    }

    async setBrightness(value: number): Promise<void> {
        if (!this.#brightness) {
            throw new Error('Brightness state not found');
        }
        return this.#brightness.setValue(value);
    }

    getSaturation(): number | undefined {
        if (!this.#saturation) {
            throw new Error('Saturation state not found');
        }
        return this.#saturation.value;
    }

    async setSaturation(value: number): Promise<void> {
        if (!this.#saturation) {
            throw new Error('Saturation state not found');
        }
        return this.#saturation.setValue(value);
    }

    getTemperature(): number | undefined {
        if (!this.#temperature) {
            throw new Error('Temperature state not found');
        }
        return this.#temperature.value;
    }

    async setTemperature(value: number): Promise<void> {
        if (!this.#temperature) {
            throw new Error('Temperature state not found');
        }
        return this.#temperature.setValue(value);
    }

    getPower(): boolean | undefined {
        if (!this.#getPower && !this.#setPower) {
            throw new Error('On state not found');
        }
        return (this.#getPower || this.#setPower)?.value;
    }

    async setPower(value: boolean): Promise<void> {
        if (!this.#setPower) {
            throw new Error('On state not found');
        }
        return this.#setPower.setValue(value);
    }
}

export default Ct;
