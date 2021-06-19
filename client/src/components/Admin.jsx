import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {

    const [readyToRender, setReadyToRender] = useState(true);

    let returnRender = readyToRender ? (<div></div>
    ) : (<div>Loading...</div>);

    return returnRender
}

export default Admin;
