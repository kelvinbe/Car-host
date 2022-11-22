import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';

import { loadStories } from './storyLoader';

import './rn-addons';
import { themeDecorator } from './decorators/themeDecorator';
import { containerDecorator } from './decorators/containerDecorator';

/**
 * @note this order is important for theming to work
 */
addDecorator(themeDecorator);
addDecorator(containerDecorator);

configure(() => {
  loadStories();
}, module);

const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
});

export default StorybookUIRoot;
