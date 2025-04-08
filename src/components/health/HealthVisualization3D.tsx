
import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

interface HealthVisualization3DProps {
  className?: string;
}

export function HealthVisualization3D({ className }: HealthVisualization3DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // This is a placeholder for a 3D visualization
    // In a real implementation, you would use Three.js or another 3D library
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Setup canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Create a simple animation for demonstration purposes
    let hue = 0;
    let angle = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Center of the canvas
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const size = Math.min(centerX, centerY) * 0.8;
      
      // Draw a heart/pulse like wave
      ctx.beginPath();
      ctx.strokeStyle = `hsl(${hue}, 70%, 60%)`;
      ctx.lineWidth = 3;
      
      for (let i = 0; i <= canvas.width; i += 5) {
        const x = i;
        const normalizedX = (i / canvas.width) * Math.PI * 2;
        // Create heartbeat-like wave
        const y = centerY - Math.sin(normalizedX * 2 + angle) * 30 - 
                  (Math.sin(normalizedX * 8 + angle * 2) * 10);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Draw rotating 3D-like circular visualization
      for (let i = 0; i < 3; i++) {
        const radius = size * (0.4 - i * 0.1);
        
        ctx.beginPath();
        ctx.ellipse(
          centerX,
          centerY,
          radius,
          radius * Math.abs(Math.cos(angle + i * 0.5)),
          angle * (i + 1) * 0.3,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = `hsl(${hue + i * 30}, 70%, 60%)`;
        ctx.stroke();
      }
      
      // Update values for next frame
      hue = (hue + 0.5) % 360;
      angle += 0.02;
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    // Handle window resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Card className={`overflow-hidden ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="w-full h-full min-h-[300px]" 
        style={{ background: 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb)' }}
      />
    </Card>
  );
}
