import { ClassDiagram } from "./components/ClassDiagram/ClassDiagram";
import { EditorView } from "./components/Editor";
import { ClassDiagram as CDiagram } from "./types/Diagram";
import { InterfaceDiagram as IDiagram } from "./types/Diagram";
import { useState } from "react";
import { ProjectService } from "./classes/ProjectService";
import { InterfaceDiagram } from "./components/InterfaceDiagram/InterfaceDiagram";

function App() {
  const projectService = new ProjectService();
  const personClass = projectService.createClass("Person");
  const petClass = projectService.createClass("Pet");

  personClass.updateFromCode("class Person {\n  name: string;\n}");
  petClass.updateFromCode(
    "class Pet {\n  name: string;\n  owner: Person;\n getOwner(name: Test, ata: Person, address: string): Person {}\n}"
  );

  const manInterface = projectService.createInterface("Man");
  manInterface.updateFromCode("interface Man {\n  name: string;\n}");

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

  const [interfaceDiagrams, setInterfaceDiagrams] = useState<IDiagram[]>([
    {
      position: { x: 500, y: 200 },
      interface: manInterface,
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
          <EditorView
            key={`editor-class-${index}`}
            diagramSubject={diagram.class}
          />
        </>
      ))}

      {interfaceDiagrams.map((diagram: IDiagram, index: number) => (
        <>
          <InterfaceDiagram
            key={index}
            interface={diagram.interface}
            position={diagram.position}
          />
          <EditorView
            key={`editor-interface-${index}-`}
            diagramSubject={diagram.interface}
          />
        </>
      ))}
    </div>
  );
}

export default App;
