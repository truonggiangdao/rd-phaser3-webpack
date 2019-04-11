import { getBrowserSize } from './browser';

export const updateDeviceSize = deviceSize => {
  const { width, height } = getBrowserSize();
  deviceSize.width = width;
  deviceSize.height = height;
};

export const handleOrientationChange = () => {
  window.deviceSize = {
    width: 0,
    height: 0,
  };
  setInterval(() => updateDeviceSize(window.deviceSize), 10);
};
