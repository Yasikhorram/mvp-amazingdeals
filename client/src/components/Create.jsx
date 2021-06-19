import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Create = () => {

    const [readyToRender, setReadyToRender] = useState(true);

    let returnRender = readyToRender ? (<div></div>
    ) : (<div></div>);

    return returnRender
}

export default Create;
