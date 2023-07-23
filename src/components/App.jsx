import { Component } from "react";
import { Section } from "./Section/Section";
import { Filter } from "./Filter/Filter";
import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";



export class App extends Component {
  state = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: ''
}
  addContact = (name, number) => {
  const newContact = {
    id: nanoid(),
    name,
    number,
  };
  
  if (this.findContact(name)) {
    return alert(`${name} is already in contacts`);
  }
  
  this.setState((prevState) => ({
    contacts: [...prevState.contacts, newContact],
  }));
};


   
  handleChange = (e) => {

     const { name, value } = e.target;
     this.setState({ [name]: value });
  };

  handleSubmit = (e)  => {
    e.preventDefault();
    const { name, number } = this.state;
    const newContact = {
            name:name,
            id: nanoid(),
            number:number,
        }
    this.setState((prev) => ({
      contacts: [newContact, ...prev.contacts],
      name: '',
      number: ''
		}))
  }
 
  filterChange = (e) => {
  this.setState({ filter: e.target.value });
};

  filterContacts = () => this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()))

  findContact = name => this.state.contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())

  onDelete = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };
  
  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContacts();
    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>
         <Section title="Contacts">
        <Filter
          filter={filter}
          handleChange={this.filterChange}
          />
          <ContactList contacts={filteredContacts} onDelete={this.onDelete} />
      </Section>
    </>
  );  
  }
};