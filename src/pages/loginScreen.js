import { Typography } from '@material-ui/core';
import '../App.css';
import LoginView from '../components/addTaskOrLogin';
export default function Login() {
    return (
        <div className="App">
            <Typography variant="h6">LOGIN</Typography>
            <br />
            <LoginView loginView={true} />
        </div>
    )
}