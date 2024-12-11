import { ClassDiagram } from "./components/ClassDiagram";
import { EditorView } from "./components/Editor";
import { ClassDiagram as CDiagram } from "./types/ClassDiagram";
import { useState } from "react";
import { ProjectService } from "./classes/ProjectService";

function App() {
  const projectService = new ProjectService();
  const personClass = projectService.createClass("Person");
  const petClass = projectService.createClass("Pet");

  personClass.updateFromCode("class Person {\n  name: string;\n}");
  petClass.updateFromCode("class Pet {\n  name: string;\n  owner: Person;\n}");

  const [classDiagrams, setClassDiagrams] = useState<CDiagram[]>([
    {
      position: { x: 100, y: 100 },
      class: personClass,
    },
    {
      position: { x: 300, y: 100 },
      class: petClass,
    },
  ]);

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-white">
      {/* <EditorView class={class1} /> */}

      {classDiagrams.map((diagram: CDiagram, index: number) => (
        <>
          <ClassDiagram
            key={index}
            class={diagram.class}
            position={diagram.position}
          />
          <EditorView key={`editor-${index}`} class={diagram.class} />
        </>
      ))}
    </div>
  );
}

export default App;
