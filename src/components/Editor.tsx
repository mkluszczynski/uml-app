import { Draggable } from "@lib/components/Draggable";
import { Separator } from "./Separator";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { useRef } from "react";
import { DiagramSubject } from "@src/classes/abstract/DiagramSubject";

export type EditorProps = {
  diagramSubject: DiagramSubject<unknown>;
};

export function EditorView(props: EditorProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <Draggable headerref={headerRef}>
      <div className="flex flex-col bg-gray-800 min-w-[200px]">
        <div className="text-white p-2" ref={headerRef}>
          {props.diagramSubject.getName()} Editor
        </div>
        <Separator />
        <CodeEditor
          value={props.diagramSubject.getCode()}
          language="js"
          placeholder="Please enter JS code."
          onChange={(e) => props.diagramSubject.updateFromCode(e.target.value)}
          padding={15}
          style={{
            fontFamily:
              "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
          }}
        />
      </div>
    </Draggable>
  );
}
