import { ClassDiagram } from "./components/ClassDiagram";
import { Class } from "./types/Class";
import { ClassDiagram as CDiagram } from "./types/ClassDiagram";

function App() {
  const classes: Class[] = [
    {
      name: "Person",
      isAbstract: false,
      fields: [
        { visibility: "+", name: "name", type: "string" },
        { visibility: "-", name: "age", type: "number" },
        { visibility: "#", name: "address", type: "string" },
      ],
      methods: [
        {
          visibility: "+",
          name: "sayHello",
          returnType: "void",
          parameters: [],
        },
      ],
    },
    {
      name: "Student",
      isAbstract: false,
      fields: [
        { visibility: "+", name: "studentId", type: "string" },
        { visibility: "#", name: "gpa", type: "number" },
      ],
      methods: [
        {
          visibility: "+",
          name: "study",
          returnType: "void",
          parameters: [],
        },
        {
          visibility: "-",
          name: "party",
          returnType: "void",
          parameters: [],
        },
      ],
    },
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
