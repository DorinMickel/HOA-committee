import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import communityAccounts from './data/communityAccounts.json'
import Dashboard from './pages/Dashboard';
import MainNavbar from './components/MainNavbar';
import Tenants from './pages/Tenants';
import tenantsAccounts from './data/tenantsAccounts.json'
import Messages from './pages/Messages';
import messages from './data/messages.json'
import Issues from './pages/Issues';
import savedIssues from './data/savedIssues.json'
import Voting from './pages/Voting';
import Moment from 'react-moment';


class App extends React.Component {
  constructor(props){
    super(props);

    let communityData=[];
    if(localStorage.localCommunities){
      communityData = JSON.parse(localStorage.localCommunities)
    }
    else {
      communityData = communityAccounts
    }

    let tenantsData=[];
    if(localStorage.localTenants){
      tenantsData = JSON.parse(localStorage.localTenants)
    }
    else {
      tenantsData = tenantsAccounts
    }

    let messagesData=[];
    if(localStorage.localmesagges){
      messagesData = JSON.parse(localStorage.localmesagges)
    }
    else {
      messagesData = messages
    }

    let issuesData = [];
    if(localStorage.localIssues){
  
      issuesData = JSON.parse(localStorage.localIssues)
    }
    else {
      issuesData = savedIssues
    }

    this.state = {
      allCommunities: communityData,
      allTenants: tenantsData,
      allMessages: messagesData,
      allIssues: issuesData,
      activeUser: {
      userId: 1,
      communityName: "BlaBla",
      name: "Dorin Mickel",
      email: "test@test.com",
      pwd: 123,
      apt: 2,
      isCommitteeMember: true},
    }
  }
  addCommunity = (newCommunity,newMember) => {
    const localCommunitiestring = JSON.stringify(this.state.allCommunities.concat(newCommunity))
    localStorage.localCommunities = localCommunitiestring
    this.setState({
      allCommunities: this.state.allCommunities.concat(newCommunity),
      activeUser: newMember
    })
  }
  addNewTenant = (newTenant) => {
    const localtenants = JSON.stringify(this.state.allTenants.concat(newTenant))
    localStorage.localTenants = localtenants;
    this.setState({
      allTenants: this.state.allTenants.concat(newTenant)
    })
  }

  deleteTenant = (deletedTenant) => {  
    const clearedTenants = this.state.allTenants.filter((item, index) => {
      return (index !== deletedTenant)
    })
    localStorage.localTenants = JSON.stringify(clearedTenants)
    this.setState({
      allTenants: clearedTenants
    })
  }

  removeIssue = (deletedItem) => {
    const clearedItems = this.state.allIssues.filter((item, index) => {
      return (index !== deletedItem)
    })
    localStorage.localIssues = JSON.stringify(clearedItems)
    this.setState({
      allIssues: clearedItems
    })
  }

  removeMessage = (deletedItem) => {
    const clearedItems = this.state.allMessages.filter((item, index) => {
      return (index !== deletedItem)
    })
    localStorage.localmesagges = JSON.stringify(clearedItems)
    this.setState({
      allMessages: clearedItems
    })
  }

  // filterTenants = (filterInputText) => {
  //   const filteredTenantsList = this.state.allTenants.filter(input => {
  //       return (input.name.includes(filterInputText))
  //   })
  //   if(filterInputText != ''){
  //       this.setState({
  //           allTenants: filteredTenantsList
  //       })
  //   } else {
  //       this.setState({
  //           allTenants: JSON.parse(localStorage.localTenants)
  //       })
  //   }
  // }



  createNewMessage = (newMessageObj) => {
    const localmesagges = JSON.stringify(this.state.allMessages.concat(newMessageObj))
    localStorage.localmesagges = localmesagges;
    this.setState({
      allMessages: this.state.allMessages.concat(newMessageObj)
    })
  }

  reportNewIssue = (issueObj) => {
    const localIssuesString = JSON.stringify(this.state.allIssues.concat(issueObj));
    localStorage.localIssues = localIssuesString;
    this.setState({
      allIssues: this.state.allIssues.concat(issueObj)
    })
  }

  addIssueComment = (comments, index) => {
    console.log(comments, index)
    this.state.allIssues[index].comments = comments
    this.setState({
      allIssues: this.state.allIssues
    })
    localStorage.localIssues = JSON.stringify(this.state.allIssues)
    
    console.log(this.state.allIssues)
  }

  addMessageComment = (comments, index) => {
    console.log(comments, index)
    this.state.allMessages[index].comments = comments
    this.setState({
      allMessages: this.state.allMessages
    })
    localStorage.localMessages = JSON.stringify(this.state.allMessages)
    
    console.log(this.state.allMessages)
  }

  logout = () => {
    this.setState({
      activeUser: null
    })
  }

  login = (tenantObj) => {
    this.setState({
      activeUser: tenantObj
    })
  }

  render(){
    return (
      <HashRouter>
        <Route exact path="/">
          <Homepage></Homepage>
        </Route>
        <Route exact path="/signup">
          <Signup 
          addCommunity={this.addCommunity}
          addNewTenant={this.addNewTenant}
          allTenants={this.state.allTenants}
          allCommunities={this.state.allCommunities}
          />
        </Route>
        <Route exact path="/login">
          <Login 
          allTenants={this.state.allTenants}
          login={this.login}
          />
        </Route>
        <Route exact path={["/dashboard", "/tenants", "/messages", "/issues", "/voting"]}>
        <MainNavbar/>
        </Route>
        <Route exact path="/dashboard">
          <Dashboard 
            activeUser={this.state.activeUser}>
              <div className="messages-dashboard">
                <h2 className="d-flex">New Messages <div className="ml-3 mt-2 number-of-items">{this.state.allMessages.length}</div></h2>
                <Messages 
                  allMessages={this.state.allMessages}
                  createNewMessage={this.createNewMessage}/>
              </div>
              <div className="issues-dashboard d-flex flex-fill">
                <div className="flex-fill">
                  <h2 className="d-flex">New Issues <div className="ml-3 mt-2 number-of-items">{this.state.allIssues.length}</div></h2>
                  <Issues 
                    allIssues={this.state.allIssues}/>
                </div>
                <div className="resolved-issues-dashboard flex-fill">
                <h2 className="d-flex">Resolved Issues <div className="ml-3 mt-2 number-of-items">0</div></h2>
                
                  There are no resolved issues to show
                </div>
              </div>
          </Dashboard>
        </Route>
        <Route exact path="/tenants">
          <Tenants 
          allTenants={this.state.allTenants}
          addNewTenant={this.addNewTenant}
          deleteTenant={this.deleteTenant}
          // filterTenants={this.filterTenants}
          /> 
        </Route>
        <Route exact path="/messages">
          <Messages
          allMessages={this.state.allMessages}
          activeUser={this.state.activeUser}
          createNewItem={this.createNewMessage}
          removeMessage={this.removeMessage}
          addMessageComment={this.addMessageComment}
          />
        </Route>
        <Route exact path="/issues">
          <Issues 
          allIssues={this.state.allIssues}
          activeUser={this.state.activeUser}
          createNewItem={this.reportNewIssue}
          removeIssue={this.removeIssue}
          addIssueComment={this.addIssueComment}
          />
        </Route>
        <Route exact path="/voting">
          <Voting/>
        </Route>
        
      </HashRouter>
    );
  }
}

export default App;
