const { Command } = require("commander");
const contacts = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.log(allContacts);
      break;

    case "get":
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);
      break;

    case "add":
      const addedContact = await contacts.addContact(name, email, phone);
      return console.log(addedContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
