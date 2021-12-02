// These are the modules that contain Photoshop APIs, provided by app itself.
// Photoshop DOM
const app = require("photoshop").app;
// action.addNotificationListener
const action = require("photoshop").action;
// core.executeAsModal
const core = require("photoshop").core;

// This module provides UXP APIs, such as storage and shell.
const UXP = require("uxp");

// We will use this array as our state.
let open_documents = [];

// Listen to known events that would change list of active documents
action.addNotificationListener(["open", "newDocument", "close", "duplicate", "select"], (event, descriptor) => {
    // These events may refer to other elements as well, however, all of them will
    // contain a documentID field indicating the target was a document
    if (!descriptor.documentID) {
        return;
    }

    // Rather than reacting to the event descriptor, we will cause a state reset
    // so code is simpler, and shows DOM usage
    resetOpenDocuments();
});

// This is where we do all communication with Photoshop
function resetOpenDocuments() {
    // Reset state
    open_documents = [];

    // We can use Array methods on app.documents
    app.documents.forEach((doc) => {
        // Grab the properties we need, for each document
        open_documents.push({
            id: doc.id,
            name: doc.name
        });
    })

    updateUI();
}

function updateUI() {
    // Grab the div that will show the open document list
    const documentDiv = document.getElementById("opendoclist");

    // Clear the current UI
    documentDiv.innerHTML = "";

    // Prepare the list element
    const activeDocumentId = app.activeDocument.id;
    
    const documentList = document.createElement('sp-radio-group');
    documentList.setAttribute('selected', activeDocumentId);
    documentList.setAttribute('name', 'documents');
    documentList.setAttribute('column', '');
    
    // Using the global state, add UI for each document
    open_documents.forEach((doc) => {
        const docRadio = document.createElement('sp-radio');
        docRadio.innerText = doc.name;
        docRadio.setAttribute('value', doc.id);
        
        if (doc.id === activeDocumentId) {
            docRadio.setAttribute('checked', '');
        }

        documentList.appendChild(docRadio);
    });

    // Add a listener for the radio boxes
    documentList.addEventListener("change", async (evt) => {
        const docId = evt.target.value;

        // Using Array.find method, find the Document object to switch
        const selectedDocument = app.documents.find(doc => doc.id === docId);

        // Any changes we make to the app state need to be done in a modal state.
        await core.executeAsModal(() => {
            // app.activeDocument is a property accessor, providing a getter and a setter
            // All property accessors in Photoshop are synchronous.
            app.activeDocument = selectedDocument;
        }, {
            commandName: "Change Document"
        });
    })
    // Add the list to the HTML DOM
    documentDiv.appendChild(documentList);
}

document.getElementById('addLayer').addEventListener('click', async () => {
    await core.executeAsModal(() => {
        // Add a layer to the currently active document
        app.activeDocument.layers.add();
    })
})
// Load initial state
resetOpenDocuments();
