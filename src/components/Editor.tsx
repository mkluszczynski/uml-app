import { Draggable } from "@lib/Draggable";
import { Class } from "src/classes/Class";
import { Separator } from "./Separator";

export type EditorProps = {
  class: Class;
};

export function EditorView(props: EditorProps) {
  return (
    <Draggable>
      <div className="flex flex-col bg-gray-800 ">
        <div className="text-white p-2">{props.class.getName()} Editor</div>
        <Separator />
        <textarea
          className="w-full h-full p-2 bg-gray-400 focus:outline-none text-black"
          rows={10}
          cols={30}
          placeholder="Write your code here..."
          defaultValue={props.class.getCode()}
          onChange={(e) => {
            props.class.updateFromCode(e.target.value);
          }}
        />
      </div>
    </Draggable>
  );
}
