import React, { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";

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
        console.log(title.current);
    };
    useEffect(() => {
        // code to run on component mount
        titleRef.current.focus();
    }, []);
    return (
        <div className="group">
            <ContentEditable
                innerRef={titleRef}
                className="border border-gray-500 bg-white p-10 text-xl"
                html={title.current}
                onBlur={handleBlur}
                onChange={handleTitleChange}
            />
            <ContentEditable
                innerRef={bodyRef}
                className="border border-gray-500 bg-white p-10 text-xl"
                html={body.current}
                onBlur={handleBlur}
                onChange={handleBodyChange}
            />
            <button
                className="opacity-0 group-hover:opacity-100"
                onClick={() => remove(idea.id)}
            >
                delete
            </button>
        </div>
    );
};
