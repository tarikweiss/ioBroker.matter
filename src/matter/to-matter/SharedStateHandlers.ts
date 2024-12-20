import type { Endpoint } from '@matter/main';
import type { BridgedNodeEndpoint, RootEndpoint } from '@matter/main/endpoints';
import { PropertyType } from '../../lib/devices/DeviceStateObject';
import type GenericDevice from '../../lib/devices/GenericDevice';

/**
 * Initializes the reachable state handler for a device and map it to the Basic Information Cluster of the Matter +
 * device.
 */
export async function initializeUnreachableStateHandler(
    endpoint: Endpoint<RootEndpoint>,
    ioBrokerDevice: GenericDevice,
): Promise<void> {
    if (!ioBrokerDevice.propertyNames.includes(PropertyType.Unreachable)) {
        return;
    }

    ioBrokerDevice.onChange(async event => {
        switch (event.property) {
            case PropertyType.Unreachable:
                await endpoint.set({
                    basicInformation: {
                        reachable: !event.value,
                    },
                });
                break;
        }
    });

    await endpoint.set({
        basicInformation: {
            reachable: !ioBrokerDevice.getUnreachable(),
        },
    });
}

/**
 * Initializes the reachable state handler for a device and map it to the Bridged Node Basic Information Cluster of the
 * Matter device.
 */
export async function initializeBridgedUnreachableStateHandler(
    endpoint: Endpoint<BridgedNodeEndpoint>,
    ioBrokerDevice: GenericDevice,
): Promise<void> {
    if (!ioBrokerDevice.propertyNames.includes(PropertyType.Unreachable)) {
        return;
    }

    ioBrokerDevice.onChange(async event => {
        switch (event.property) {
            case PropertyType.Unreachable:
                await endpoint.set({
                    bridgedDeviceBasicInformation: {
                        reachable: !event.value,
                    },
                });
                break;
        }
    });

    await endpoint.set({
        bridgedDeviceBasicInformation: {
            reachable: !ioBrokerDevice.getUnreachable(),
        },
    });
}

/**
 * Initialize other Maintenance states for the device and Map it to Matter.
 * TODO: Implement when we know the mapping
 */
export async function initializeMaintenanceStateHandlers(
    _endpoint: Endpoint<any>,
    _ioBrokerDevice: GenericDevice,
): Promise<void> {
    // TODO Add more
}
