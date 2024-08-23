'use client';

import { useState, useRef, useEffect } from "react";

const ProjectsGlance = () => {
    const [topPos, setTopPos] = useState(0);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const sectionRefer = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const scrollHandle = () => {
            if (sectionRefer.current && imgRef.current) {
                const sectionTop = sectionRefer.current.getBoundingClientRect().top;
                const sectionHeight = sectionRefer.current.getBoundingClientRect().height;
                const windowHeight = window.innerHeight;
                
                // Calculate the percentage scrolled within the canvas42 section
                const scrollY = window.scrollY;
                const sectionOffsetTop = sectionRefer.current.offsetTop;
                const scrollPos = Math.max(0, scrollY - sectionOffsetTop);
                const percentageScrolled = scrollPos / (sectionHeight - windowHeight);
                
                // Set the top position of img-class based on the scroll percentage
                const newTopPos = Math.min(percentageScrolled * (sectionHeight - windowHeight), sectionHeight - windowHeight);
                imgRef.current.style.transform = `translateY(${newTopPos}px)`;

                // Determine the current section index
                const sections = ['sec1', 'sec2', 'sec3', 'sec4'];
                let currentIndex = 0;
                sections.forEach((id, index) => {
                    const sectionElement = document.getElementById(id);
                    const sectionRect = sectionElement.getBoundingClientRect();
                    if (sectionRect.top <= windowHeight / 2 && sectionRect.bottom >= windowHeight / 2) {
                        currentIndex = index;
                    }
                });

                // Update state and content
                setCurrentSectionIndex(currentIndex);
            }
        };

        window.addEventListener('scroll', scrollHandle);
        return () => window.removeEventListener('scroll', scrollHandle);
    }, []);

    return (
        <section ref={sectionRefer} className='relative outline w-screen h-[400vh] flex flex-col' id="canvas42">
            <div ref={imgRef} className="absolute w-[95%] h-[90vh] top-[1%] ml-[40px] outline flex flex-row" id="img-class">
                <div className="relative w-2/3 h-full outline flex flex-col">
                    <div className='relative flex flex-row'>
                        <div className='relative w-32 outline h-32'></div>
                        <div className='relative w-full outline h-32'></div>
                    </div>
                    <div className='relative w-full h-full flex flex-row justify-center items-center'>
                    <section className="relative w-[94%] h-[94%] outline flex flex-col justify-evenly items-start">
                        <div>Internet Service Churn Prediction</div>
                        <div>Multimodal Analysis of Pneumonia</div>
                        <button className='relative w-60 h-20 outline cursor-pointer'>Projects Platform</button>
                    </section>
                    </div>
                </div>
                <div className='relative w-1/3 h-full outline'>
                </div>
            </div>
            <section className='relative outline w-screen h-[100vh]' id='sec1'></section>
            <section className='relative outline w-screen h-[100vh]' id='sec2'></section>
            <section className='relative outline w-screen h-[100vh]' id='sec3'></section>
            <section className='relative outline w-screen h-[100vh]' id='sec4'></section>
        </section>
    );
}

export default ProjectsGlance;
