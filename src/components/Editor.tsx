import { Draggable } from "@lib/Draggable";
import { Class } from "src/types/Class";
import { Separator } from "./Separator";

export type EditorProps = {
  class: Class;
};

export function Editor(props: EditorProps) {
  return (
    <Draggable>
      <div className="flex flex-col bg-gray-800 ">
        <div className="text-white p-2">Class Editor</div>
        <Separator />
        <textarea
          className="w-full h-full p-2 bg-gray-400 focus:outline-none text-black"
          rows={10}
          cols={30}
          placeholder="Write your code here..."
        >
          {props.class.toCode()}
        </textarea>
      </div>
    </Draggable>
  );
}
