import React, {Component} from 'react';
import PieChartEmotion from './PieChartEmotion';
import PieChartPolarity from './PieChartPolarity';
import BarGraph from './BarGraph';
import LineGraph from './LineGraph';
import { Carousel } from 'react-bootstrap'

export default function GraphCarousel({sentimentObject, emotionObject, smartObject}) {
    return(
        <Carousel>
            <Carousel.Item>
                <div className='pieBox1' className="col-xs-12 col-md-6 col-centered">
                    <PieChartEmotion emotionObject={emotionObject} />
                </div>
                <div className="row top-margin">
                    <Carousel.Caption>
                        <h3>Emotion Pie Chart</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div id='pieBox1' className="col-xs-12 col-md-6 col-centered">
                    <PieChartPolarity sentimentObject={sentimentObject} />
                </div>
                <div className="row top-margin">
                    <Carousel.Caption>
                        <h3>Polarity Pie Chart</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
             <Carousel.Item>
                <div id='pieBox1' className="col-xs-12 col-md-6 col-centered">
                    <PieChartEmotion emotionObject={smartObject} />
                </div>
                <div className="row top-margin">
                    <Carousel.Caption>
                        <h3>Naive Bayes</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div id='graphBox' className="col-centered">
                    <BarGraph sentimentObject={sentimentObject} />
                </div>
                <div className="row top-margin">
                    <Carousel.Caption>
                        <h3>Polarity Magnitude</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            {/*<Carousel.Item>
                <div id='graphBox' className="col-centered">
                    <LineGraph sentimentObject={sentimentObject} />
                </div>
                <div className="row top-margin">
                    <Carousel.Caption>
                        <h3>Polarity Over Time</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>*/}
        </Carousel>
    );
};
