import React from 'react'
import PromotionAnomation from './Animation'
import Enroll from './Enroll'


const Promotion = () => {
    return (
        <div className="promotion_wrapper" style={{background : '#ffffff'}}>
            <div className='container'>
                <PromotionAnomation/>
                <Enroll/>
            </div>
        </div>

    )
}

export default Promotion