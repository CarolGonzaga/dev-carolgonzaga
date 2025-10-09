import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faLaptopCode } from '@fortawesome/free-solid-svg-icons';

type Slide = {
    id: number;
    icon: any;
    title: string;
    text: string;
};

type CarouselProps = {
    slides: Slide[];
};

function Carousel({ slides }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const slidesContainerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);

    const clonedSlides = [slides[slides.length - 1], ...slides, slides[0]];

    const moveToSlide = (index: number, transition = true) => {
        if (slidesContainerRef.current) {
            slidesContainerRef.current.style.transition = transition ? 'transform 0.5s ease-in-out' : 'none';
            slidesContainerRef.current.style.transform = `translateX(-${index * 100}%)`;
        }
    };

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(prev => prev - 1);
    };

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            handleNext();
        }, 5000);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentIndex]);


    useEffect(() => {
        if (!isTransitioning) return;

        const transitionEndHandler = () => {
            if (currentIndex === 0) {
                moveToSlide(slides.length, false);
                setCurrentIndex(slides.length);
            } else if (currentIndex === slides.length + 1) {
                moveToSlide(1, false);
                setCurrentIndex(1);
            }
            setIsTransitioning(false);
        };

        const element = slidesContainerRef.current;
        element?.addEventListener('transitionend', transitionEndHandler);

        return () => {
            element?.removeEventListener('transitionend', transitionEndHandler);
        };
    }, [isTransitioning, currentIndex, slides.length]);

    useEffect(() => {
        moveToSlide(currentIndex);
    }, [currentIndex]);


    return (
        <div className="carousel">
            <div className="carousel-slides" ref={slidesContainerRef}>
                {clonedSlides.map((slide, index) => (
                    <div className="slide" key={index}>
                        <div className="slide-content">
                            <FontAwesomeIcon icon={slide.icon} className="sidebar-icon" />
                            <h4>{slide.title}</h4>
                            <p>{slide.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handlePrev} className="carousel-nav-btn prev" aria-label="Slide anterior">
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={handleNext} className="carousel-nav-btn next" aria-label="Próximo slide">
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
}

export default Carousel;