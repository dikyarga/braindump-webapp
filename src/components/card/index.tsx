import React, { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";
import Image from "next/image";

import { Button } from "@components";

export const Card: React.FC = ({ remove, idea, edit }) => {
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
        const newBody = evt.target.value;
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
        <div className="group bg-blue-200 focus-within:ring-2 focus-within:ring-purple-600 p-4 ">
            <ContentEditable
                innerRef={titleRef}
                className="border border-bottom-gray-500 bg-white p-2 text-2xl"
                html={title.current}
                onBlur={handleBlur}
                onChange={handleTitleChange}
            />
            <ContentEditable
                innerRef={bodyRef}
                className="bg-white p-2 text-base"
                html={body.current}
                onBlur={handleBlur}
                onChange={handleBodyChange}
            />
            <Button
                type="button"
                className="opacity-0 group-hover:opacity-100 mt-4"
                onClick={() => remove(idea.id)}
            >
                <Image
                    src="/icons/trash.svg"
                    alt="Picture of the author"
                    width={20}
                    height={20}
                />
                Remove
            </Button>
        </div>
    );
};
