import React, { Component } from "react";
import { Navbar, Tab, Tabs } from "@blueprintjs/core";
import CreateAlibi from './CreateAlibi';
import CheckAlibi from './CheckAlibi';

class App extends Component {
  state = {
    navbarTabId: "Create",
  };

  handleNavbarTabChange = (navbarTabId) => this.setState({ navbarTabId });

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Group>
            <Tabs
              id="navbar"
              large={true}
              onChange={this.handleNavbarTabChange}
              selectedTabId={this.state.navbarTabId}
            >
              <Tab id="Create" title="Create Alibi" />
              <Tab id="Check" title="Check Alibi" />
            </Tabs>
          </Navbar.Group>
        </Navbar>
        {(this.state.navbarTabId == "Create") && <CreateAlibi />}
        {(this.state.navbarTabId == "Check") && <CheckAlibi />}
      </div>
    );
  }
}

export default App;
