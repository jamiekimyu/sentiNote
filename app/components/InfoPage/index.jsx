import React,{ Component } from 'react';
import { Parallax } from 'react-parallax';
import ParallaxPart1 from './ParallaxPart1'
import NonParallaxPart1 from './NonParallaxPart1'

class Info extends Component {

    render () {

        return (
             <div>
                <Parallax bgImage="./public/starrynight.jpg" strength={400}>
                    <br />
                    <ParallaxPart1 />
                </Parallax>
                {/*<NonParallaxPart1 />*/}
            </div>
        );
   };

};

export default Info; 