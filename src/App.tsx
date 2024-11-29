import { ClassDiagram } from "./components/ClassDiagram";
import { Editor } from "./components/Editor";
import { Class } from "./types/Class";
import { ClassDiagram as CDiagram } from "./types/ClassDiagram";
import { Field } from "./types/Field";
import { Method } from "./types/Method";

function App() {
  const classes: Class[] = [
    new Class(
      "Person",
      [
        new Field("public", "name", "string"),
        new Field("private", "age", "number"),
      ],
      [
        new Method("public", "setName", "void", [
          { name: "name", type: "string" },
        ]),
        new Method("private", "getName", "string", []),
      ],
      false
    ),
    new Class(
      "Student",
      [
        new Field("public", "studentId", "string"),
        new Field("private", "gpa", "number"),
      ],
      [
        new Method("public", "setStudentId", "void", [
          { name: "studentId", type: "string" },
        ]),
        new Method("private", "getStudentId", "string", []),
      ],
      false
    ),
  ];

  const classDiagrams: CDiagram[] = [
    {
      position: { x: 100, y: 100 },
      class: classes[0],
    },
    {
      position: { x: 300, y: 100 },
      class: classes[1],
    },
  ];

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-white">
      <Editor class={classes[0]} />
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
