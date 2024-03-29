import React, { memo } from "react";
interface textareaProps {
  className: string;
  name: string;
  id: string;
  cols: number;
  rows: number;
  value: any;
  onChange: any;
}

function Textarea(props: textareaProps) {
  return (
    <div
      className={`dark:bg-[#232323] bg-[#E0E5EC]  rounded-xl w-full h-[4.4rem]
    shadow-[inset_9px_9px_18px_#5a5c5e,inset_-9px_-9px_18px_#ffffff]
    dark:shadow-[inset_9px_9px_18px_#0e0e0e,inset_-9px_-9px_18px_#383838]  ${props.className}`}
    >
      <textarea
        id={props.id}
        name={props.name}
        className={`rounded-xl w-full h-full py-4 p-3 bg-transparent`}
        cols={props.cols}
        rows={props.rows}
        value={props.value}
        onChange={props.onChange}
      ></textarea>
    </div>
  );
}

export default memo(Textarea);
