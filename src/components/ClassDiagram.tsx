import { Separator } from "./Separator";

export type ClassDiagramProps = {} & React.ComponentProps<"div">;

export function ClassDiagram(props: ClassDiagramProps) {
  return (
    <div {...props} className="flex flex-col border border-black">
      <div className="p-1 bg-blue-400">Class name</div>
      <div>
        <div className="p-1">
          <p>+ public field: string</p>
          <p>- private field: string</p>
          <p># protected field: string </p>
        </div>
        <Separator />
        <div className="p-1">
          <p>+ public method(): void</p>
          <p>- private method(): void</p>
          <p># protected method(): void</p>
        </div>
      </div>
    </div>
  );
}
