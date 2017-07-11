import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/app';
import { Container } from 'flux/utils';

const MyApp = Container.create(App);
ReactDOM.render((<MyApp />), document.getElementById('app'));;

