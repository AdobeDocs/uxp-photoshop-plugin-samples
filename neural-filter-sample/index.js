const batchPlay = require("photoshop").action.batchPlay;

// Register listeners for all events just for dev
require("photoshop").app.eventNotifier = (event, descriptor) => {
  console.log(event, JSON.stringify(descriptor, null, ' '));
}

const openNeuralFilters = async () => {
  const result = await batchPlay(
    [
      {
        _obj: "invokeCommand",
        commandID: 8820,
        kcanDispatchWhileModal: true,
        _isCommand: false
      },
      {
        _obj: "enterModalWorkspace",
        name: "Neural Filters",
        ID: 8821,
        kcanDispatchWhileModal: true,
        _isCommand: false
      },
      // // Does not seem critical to opening the window/modal
      // {
      //   _obj: "toolModalStateChanged",
      //   level: 1,
      //   state: {
      //     _enum: "state",
      //     _value: "enter"
      //   },
      //   tool: {
      //     _obj: "tool",
      //     ID: "arwT",
      //     title: "Move Tool"
      //   },
      //   selectedTool: {
      //     _obj: "tool",
      //     ID: "arwT",
      //     title: "Move Tool"
      //   },
      //   kind: {
      //     _enum: "kind",
      //     _value: "tool"
      //   },
      //   kcanDispatchWhileModal: true,
      //   _isCommand: false
      // }
    ],{
      synchronousExecution: false,
      modalBehavior: "execute"
    });

  console.log(result);
}

// On button click, try to run BatchPlay
document.getElementById("btnPopulate").addEventListener("click", openNeuralFilters);
