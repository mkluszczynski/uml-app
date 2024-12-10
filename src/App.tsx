import { ClassDiagram } from "./components/ClassDiagram";
import { EditorView } from "./components/Editor";
import { ClassDiagram as CDiagram } from "./types/ClassDiagram";
import { useState } from "react";
import { ProjectService } from "./classes/ProjectService";

function App() {
  const projectService = new ProjectService();
  const class1 = projectService.createClass("Person");
  const class2 = projectService.createClass("Car");

  const [classDiagrams, setClassDiagrams] = useState<CDiagram[]>([
    {
      position: { x: 100, y: 100 },
      class: class1,
    },
    {
      position: { x: 300, y: 100 },
      class: class2,
    },
  ]);

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-white">
      <EditorView class={class1} />
      {classDiagrams.map((diagram: CDiagram, index: number) => (
        <ClassDiagram
          key={index}
          class={diagram.class}
          position={diagram.position}
        />
      ))}
    </div>
  );
}

export default App;
