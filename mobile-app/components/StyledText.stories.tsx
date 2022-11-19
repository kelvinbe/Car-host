import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

storiesOf('MonoText', module)
  .addDecorator((getStory) => <View>{getStory()}</View>)
  .add('with text', () => (
    <Text>
        Hello Worlds
    </Text>
  ))
  .add('with some emoji', () => (
    <Text>
        This is a storybook test 👉
    </Text>
  ));
