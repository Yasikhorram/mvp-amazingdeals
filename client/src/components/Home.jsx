import React, { useEffect, useState } from 'react';
import axios from 'axios';
import homeImage from '../../../files/homeMain.jpeg';
import homeImageHover from '../../../files/homeHover.jpeg';

const Home = (props) => {

    const [readyToRender, setReadyToRender] = useState(true);
    const [image, setImage] = useState(homeImage)

    let returnRender = readyToRender ? (

    <div>
      <div class="divCenter">
        <img
          src={image}
          onMouseOver={() => { setImage(homeImageHover) }}
          onMouseOut={() => { setImage(homeImage) }}
          onClick={ () => { props.triggerRegistration() }
        }>
        </img>
      </div>
    </div>
    ) : (<div></div>);

    return returnRender
}

export default Home;
