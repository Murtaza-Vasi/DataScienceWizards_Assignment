import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
	return (
		<>
			<Router>
				<Header />
				<Switch>
					<Route path='/' exact component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
				</Switch>
			</Router>
		</>
	);
}

export default App;
