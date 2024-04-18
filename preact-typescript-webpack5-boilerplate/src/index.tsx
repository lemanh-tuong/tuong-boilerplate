import { FunctionComponent, h, render } from 'preact';

const App: FunctionComponent = () => {
  return (
    <div className="App">
      <h1>Preact + Typescript + Webpack 5</h1>
    </div>
  );
};

render(<App />, document.body);
