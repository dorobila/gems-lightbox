import React from 'react';
import { createRoot } from 'react-dom/client';
import { ModalImageStory as ModalImage } from '../stories/ModalImage.stories';

describe('ModalImage', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    div.setAttribute('id', 'app');
    document.body.appendChild(div);

    const container = document.getElementById('app');
    const root = createRoot(container!);

    root.render(
      <ModalImage
        small={'https://picsum.photos/200'}
        medium={'https://picsum.photos/600'}
        large={'https://picsum.photos/800'}
        alt="Hello World!"
      />
    );

    root.unmount();
  });
});
