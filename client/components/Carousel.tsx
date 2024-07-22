"use client"
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel as BootstrapCarousel, CarouselItem } from 'react-bootstrap';

const Carousel = () => {
    return (
        <BootstrapCarousel className='w-full'>
            <CarouselItem>
                <Image
                    src="/imagenes/bodega1.webp"
                    className="d-block w-100"
                    alt="Primera imagen"
                    width={300}
                    height={300}
                />
            </CarouselItem>
            <CarouselItem>
                <Image
                    src="/imagenes/bodega4.avif"
                    className="d-block w-100"
                    alt="Segunda imagen"
                    width={300}
                    height={300}
                />
            </CarouselItem>
            <CarouselItem>
                <Image
                    src="/imagenes/bodega3.webp"
                    className="d-block w-100"
                    alt="Tercera imagen"
                    width={300}
                    height={300}
                />
            </CarouselItem>
        </BootstrapCarousel>
    );
}

export default Carousel;
