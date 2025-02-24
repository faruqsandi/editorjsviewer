import React, { useState, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';

const App = () => {
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!editor) {
      const initializedEditor = new EditorJS({
        holder: 'editor',
        // Your Editor.js configurations/tools go here
        // For example:
        tools: {},
      });

      setEditor(initializedEditor);
    }

    return () => {
      if (editor) {
        editor.isReady.then(() => {
          editor.destroy();
        });
      }
    };
  }, [editor]);

  const handleFileUpload = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);
        // Here, you can use the parsed content as needed
        console.log('Parsed JSON content:', content);
        // You might want to integrate this content into Editor.js
        // For instance:
        if (editor) {
          editor.isReady.then(() => {
            editor.render(content);
          });
        }
      } catch (error) {
        console.error('Invalid JSON file', error);
      }
    };
    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <div className="App">
      <input type="file" onChange={handleFileUpload} />
      <div id="editor"></div>
    </div>
  );
};

export default App;
