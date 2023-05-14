import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import React, { Component } from "react";

import "./App.css";
// import Login from "./Components/Login"
import EditTask from "./Components/EditTask";
import searchAttendance from "./Components/searchAttendance";
import taskSearch from "./Components/taskSearch";
import ManageAttendancePage from "./Components/ManageAttendancePage";
import MarkAttendancePage from "./Components/MarkAttendancePage";
import TaskAllocationPage from "./Components/TaskAllocationPage";
import TaskManagementPage from "./Components/TaskManagementPage";
import ClientTaskManagement from "./Components/ClientTaskManagement";
 import ClientAttendance from "./Components/ClientAttendance";
 //import Login from "./Components/Login";
 import PageNotFound from "./Components/PageNotFound";

class App extends Component {
	render() {
		return (

			<div>
				<Router>
					<Switch>
						
						{/* <Route pat exact ='/Login' component={Login} /> */}
						
						<Route path='/EditTask/:id' component={EditTask}/>
						<Route  path='/searchAttendance/:pathParam1?' component={searchAttendance}/>
						<Route  path='/taskSearch/:pathParam1?' component={taskSearch}/>
						<Route path='/manageattendancepage' component={ManageAttendancePage}/>
						<Route path='/markattendance' component={MarkAttendancePage}/>
						<Route path='/taskallocationpage' component={TaskAllocationPage}/>
						<Route path='/taskmanagementpage' component={TaskManagementPage}/>
						<Route path='/clienttaskpage' component={ClientTaskManagement}/>
						<Route path='/attendence' component={ClientAttendance}/>
						{/* <Route path='/PageNotFound' component={PageNotFound}/>

						<Redirect from='*' to='/PageNotFound' /> */}
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
