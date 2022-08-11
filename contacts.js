const fs = require('fs').promises;
const path = require('path')


const contactsPath = (path.join(__dirname, "db", "contacts.json"))

const readContacts = async () => { 
  try {
    const result = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
return result
    
  } catch (err) {
    return console.error(err.message, "readContacts");
  }
}

const listContacts = async () =>{
  try{
    const list = await readContacts();
  return console.table(list)

  } catch (err){
    return console.error(err.message, "listContacts");
  }
};

const getContactById = async (contactId) => {
  try{
    const list = await readContacts()
  const findeContactId = list.filter(contact => contact.id === contactId)
  return console.table(findeContactId)

  } catch (err){
    return console.error(err.message, "getContactById");
  }
}

const removeContact = async (contactId) => {
  try{
    const list = await readContacts()
  const findeContactId = list.filter(contact => contact.id !== contactId);
  await fs.writeFile(path.join(__dirname, 'db', 'contacts.json'), JSON.stringify(list, null, 2))
  return console.table(findeContactId)

  }catch (err){
    return console.error(err.message, "removeContact");
  }
}



const addContact = async (id, name, email, phone) => {
  try { 
    const list = await readContacts()
    const newContact = {name, email, phone, id } 
    list.push(newContact)
    await fs.writeFile(path.join(__dirname, 'db', 'contacts.json'), JSON.stringify(list, null, 2))
    return console.table(list);
  } catch (err) {
    return console.error(err.message, "addContact");
  }
}

module.exports = {listContacts, getContactById, removeContact, addContact}