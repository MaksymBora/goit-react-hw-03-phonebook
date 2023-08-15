import { FiUserX } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { ContactItem, RemoveButton } from './ContactsList.styled';

export const ContactList = ({ filteredContacts, removeContact }) => {
  return (
    <ul>
      {filteredContacts.map(contact => {
        return (
          <ContactItem key={contact.id}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <RemoveButton onClick={() => removeContact(contact.id)}>
              <FiUserX size={21} />
            </RemoveButton>
          </ContactItem>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeContact: PropTypes.func.isRequired,
};
