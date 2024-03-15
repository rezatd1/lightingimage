import React, { useRef, useState } from 'react';
import yourImage from './1.png'; // Import your image here
import clickImage from './I.png'; // Import your click image here

function LightEffectCanvas() {
    const canvasRef = useRef(null);
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [image, setImage] = useState(null);

    const handleCanvasClick = (event) => {
        if (!imageLoaded) return; // Ignore clicks until the image is loaded
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        setSelectedPoints([...selectedPoints, { x, y }]);
        drawLightEffect(x, y);
        drawClickImage(x, y); // Draw the click image at the clicked coordinates
    };

    const drawLightEffect = (x, y) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
      
        // Draw small rectangle in the center
        ctx.beginPath();
        ctx.rect(x - 2.5, y - 2.5, 5, 5); // Adjust rectangle size as desired
        ctx.fillStyle = 'rgba(255, 0, 255, 1)'; // Neon pink color
        ctx.fill();
      
        // Draw outer glow effect
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 300); // Increased range
        gradient.addColorStop(0, 'rgba(255, 0, 255, 0.05)'); // Pink color with very low opacity
        gradient.addColorStop(0.5, 'rgba(255, 0, 255, 0.02)'); // Semi-transparent pink with even lower opacity
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
        clickImg.src = clickImage;
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

    return (
        <div>
            <input type="file" onChange={handleImageUpload} />
            <div className='my-image-container'>
            <canvas
                ref={canvasRef} 
                className='my-image'
                width={800} // Set your desired width
                height={600} // Set your desired height
                onClick={handleCanvasClick}
                style={{ border: '1px solid black' }}
            />
            </div>

        </div>
    );
}

export default LightEffectCanvas;
