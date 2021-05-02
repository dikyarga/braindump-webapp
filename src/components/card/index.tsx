import React, { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";

export const Card: React.FC = ({ remove, idea, edit }) => {
    const text = useRef(idea.title);
    const me = React.createRef();

    const handleChange = (evt) => {
        const title = evt.target.value;
        console.log({ title });
        text.current = title;
        edit(Object.assign({}, idea, { title: title }));
    };

    const handleBlur = () => {
        console.log(text.current);
    };
    useEffect(() => {
        // code to run on component mount
        console.log({ text });
        me.current.focus();
    }, []);
    return (
        <div className="group">
            <ContentEditable
                innerRef={me}
                className="border border-gray-500 bg-white p-10 text-xl"
                html={text.current}
                onBlur={handleBlur}
                onChange={handleChange}
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
