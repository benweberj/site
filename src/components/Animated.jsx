import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function Animated({ children }) {
    const [position, setPosition] = useState(-1); // -1 to 1 position value
    const ref = useRef();

    const handleScroll = () => {
        if (!ref.current) return;

        // Get element position relative to viewport
        const rect = ref.current.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const windowCenter = window.innerHeight / 2;

        // Normalize position value between -1 and 1
        const viewportHeight = window.innerHeight;
        let pos = (windowCenter - elementCenter) / (viewportHeight / 2);
        pos = Math.max(-1, Math.min(1, pos));

        setPosition(pos);
    };

    useEffect(() => {
        const scrollListener = () => {
            handleScroll();
        };

        // Initial position calculation
        handleScroll();

        let root = document.getElementById('root')


        root.addEventListener('scroll', scrollListener);
        // window.addEventListener('scroll', scrollListener);
        // document.addEventListener('scroll', scrollListener);

        return () => root.removeEventListener('scroll', scrollListener);
        return () => window.removeEventListener('scroll', scrollListener);
    }, []);

    // Calculate transform based on position
    const getTransform = () => {
        if (position > 0.8) {
            return -10; // Slide in from right
        } else if (position < -0.8) {
            return 10; // Slide out to left
        } else {
            return 0; // Stay centered
        }
    };

    return (
        <Wrapper ref={ref} style={{
            transform: `translateY(${getTransform()}%)`,
            opacity: Math.abs(position) < 0.8 ? 1 : .1,
            transition: 'transform 0.5s ease, opacity 0.5s ease' // Ensure immediate response to scroll
        }}>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    will-change: transform, opacity;
`
