import React, {Component} from 'react';
import PieChartEmotion from './PieChartEmotion';
import PieChartPolarity from './PieChartPolarity';
import BarGraph from './BarGraph';
import LineGraph from './LineGraph';
import EntryListing from '../EntryListing';
import { Carousel } from 'react-bootstrap';

export default function GraphCarousel({entries, handleClick}) {

    return(
        <Carousel>
            {
                entries.slice(0).reverse().map( entry => (
                    <Carousel.Item key={entry.id}>
                        <div id='pieBox1' className="col-xs-12 col-md-6 col-centered">
                            <EntryListing entry={entry} handleClick={handleClick}/>
                        </div>
                        <div className="row top-margin">
                            <Carousel.Caption>
                                <h3>{entry.title}</h3>
                                <p>{entry.content.split(' ').slice(0,10).join(' ') + '. . .'}</p>
                            </Carousel.Caption>
                        </div>
                    </Carousel.Item>
                    )
                )
            }
        </Carousel>
    );
};
