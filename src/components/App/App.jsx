import React, { Component } from 'react';
import { ContactsForm } from '../ContactsForm/ContactsForm';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactsList/ContactsList';
import { AppWrapper,Title, SearchWrapper, StyledTitles, CloseBtn, OpenPhonebook } from './app.styled';


export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    isOpen: false,
    };
  
  addContact = (newContact) => {
    if (this.state.contacts.find(contact => contact.name === newContact.name)) {
      return alert(`${newContact.name} is already in contacts`);
    }
      
    if (this.state.contacts.find(contact => contact.number === newContact.number)) {
      return alert(`${newContact.number} is already in contacts`);
    }

    this.setState(prevState => ({
      contacts: [ ...prevState.contacts, newContact]
    }));
  };



  getContact = evt => {
    const searchQuerry = evt.currentTarget.value;
    this.setState({filter: searchQuerry})
  }
  
  removeContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  showPhonebook = () => {
    this.setState({ isOpen: true });
  };

    hidePhonebook = () => {
    this.setState({ isOpen: false });
  };
  
  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLocaleLowerCase()));
    return (
      <>
        {!this.state.isOpen && <OpenPhonebook onClick={this.showPhonebook} className="phoneBook">Open Phonebook</OpenPhonebook>}
        {this.state.isOpen &&
          <AppWrapper>
            <CloseBtn onClick={this.hidePhonebook}/>
            <ContactsForm onAdd={ this.addContact } />
            <SearchWrapper>
              <StyledTitles>
                <Title>Contacts</Title>
                <p>Find contacts by name</p>
              </StyledTitles>
              <Filter filter={ filter } getContact={this.getContact}  />
              <ContactList filteredContacts={filteredContacts} removeContact={ this.removeContact} />
            </SearchWrapper>
        </AppWrapper>
        }
          
        </>
    )
  }
};
