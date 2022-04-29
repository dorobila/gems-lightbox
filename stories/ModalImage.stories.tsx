import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ModalImage from '../src';

export default {
  title: 'ModalImage',
  component: ModalImage,
} as ComponentMeta<typeof ModalImage>;

const Template: ComponentStory<typeof ModalImage> = (args) => (
  <ModalImage {...args} />
);

export const ModalImageStory = Template.bind({});

ModalImageStory.args = {
  small: 'https://picsum.photos/200',
  medium: 'https://picsum.photos/600',
  large: 'https://picsum.photos/800',
  alt: 'Hello World!',
};
