import React, { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import Image from "next/image";

import { Button } from "@components";
import { Idea } from "src/types";

export const Card: React.FC<{
  idea: Idea;
  remove: (_: number) => void;
  edit: (_: Idea) => void;
}> = ({ remove, idea, edit }) => {
  const title = useRef(idea.title);
  const body = useRef(idea.body);
  const titleRef = React.createRef();
  const bodyRef = React.createRef();

  const handleTitleChange = (evt) => {
    const newTitle = evt.target.value;
    title.current = newTitle;
    edit(Object.assign({}, idea, { title: newTitle }));
  };
  const handleBodyChange = (evt) => {
    const newBody = evt.target.value.replace("<br>", "&nbsp;");
    body.current = newBody;
    edit(Object.assign({}, idea, { body: newBody }));
  };

  const handleBlur = () => {
    // edit(Object.assign({}, idea));
  };
  useEffect(() => {
    // code to run on component mount
    titleRef.current.focus();
  }, []);
  return (
    <div className="group">
      <div className="bg-green-200 rounded focus-within:ring-4 focus-within:ring-gray-500 p-4">
        <ContentEditable
          innerRef={titleRef}
          className="border border-bottom-gray-500 bg-white p-1 m-1 text-2xl"
          html={title.current}
          onBlur={handleBlur}
          onChange={handleTitleChange}
        />
        <ContentEditable
          innerRef={bodyRef}
          className="bg-white p-1 m-1 text-base"
          html={body.current}
          onBlur={handleBlur}
          onChange={handleBodyChange}
        />
      </div>
      <Button
        type="button"
        variant="danger"
        className="opacity-0 group-hover:opacity-100 mt-4"
        onClick={() => remove(idea.id)}
      >
        <Image
          src="/icons/trash-2.svg"
          alt="Picture of the author"
          width={16}
          height={16}
        />
        <span className="ml-2">Remove</span>
      </Button>
    </div>
  );
};
