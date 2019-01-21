abstract class Command {
  protected backup: string;

  constructor(protected app: Application, protected editor: Editor) {
  }

  saveBackup() {
    this.backup = this.editor.text;
  }

  undo() {
    this.editor.text = this.backup;
  }

  abstract execute(): boolean;
}

class CutCommand extends Command {
  execute(): boolean {
    this.saveBackup();
    this.app.clipboard = this.editor.getSelection();
    this.editor.deleteSelection();

    return true;
  }
}

class PasteCommand extends Command {
  execute(): boolean {
    this.saveBackup();
    this.editor.replaceSelection(this.app.clipboard);
    return true;
  }
}

class UndoCommand extends Command {
  execute(): boolean {
    this.app.undoCommand();
    return false;
  }
}

class CommandHistory {
  private history: Command[] = [];

  push(command: Command) {
    this.history.push(command);
  }

  pop(): Command {
    return this.history.pop();
  }
}


class Editor {
  position: number = null;
  private selection: string = null;

  constructor(public text: string) {
  }

  selectText(text: string) {
    console.log(`Selected text: ${this.selection}`);
    this.selection = text;
  }

  getSelection() {
    return this.selection;
  }


  deleteSelection() {
    console.log(`Deleted selection: ${this.selection}`);
    this.text = this.text.replace(new RegExp(this.selection), '');
    this.selection = null;
  }

  replaceSelection(text: string) {
    console.log(`Replaced in editor: ${text}`);

    this.text = this.text.substr(0, this.position) + text + this.text.substr(this.position);
  }
}

interface UserInterface {
  cut?: () => void;
  paste?: () => void;
  undo?: () => void
}


class Application {
  clipboard: string;
  editor: Editor;
  history: CommandHistory;

  UI: UserInterface = {};

  constructor() {
    this.editor = new Editor('Test coverage is an important indicator for the overall health of your project.');
    this.history = new CommandHistory();
  }

  buildUI() {
    this.UI.cut = () => this.executeCommand(new CutCommand(this, this.editor));
    this.UI.paste = () => this.executeCommand(new PasteCommand(this, this.editor));
    this.UI.undo = () => this.executeCommand(new UndoCommand(this, this.editor));
  }

  executeCommand(command: Command): void {
    if (command.execute()) {
      this.history.push(command);
    }
  }

  undoCommand() {
    const command = this.history.pop();

    if (command) {
      command.undo();
    }
  }
}

const app = new Application();
app.buildUI();

console.log(app.editor.text);
app.editor.selectText('is an important ');
app.UI.cut();

console.log(app.editor);
console.log(app.clipboard);

app.editor.position = 20;
app.UI.paste();

console.log(app.editor);
console.log(app.clipboard);

app.UI.undo();
app.UI.undo();


console.log(app.editor);
console.log(app.clipboard);
