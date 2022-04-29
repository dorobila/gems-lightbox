// import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ModalImage from '../.';

const App = () => {
  return (
    <div>
      <ModalImage
        small={'https://picsum.photos/200'}
        medium={'https://picsum.photos/600'}
        large={'https://picsum.photos/800'}
        alt="Hello World!"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
