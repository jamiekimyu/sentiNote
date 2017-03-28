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
                        <h3>Emotion</h3>
                        <p>
                            The AFINN sentiment analysis matches the words in your
                            entry with an associated emotion. Check out the
                            emotions of your writing!
                        </p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div id='pieBox1' className="col-xs-12 col-md-6 col-centered">
                    <PieChartPolarity sentimentObject={sentimentObject} />
                </div>
                <div className="row top-margin">
                    <Carousel.Caption>
                        <h3>Polarity</h3>
                        <p> The AFINN sentiment analysis can detect positive or negative words.
                            See how polarizing your writing is!</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
             <Carousel.Item>
                <div id='pieBox1' className="col-xs-12 col-md-6 col-centered">
                    <PieChartEmotion emotionObject={smartObject} />
                </div>
                <div className="row top-margin">
                    <Carousel.Caption>
                        <h3>Naive Bayes Emotion</h3>
                        <p>We've implemented some Machine Learning. See the analysis
                           the emotions with the learning power of all our users!</p>
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
                        <p>Here you can see your positivity and negativity side-by-side
                           with the net polarity of the writing!</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div id='graphBox' className="col-centered">
                    <LineGraph sentimentObject={sentimentObject} />
                </div>
                <div className="row top-margin">
                    <Carousel.Caption>
                        <h3>Polarity Over Time</h3>
                        <p>See how each word affects the polarity of the writing!
                        Useful for longer text</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
        </Carousel>
    );
};
