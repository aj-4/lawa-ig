import React from 'react';
import { Input, Menu, Container } from 'semantic-ui-react';
import axios from 'axios';
import Select from 'react-select';
import UploadModal from './UploadModal.jsx';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeMenuItem,
      selectedOption: ''
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.activeMenuItem !== this.state.activeItem) {
      this.setState({activeItem: this.props.activeMenuItem});
    }
  }
  
  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
    this.props.changePage(name);
  }

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    this.props.changeUser(selectedOption.name);
  }

  selectSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { activeItem, selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    return (
      <Container className="navbar-container">
        <Menu className="navbar" secondary>
          <Menu.Menu position='left' className="left-menu">
            <img className="navbar-logo" src="./assets/flame-logo.png"/>
            <div className="logo-bar">|</div><div className="navbar-logo-name" > InstaLawa</div>
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
            <Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}/>
          </Menu.Menu>
        
          <Menu.Menu position='right' className="right-menu">
            <UploadModal loggedInUser={this.props.loggedInUser}></UploadModal>
            <Menu.Item name='logout' active={activeItem === 'logout'} onClick={e => this.props.logOut()} />
          </Menu.Menu>
          <Select
            onSubmit={e => this.selectSubmit(e)}
            className="dynamic-select"
            name="form-field-name"
            placeholder=""
            value={value}
            onChange={e => this.handleChange(e)}
            options={this.props.allUsers}
          />
        </Menu>
      </Container>
    );
  }
}



export default NavBar;