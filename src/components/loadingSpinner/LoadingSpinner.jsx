/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Style from './loadingSpinner.module.css'

const LoadingSpinner = () => {
    return (
        <div className={Style.loadingContainer}>
            <div class={Style.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
    );
};

export default LoadingSpinner;