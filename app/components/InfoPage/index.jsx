import React,{ Component } from 'react';
import { Parallax } from 'react-parallax';
import InfoPage from './ParallaxPart1'

class Info extends Component {

    render () {
        return (
             <div>
                <Parallax bgImage="./public/starrynight.jpg" strength={400}>
                    <br />
                    <InfoPage />
                </Parallax>
            </div>
        );
   };

};

export default Info; 