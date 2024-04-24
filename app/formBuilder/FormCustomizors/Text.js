import React, { useState, useRef, useEffect } from 'react';

export default function TextCustomizer({ element, index, changeName }) {

    const [question, setquestion] = useState(element.question);

    const changeQuestion = function () {
        changeName(index, question);
    };
    useEffect(()=>{
      setquestion(element.question);
    }, [element])

    return (
        <div>
            <div>
                <input type="text" value={question} onChange={(e)=>{setquestion(e.target.value)}}/>
                <button onClick={changeQuestion}>change</button>
            </div>
        </div>
    );
}
