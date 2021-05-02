import React, { useEffect, useRef } from "react";
import ContentEditable from "react-contenteditable";

export const Card: React.FC = ({ remove, index, idea, edit }) => {
    const text = useRef(idea);
    const me = React.createRef();

    const handleChange = (evt) => {
        const newIdea = evt.target.value;
        text.current = newIdea;
        edit(index, newIdea);
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
                onClick={() => remove(index)}
            >
                delete
            </button>
        </div>
    );
};
