import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import cardImage from '../../../files/deal.png';
import Deal from '../../../files/logo.png';
import { Star, StarFill} from 'react-bootstrap-icons';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const Deals = () => {

    const [readyToRender, setReadyToRender] = useState(false);

    const [products, setProducts] = useState([]);
    const [radioValue, setRadioValue] = useState('1');
    const [randomChoice, setRandomChoice] = useState([]);
    const [likeTrigger, setLikeTrigger] = useState(false);

    const [radios, setRadios] = useState([

        { name: 'Electronics', value: '1' },
        { name: 'TVs Entertainment', value: '2' },
        { name: 'Video & Home Audio', value: '3' },
        { name: 'Computers & Tablets', value: '4' },
      ]);

    const addStarCount = (asin) => {

        axios({ method: 'post', url: '/like', data: { asin: asin }})
        .then(() => setReadyToRender(false))
        .then(() => setLikeTrigger(!likeTrigger))
    }

    const triggerRadioChange = (e) => {

        setRadioValue(e.currentTarget.value)
    }

    const popover = (name, merchant, brand, url, asin) => {

        return(
            <div class="divPopover">

                <Popover>
                    <Popover.Title as="h3">{name}</Popover.Title>
                    <Popover.Content>
                        <span>Merchant: {merchant}</span><br></br>
                        <span>Brand: {brand}</span><br></br>
                        <span>ASIN: {asin}</span><br></br><br></br>
                        <Button variant="success" href={url} target="_blank">Get the Deal!</Button>
                    </Popover.Content>
                </Popover>
            </div>
      )};

    const ProductDetails = (val) => (
        <OverlayTrigger trigger="click" placement="right" overlay={popover(val.name, val.merchant, val.brand, val.url, val.asin)}>
            <Button variant="success">See more details</Button>
        </OverlayTrigger>
    );

    const getCard = (name, url, imageURL, brand, asin, category, merchant, votes, price, newPrice) => {

        return (
            <div class='cardDiv'>
                <Card style={{ width: '250px', height: '425px' }}>
                    <div class='divImage'><img class='productImage' src={imageURL} /></div>
                    <Card.Body>
                        <div className="cardText">
                        <Card.Title>{name}</Card.Title>
                        </div>

                        <Card.Text><span class='newPrice'>${newPrice}</span>{' '}<span class='oldPrice'>${price}</span></Card.Text>
                        <br></br>
                        <h4><span class='votes'>{votes}</span>{' '}
                        <div className="upload-icon">
                            <StarFill className="fa-icon" onClick={() => { addStarCount(asin) }}/>
                        </div>
                        </h4>
                    </Card.Body>
                    <ProductDetails name={name} brand={brand} merchant={merchant} url={url} asin={asin}/>
                </Card><br></br><br></br>
            </div>
        )
    }

    useEffect(() => {


        axios({ method: 'get', url: '/products'})
        .then((res) => {

            if (products.length !== 0) { setProducts([]) }

            res.data.map((item) => {

                if (!item.votes) { var vote = 0 } else { var vote = item.votes }

                    if (item.category.match(radios[Number(radioValue) - 1].name)) {

                        setProducts((products) => [...products,

                            getCard(
                                item.name.substring(0, 50).replace('Details About', ''),
                                item.url,
                                item.imageURL,
                                item.brand,
                                item.asin,
                                item.category,
                                item.merchant,
                                vote,
                                item.price,
                                item.newPrice
                            )
                        ])
                    }
            })
        })
        .then(() => {

            for (var a=[],i=0;i<20;++i) a[i]=i;

            function shuffle(array) {

                var tmp, current, top = array.length;

                if(top) while(--top) {

                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }

                return array;
            }

            setRandomChoice(shuffle(a));
        })
        .then(() => setReadyToRender(true))

    }, [radioValue, likeTrigger])

    let returnRender = readyToRender ? (

      <div>
        <img class='logoImage' src={Deal}></img>
        <div class='divDeals'>

        <ButtonGroup toggle>
        {
        radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            type="radio"
            variant="info"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => triggerRadioChange(e) }
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup><br></br><br></br>

            <Carousel>
                <Carousel.Item>
                    {products[5]}
                    {products[3]}
                    {products[9]}
                </Carousel.Item>{'   '}
                <Carousel.Item>
                    {products[10]}
                    {products[12]}
                    {products[11]}
                </Carousel.Item>{'   '}
                <Carousel.Item>
                    {products[6]}
                    {products[7]}
                    {products[8]}
                </Carousel.Item>{'   '}
            </Carousel>
        </div>
    </div>

    ) : (<div></div>);

    return returnRender
}

export default Deals;
