import React, { useEffect, useRef, useState } from 'react';
import yourImage from './1.png'; // Import your image here
import pinkClick from './pink-7.png'; // Import your click image here
import blueClick from './blue-1.png';
import greenClick from './green-1.png';

function LightEffectCanvas() {
    const canvasRef = useRef(null);
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [image, setImage] = useState(null);
    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return; // Check if canvas is available

            const container = canvas.parentNode;
            const containerWidth = container.clientWidth;
            const containerHeight = container.clientHeight;

            // Update canvas dimensions
            canvas.width = containerWidth;
            canvas.height = containerHeight;

            // Redraw image if it's loaded
            if (imageLoaded) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'rgba(11, 8, 32, 0.63)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial resize

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [imageLoaded, image, canvasRef.current]); // Add canvasRef.current to the dependency array

    const handleCanvasClick = (event) => {
        if (!imageLoaded) return; // Ignore clicks until the image is loaded
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        // Adjust coordinates based on canvas size
        const canvasX = x * scaleX;
        const canvasY = y * scaleY;

        setSelectedPoints([...selectedPoints, { x: canvasX, y: canvasY }]);

        switch (selectedColor) {
            case 1:
                drawPinkLightEffect(canvasX, canvasY);
                break;
            case 2:
                drawBlueLightEffect(canvasX, canvasY);
                break;
            case 3:
                drawGreenLightEffect(canvasX, canvasY);
                break;
            default:
                drawPinkLightEffect(canvasX, canvasY);;
        }
        drawClickImage(canvasX, canvasY); // Draw the click image at the clicked coordinates
    };

    const drawPinkLightEffect = (x, y) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Draw outer glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 500); // Increased range
        gradient.addColorStop(0, 'rgba(255, 0, 255, 0.01)'); // Pink color with very low opacity
        gradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.015)'); // Semi-transparent pink with even lower opacity
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // White transparent
        ctx.fillStyle = gradient;

        for (let radius = 100; radius <= 300; radius += 30) { // Increased radius range
            ctx.beginPath();
            ctx.rect(x - radius, y - radius, radius * 2, radius * 2); // Adjust rectangle size based on radius
            ctx.fill();
        }
    };

    const drawBlueLightEffect = (x, y) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Draw outer glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 500); // Increased range
        gradient.addColorStop(0, 'rgba(51, 0, 255, 0.01)'); // Pink color with very low opacity
        gradient.addColorStop(0.5, 'rgba(51, 0, 255, 0.015)'); // Semi-transparent pink with even lower opacity
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // White transparent
        ctx.fillStyle = gradient;

        for (let radius = 100; radius <= 300; radius += 30) { // Increased radius range
            ctx.beginPath();
            ctx.rect(x - radius, y - radius, radius * 2, radius * 2); // Adjust rectangle size based on radius
            ctx.fill();
        }
    };

    const drawGreenLightEffect = (x, y) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Draw outer glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 500); // Increased range
        gradient.addColorStop(0, 'rgba(0, 255, 98, 0.01)'); // Pink color with very low opacity
        gradient.addColorStop(0.5, 'rgba(0, 255, 98, 0.015)'); // Semi-transparent pink with even lower opacity
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // White transparent
        ctx.fillStyle = gradient;

        for (let radius = 100; radius <= 300; radius += 30) { // Increased radius range
            ctx.beginPath();
            ctx.rect(x - radius, y - radius, radius * 2, radius * 2); // Adjust rectangle size based on radius
            ctx.fill();
        }
    };


    const drawClickImage = (x, y) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const clickImg = new Image();
        clickImg.onload = () => {
            ctx.drawImage(clickImg, x - clickImg.width / 2, y - clickImg.height / 2);
        };
        clickImg.src = selectedColor === 1 ? pinkClick : selectedColor === 2 ? blueClick : greenClick;
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                setImage(img);
                setImageLoaded(true);
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');

                // Set canvas dimensions after image is loaded
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // Draw the image with color overlay and opacity
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'rgba(11, 8, 32, 0.63)'; // Color overlay
                ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    };

    const clearSelectedPoints = () => {
        setSelectedPoints([]);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // Redraw the image
        ctx.fillStyle = 'rgba(11, 8, 32, 0.63)'; // Color overlay
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas
    };

    return (
        <div className="container my-5 d-flex justify-content-center flex-column align-items-center">
            <div className="row p-4 align-items-center rounded-3 border shadow-lg col-lg-8 col-md-7 col-sm-10 col-10">
                {!!selectedColor ?
                    <div className='d-flex flex-column'>
                        <canvas
                            ref={canvasRef}
                            className='my-image'
                            onClick={handleCanvasClick}
                            style={{ border: '1px solid black' }}
                        />
                        <input type="file" className="btn btn-dark mt-2 w-50" onChange={handleImageUpload} />
                        <button type="button" className="btn btn-dark mt-2 w-50" onClick={clearSelectedPoints}>
                            Clear Selected Points
                        </button>                    </div>
                    : <p>Please select the color first</p>}
            </div>
            <div className='flex-row mt-3'>
                <button type="button" className="btn btn-dark mx-1" onClick={() => setSelectedColor(1)}>Pink</button>
                <button type="button" className="btn btn-dark mx-1" onClick={() => setSelectedColor(2)}>Blue</button>
                <button type="button" className="btn btn-dark mx-1" onClick={() => setSelectedColor(3)}>Green</button>
            </div>
        </div>
    );
}

export default LightEffectCanvas;
