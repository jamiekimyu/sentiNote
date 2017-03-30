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
                <div className="row center square">
                    <div className='marg80'>
                        <PieChartEmotion emotionObject={emotionObject} />
                    </div>
                </div>
                <div className="row top225">
                    <Carousel.Caption>
                        <h3>Emotion</h3>
                        <p>
                            This chart was constructed by analyzing the content of
                            the text relative to the NRC Emotion Lexicon developed by
                            Saif Mohammad and his team. Through their meticulous crowd-sourcing
                            and complex statistical analysis, they have associated certain words
                            with certain emotions. Words are analyzed individually- not contextually.
                        </p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="row center square">
                    <PieChartPolarity sentimentObject={sentimentObject} />
                </div>
                <div className="row top225">
                    <Carousel.Caption>
                        <h3>Polarity</h3>
                        <p> The AFINN sentiment analysis can detect positive or negative words.
                            See how polarizing your writing is!</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
             <Carousel.Item>
                <div className="row center square">
                    <PieChartEmotion emotionObject={smartObject} />
                </div>
                <div className="row top225">
                    <Carousel.Caption>
                        <h3>Emotion- Machine Learning</h3>
                        <p>We are continually crowd-sourcing emotional analysis from our users.
                        To contribute, create a journal entry, and then classify the sentences within your entry
                        after it is submitted. Your input will automatically update this chart.
                        Data is analyzed using a simplistic Naive Bayes Classification algorithm.

                        </p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div id='graphBox' className="row center">
                    <BarGraph sentimentObject={sentimentObject} />
                </div>
                <div className="row top150">
                    <Carousel.Caption>
                        <h3>Polarity Magnitude</h3>
                        <p>Here you can see your positivity and negativity side-by-side
                           with the net polarity of the writing!</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div id='graphBox' className="row center">
                    <LineGraph sentimentObject={sentimentObject} />
                </div>
                <div className="row top100">
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
