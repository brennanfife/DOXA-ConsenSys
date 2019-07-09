import React from 'react'
import Zoom from 'react-reveal/Zoom';

import icon_eye from '../../resources/images/icons/eye.png';
import icon_couch from '../../resources/images/icons/couch.png';
import icon_smile from '../../resources/images/icons/smile.png';

const DOXAFeatures = () => {
    return (
        <div className="bck_black"> 
            <div className="center_wrapper">
                <div className="vn_wrapper"> {/** Provides the flexbox */}
                    <Zoom duration={500}> {/** Provides the zoom animation */}
                        <div className="vn_item">
                            <div className="vn_outer">
                                <div className="vn_inner">
                                    <div className="vn_icon_square bck_red"></div>
                                    <div 
                                        className="vn_icon"
                                        style={{
                                            background:`url(${icon_eye})`
                                        }}
                                    ></div>
                                    <div className="vn_title">
                                        Transparent
                                    </div>
                                    <div className="vn_desc">
                                        Can be verified by anyone, anytime!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                    
                    <Zoom duration={500} delay={500}> {/** Provides the zoom animation after the first zoom loads */}
                        <div className="vn_item">
                            <div className="vn_outer">
                                <div className="vn_inner">
                                    <div className="vn_icon_square bck_red"></div>
                                    <div 
                                        className="vn_icon"
                                        style={{
                                            background:`url(${icon_couch})`
                                        }}
                                    ></div>
                                    <div className="vn_title">
                                        Convenient
                                    </div>
                                    <div className="vn_desc">
                                        Can be done in just several clicks!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>

                    <Zoom duration={500} delay={1000}> {/** Provides the zoom animation */}
                        <div className="vn_item">
                            <div className="vn_outer">
                                <div className="vn_inner">
                                    <div className="vn_icon_square bck_red"></div>
                                    <div 
                                        className="vn_icon"
                                        style={{
                                            background:`url(${icon_smile})`
                                        }}
                                    ></div>
                                    <div className="vn_title">
                                        Refreshing
                                    </div>
                                    <div className="vn_desc">
                                        There's a new & fun way to save!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </div>
            </div>
        </div>
    )
}

export default DOXAFeatures