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
                <div className="row maxH1000">
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
                <div className="row maxH1000">
                    <Carousel.Caption>
                        <h3>Polarity</h3>
                        <p> This chart was constructed by analyzing the content of
                            the text relative to the AFINN word list. The list, created
                            by Finn Arup Nielsen, is a list of words rated for valence with an integer
                            between negative five and positive five. This chart represents the proportion
                            of total positivity vs. total negativity. Words are analyzed individually-
                            not contextually.</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
             <Carousel.Item>
                <div className="row center square">
                    <PieChartEmotion emotionObject={smartObject} />
                </div>
                <div className="row maxH1000 top40">
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
                <div className="row maxH1000">
                    <Carousel.Caption>
                        <h3>Polarity Magnitude</h3>
                        <p>This chart, based on the AFINN word list, offers a clear visual representation
                        of the total magnitude of positivity vs. negativity, as well as an overall score.
                        Words are analyzed individually- not contextually.
                        </p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div id='graphBox' className="row center">
                    <LineGraph sentimentObject={sentimentObject} />
                </div>
                <div className="row maxH1000">
                    <Carousel.Caption>
                        <h3>Polarity Over Time</h3>
                        <p>This chart, based on the AFINN word list, shows how polarity changes
                        from the beginning to the end of the document.
                        Words are analyzed individually- not contextually.</p>
                    </Carousel.Caption>
                </div>
            </Carousel.Item>
        </Carousel>
    );
};
