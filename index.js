import { program } from "commander";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    let result;

    switch (action) {
      case "list":
        result = await listContacts();
        console.table(result);
        return;

      case "get":
        result = await getContactById(id);
        break;

      case "add":
        result = await addContact(name, email, phone);
        break;

      case "remove":
        result = await removeContact(id);
        break;

      default:
        console.error("Unknown action type");
        process.exitCode = 1;
        return;
    }

    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

invokeAction(options);
