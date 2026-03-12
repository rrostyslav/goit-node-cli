import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId) ?? null;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId) ?? null;

  if (!contact) {
    return null;
  }

  const updatedContacts = contacts.filter(item => item.id !== contactId);
  await writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return contact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

export { addContact, getContactById, listContacts, removeContact };
