import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import type { DragDropImageQuestion, ImageTarget } from '../data/unitsData';

interface DragDropImageProps {
  questionData: DragDropImageQuestion;
  onAnswer: (isCorrect: boolean, score: number) => void;
}

export const DragDropImage: React.FC<DragDropImageProps> = ({ questionData, onAnswer }) => {
  const [availableLabels, setAvailableLabels] = useState<string[]>([]);
  const [placedLabels, setPlacedLabels] = useState<Record<string, string | null>>({}); // targetId -> label
  const [shakeTargets, setShakeTargets] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  useEffect(() => {
    setAvailableLabels([...questionData.labels].sort(() => Math.random() - 0.5));
    const initialPlacements: Record<string, string | null> = {};
    questionData.targets.forEach(t => {
      initialPlacements[t.id] = null;
    });
    setPlacedLabels(initialPlacements);
    setShakeTargets({});
    setIsCompleted(false);
    setAttempts(0);
    setSelectedLabel(null);
  }, [questionData]);

  const handleDragStart = (e: React.DragEvent, label: string) => {
    e.dataTransfer.setData('text/plain', label);
  };

  const verifyAndPlace = (label: string, target: ImageTarget) => {
    if (label === target.label) {
      // Correct!
      setPlacedLabels(prev => ({ ...prev, [target.id]: label }));
      setAvailableLabels(prev => prev.filter(l => l !== label));
      setSelectedLabel(null);

      // Check completion
      const newPlaced = { ...placedLabels, [target.id]: label };
      const allDone = Object.values(newPlaced).every(v => v !== null);
      if (allDone) {
        setIsCompleted(true);
      }
    } else {
      // Incorrect
      setAttempts(prev => prev + 1);
      setShakeTargets(prev => ({ ...prev, [target.id]: true }));
      setTimeout(() => {
        setShakeTargets(prev => ({ ...prev, [target.id]: false }));
      }, 500);
      setSelectedLabel(null);
    }
  };

  const handleDrop = (e: React.DragEvent, target: ImageTarget) => {
    e.preventDefault();
    if (placedLabels[target.id] !== null) return;
    const label = e.dataTransfer.getData('text/plain');
    if (!label) return;
    verifyAndPlace(label, target);
  };

  const handleTargetClick = (target: ImageTarget) => {
    if (placedLabels[target.id] !== null) return;
    if (selectedLabel) {
      verifyAndPlace(selectedLabel, target);
    }
  };

  const handleLabelClick = (label: string) => {
    setSelectedLabel(selectedLabel === label ? null : label);
  };

  const handleContinue = () => {
    const score = Math.max(0, 10 - attempts * 2);
    onAnswer(true, score);
  };

  // Render vector graphic drawings based on concept
  const renderDiagram = () => {
    const type = questionData.imageType;

    if (type === 'topologies') {
      return (
        <svg viewBox="0 0 500 320" style={{ width: '100%', height: '100%', minHeight: '280px', background: 'var(--color-soft-blue)', borderRadius: '16px' }}>
          {/* Subtly separate quadrants */}
          <line x1="250" y1="0" x2="250" y2="320" stroke="rgba(79, 157, 255, 0.15)" strokeDasharray="4 4" />
          <line x1="0" y1="160" x2="500" y2="160" stroke="rgba(79, 157, 255, 0.15)" strokeDasharray="4 4" />

          {/* TOP LEFT: BUS (topologies target bus: x: 18, y: 70, star: x: 50, y: 30, etc. Wait, we map targets in data, let's just make the visuals line up.
              bus target is at x=18, y=70 (so bottom left)
              star target is at x=50, y=30 (top center? wait.
              Let's align targets and drawings:
              bus is at 18%, 70% -> x=90, y=224
              star is at 50%, 30% -> x=250, y=96
              ring is at 82%, 70% -> x=410, y=224
              mesh is at 50%, 80% -> x=250, y=256
              This is a custom layout:
              - Star: Top Center
              - Bus: Bottom Left
              - Ring: Bottom Right
              - Mesh: Bottom Center / Middle
          ) */}
          
          {/* STAR TOPOLOGY (Top Center: center x=250, y=60) */}
          <g transform="translate(250, 60)" opacity="0.9">
            <line x1="0" y1="0" x2="-25" y2="-20" stroke="var(--color-navy)" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="25" y2="-20" stroke="var(--color-navy)" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="-35" y2="15" stroke="var(--color-navy)" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="35" y2="15" stroke="var(--color-navy)" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="0" y2="30" stroke="var(--color-navy)" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="10" fill="var(--color-sky-blue)" stroke="var(--color-navy)" />
            <circle cx="-25" cy="-20" r="6" fill="var(--color-white)" stroke="var(--color-navy)" />
            <circle cx="25" cy="-20" r="6" fill="var(--color-white)" stroke="var(--color-navy)" />
            <circle cx="-35" cy="15" r="6" fill="var(--color-white)" stroke="var(--color-navy)" />
            <circle cx="35" cy="15" r="6" fill="var(--color-white)" stroke="var(--color-navy)" />
            <circle cx="0" cy="30" r="6" fill="var(--color-white)" stroke="var(--color-navy)" />
          </g>

          {/* BUS TOPOLOGY (Bottom Left: center x=100, y=220) */}
          <g transform="translate(90, 220)" opacity="0.9">
            {/* Backbone */}
            <line x1="-50" y1="0" x2="50" y2="0" stroke="var(--color-navy)" strokeWidth="3" />
            <line x1="-30" y1="0" x2="-30" y2="-20" stroke="var(--color-navy)" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="0" y2="20" stroke="var(--color-navy)" strokeWidth="1.5" />
            <line x1="30" y1="0" x2="30" y2="-20" stroke="var(--color-navy)" strokeWidth="1.5" />
            <rect x="-36" y="-30" width="12" height="10" rx="1" fill="var(--color-white)" stroke="var(--color-navy)" />
            <rect x="-6" y="20" width="12" height="10" rx="1" fill="var(--color-white)" stroke="var(--color-navy)" />
            <rect x="24" y="-30" width="12" height="10" rx="1" fill="var(--color-white)" stroke="var(--color-navy)" />
          </g>

          {/* RING TOPOLOGY (Bottom Right: center x=410, y=220) */}
          <g transform="translate(410, 220)" opacity="0.9">
            <circle cx="0" cy="0" r="30" fill="none" stroke="var(--color-navy)" strokeWidth="2" />
            <circle cx="0" cy="-30" r="6" fill="var(--color-white)" stroke="var(--color-navy)" />
            <circle cx="30" cy="0" r="6" fill="var(--color-white)" stroke="var(--color-navy)" />
            <circle cx="0" cy="30" r="6" fill="var(--color-white)" stroke="var(--color-navy)" />
            <circle cx="-30" cy="0" r="6" fill="var(--color-white)" stroke="var(--color-navy)" />
          </g>

          {/* MESH TOPOLOGY (Center Middle: center x=250, y=220) */}
          <g transform="translate(250, 220)" opacity="0.9">
            {/* Pentagram connectors */}
            <polygon points="0,-25 24,-7 15,22 -15,22 -24,-7" fill="none" stroke="var(--color-navy)" strokeWidth="1.5" />
            <line x1="0" y1="-25" x2="15" y2="22" stroke="var(--color-navy)" strokeWidth="1.2" />
            <line x1="0" y1="-25" x2="-15" y2="22" stroke="var(--color-navy)" strokeWidth="1.2" />
            <line x1="24" y1="-7" x2="-15" y2="22" stroke="var(--color-navy)" strokeWidth="1.2" />
            <line x1="24" y1="-7" x2="-24" y2="-7" stroke="var(--color-navy)" strokeWidth="1.2" />
            <line x1="-24" y1="-7" x2="15" y2="22" stroke="var(--color-navy)" strokeWidth="1.2" />
            
            <circle cx="0" cy="-25" r="5" fill="var(--color-white)" stroke="var(--color-navy)" />
            <circle cx="24" cy="-7" r="5" fill="var(--color-white)" stroke="var(--color-navy)" />
            <circle cx="15" cy="22" r="5" fill="var(--color-white)" stroke="var(--color-navy)" />
            <circle cx="-15" cy="22" r="5" fill="var(--color-white)" stroke="var(--color-navy)" />
            <circle cx="-24" cy="-7" r="5" fill="var(--color-white)" stroke="var(--color-navy)" />
          </g>
        </svg>
      );
    }

    if (type === 'communication_model') {
      return (
        <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%', minHeight: '160px', background: 'var(--color-soft-blue)', borderRadius: '16px' }}>
          {/* Flow Line with arrows */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-navy)" />
            </marker>
          </defs>
          
          {/* Main flow connections between elements */}
          <line x1="85" y1="100" x2="105" y2="100" stroke="var(--color-navy)" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="220" y1="100" x2="235" y2="100" stroke="var(--color-navy)" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="365" y1="100" x2="375" y2="100" stroke="var(--color-navy)" strokeWidth="2" markerEnd="url(#arrow)" />
          <line x1="490" y1="100" x2="510" y2="100" stroke="var(--color-navy)" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Dotted bypass line showing signal flow */}
          <path d="M 165,100 Q 300,50 435,100" fill="none" stroke="var(--color-sky-blue)" strokeWidth="2" strokeDasharray="4 4" opacity="0.7" />

          {/* Static Node: Sender */}
          <g transform="translate(50, 100)">
            <rect x="-35" y="-20" width="70" height="40" rx="8" fill="var(--color-navy)" stroke="var(--color-sky-blue)" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 2px 5px rgba(30,58,95,0.15))' }} />
            <text x="0" y="4" fontFamily="Poppins" fontSize="10" fontWeight="700" fill="var(--color-white)" textAnchor="middle">Sender</text>
          </g>

          {/* Static Node: Destination */}
          <g transform="translate(550, 100)">
            <rect x="-35" y="-20" width="70" height="40" rx="8" fill="var(--color-navy)" stroke="var(--color-sky-blue)" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 2px 5px rgba(30,58,95,0.15))' }} />
            <text x="0" y="4" fontFamily="Poppins" fontSize="10" fontWeight="700" fill="var(--color-white)" textAnchor="middle">Dest</text>
          </g>
        </svg>
      );
    }

    if (type === 'frame_structure') {
      return (
        <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', minHeight: '160px', background: 'var(--color-soft-blue)', borderRadius: '16px' }}>
          {/* Frame block background */}
          <rect x="40" y="60" width="420" height="80" rx="12" fill="none" stroke="var(--color-navy)" strokeWidth="2.5" strokeDasharray="5 5" />
          
          {/* Connecting arrow/lines showing headers/payloads */}
          <line x1="150" y1="60" x2="150" y2="140" stroke="var(--color-navy)" strokeWidth="1.5" />
          <line x1="350" y1="60" x2="350" y2="140" stroke="var(--color-navy)" strokeWidth="1.5" />
          
          {/* Labels for sizes or bytes */}
          <text x="95" y="160" fontFamily="Poppins" fontSize="9" fill="var(--color-text-light)" fontWeight="600" textAnchor="middle">Addressing & Control</text>
          <text x="250" y="160" fontFamily="Poppins" fontSize="9" fill="var(--color-text-light)" fontWeight="600" textAnchor="middle">Network Layer Packet</text>
          <text x="405" y="160" fontFamily="Poppins" fontSize="9" fill="var(--color-text-light)" fontWeight="600" textAnchor="middle">Error Detection (CRC)</text>

          {/* Dotted bracket over the whole block representing the Frame */}
          <path d="M 45,50 L 45,35 L 455,35 L 455,50" fill="none" stroke="var(--color-navy)" strokeWidth="1.5" />
          <text x="250" y="25" fontFamily="Poppins" fontSize="11" fontWeight="800" fill="var(--color-navy)" textAnchor="middle">Layer 2 Protocol Data Unit (Frame)</text>
        </svg>
      );
    }

    if (type === 'stop_wait_timing') {
      return (
        <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', minHeight: '180px', background: 'var(--color-soft-blue)', borderRadius: '16px' }}>
          <defs>
            <marker id="t-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-navy)" />
            </marker>
          </defs>

          {/* Timelines for Sender and Receiver */}
          <line x1="90" y1="30" x2="90" y2="180" stroke="var(--color-navy)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="410" y1="30" x2="410" y2="180" stroke="var(--color-navy)" strokeWidth="2.5" strokeLinecap="round" />
          
          <text x="90" y="20" fontFamily="Poppins" fontSize="10" fontWeight="800" fill="var(--color-navy)" textAnchor="middle">SENDER</text>
          <text x="410" y="20" fontFamily="Poppins" fontSize="10" fontWeight="800" fill="var(--color-navy)" textAnchor="middle">RECEIVER</text>

          {/* Frame Transmission (Diagonal down) */}
          <line x1="90" y1="40" x2="410" y2="75" stroke="var(--color-sky-blue)" strokeWidth="2" markerEnd="url(#t-arrow)" />
          
          {/* ACK Transmission (Diagonal back) */}
          <line x1="410" y1="90" x2="90" y2="125" stroke="#48BB78" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#t-arrow)" />
          
          {/* Next Frame Transmission (Diagonal down) */}
          <line x1="90" y1="145" x2="410" y2="180" stroke="var(--color-sky-blue)" strokeWidth="2" markerEnd="url(#t-arrow)" />

          {/* Time axis arrow on right */}
          <line x1="455" y1="30" x2="455" y2="170" stroke="var(--color-text-light)" strokeWidth="1.5" markerEnd="url(#t-arrow)" />
          <text x="465" y="105" fontFamily="Poppins" fontSize="8" fontWeight="700" fill="var(--color-text-light)" transform="rotate(90 465 105)" textAnchor="middle">TIME</text>

          {/* Timeout Bracket */}
          <path d="M 80,42 L 70,42 L 70,123 L 80,123" fill="none" stroke="#E53E3E" strokeWidth="1.5" />
          <text x="60" y="82" fontFamily="Poppins" fontSize="8" fontWeight="700" fill="#E53E3E" transform="rotate(-90 60 82)" textAnchor="middle">RTT / Timeout</text>
        </svg>
      );
    }

    if (type === 'three_way_handshake') {
      return (
        <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%', minHeight: '180px', background: 'var(--color-soft-blue)', borderRadius: '16px' }}>
          <defs>
            <marker id="handshake-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-navy)" />
            </marker>
          </defs>

          {/* Client & Server Timelines */}
          <line x1="120" y1="30" x2="120" y2="170" stroke="var(--color-navy)" strokeWidth="3" strokeLinecap="round" />
          <line x1="480" y1="30" x2="480" y2="170" stroke="var(--color-navy)" strokeWidth="3" strokeLinecap="round" />
          
          <text x="120" y="22" fontFamily="Poppins" fontSize="11" fontWeight="800" fill="var(--color-navy)" textAnchor="middle">CLIENT</text>
          <text x="480" y="22" fontFamily="Poppins" fontSize="11" fontWeight="800" fill="var(--color-navy)" textAnchor="middle">SERVER</text>

          {/* Step 1: SYN (Client to Server) */}
          <line x1="120" y1="50" x2="480" y2="80" stroke="var(--color-sky-blue)" strokeWidth="2.5" markerEnd="url(#handshake-arrow)" />

          {/* Step 2: SYN-ACK (Server to Client) */}
          <line x1="480" y1="110" x2="120" y2="140" stroke="#48BB78" strokeWidth="2.5" markerEnd="url(#handshake-arrow)" />

          {/* Step 3: ACK (Client to Server) */}
          <line x1="120" y1="170" x2="480" y2="200" stroke="var(--color-sky-blue)" strokeWidth="2.5" markerEnd="url(#handshake-arrow)" />
        </svg>
      );
    }

    if (type === 'tcp_header') {
      return (
        <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%', minHeight: '180px', background: 'var(--color-soft-blue)', borderRadius: '16px' }}>
          {/* Header Outer Border */}
          <rect x="40" y="30" width="520" height="140" fill="var(--color-white)" stroke="var(--color-navy)" strokeWidth="2.5" />

          {/* Grid Rows */}
          <line x1="40" y1="65" x2="560" y2="65" stroke="var(--color-navy)" strokeWidth="1.5" />
          <line x1="40" y1="100" x2="560" y2="100" stroke="var(--color-navy)" strokeWidth="1.5" />
          <line x1="40" y1="135" x2="560" y2="135" stroke="var(--color-navy)" strokeWidth="1.5" />

          {/* Row 1 Splitting (Source and Destination Ports) */}
          <line x1="300" y1="30" x2="300" y2="65" stroke="var(--color-navy)" strokeWidth="1.5" />

          {/* Row 3 content placeholder */}
          <text x="300" y="122" fontFamily="Poppins" fontSize="10" fontWeight="600" fill="var(--color-text-light)" textAnchor="middle">Acknowledgment Number (32 bits)</text>

          {/* Row 4 Splitting (Checksum and Other Fields) */}
          <line x1="300" y1="135" x2="300" y2="170" stroke="var(--color-navy)" strokeWidth="1.5" />
          <text x="430" y="157" fontFamily="Poppins" fontSize="10" fontWeight="600" fill="var(--color-text-light)" textAnchor="middle">Urgent Pointer (16 bits)</text>

          {/* Top Bit Indicators */}
          <text x="40" y="22" fontFamily="Poppins" fontSize="9" fontWeight="700" fill="var(--color-text-light)">0</text>
          <text x="300" y="22" fontFamily="Poppins" fontSize="9" fontWeight="700" fill="var(--color-text-light)" textAnchor="middle">15</text>
          <text x="560" y="22" fontFamily="Poppins" fontSize="9" fontWeight="700" fill="var(--color-text-light)" textAnchor="right">31</text>
        </svg>
      );
    }

    if (type === 'web_request') {
      return (
        <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%', minHeight: '180px', background: 'var(--color-soft-blue)', borderRadius: '16px' }}>
          <defs>
            <marker id="web-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-navy)" />
            </marker>
          </defs>
          
          {/* Arrows */}
          {/* Client -> DNS (Lookup) */}
          <path d="M 120,70 Q 200,30 270,40" fill="none" stroke="var(--color-navy)" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#web-arrow)" />
          <text x="180" y="30" fontFamily="Poppins" fontSize="8" fontWeight="600" fill="var(--color-text-light)">1. Lookup</text>
          
          {/* DNS -> Client (IP Address) */}
          <path d="M 270,55 Q 200,50 130,85" fill="none" stroke="var(--color-navy)" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#web-arrow)" />
          
          {/* Client -> Web Server (HTTP Request & Response) */}
          <path d="M 140,115 Q 300,140 460,115" fill="none" stroke="var(--color-navy)" strokeWidth="2" markerEnd="url(#web-arrow)" />
          <text x="300" y="115" fontFamily="Poppins" fontSize="8" fontWeight="600" fill="var(--color-text-light)" textAnchor="middle">2. HTTP Request/Response</text>

          {/* Client Node */}
          <circle cx="100" cy="100" r="30" fill="var(--color-white)" stroke="var(--color-navy)" strokeWidth="2" />
          <rect x="87" y="92" width="26" height="16" rx="2" fill="var(--color-sky-blue)" />
          
          {/* DNS Server Node */}
          <circle cx="300" cy="60" r="30" fill="var(--color-white)" stroke="var(--color-navy)" strokeWidth="2" />
          <rect x="288" y="48" width="24" height="24" rx="2" fill="var(--color-correct)" />
          <text x="300" y="62" fontFamily="Poppins" fontSize="9" fontWeight="800" fill="var(--color-white)" textAnchor="middle">DNS</text>

          {/* Web Server Node */}
          <circle cx="500" cy="100" r="30" fill="var(--color-white)" stroke="var(--color-navy)" strokeWidth="2" />
          <rect x="488" y="88" width="24" height="24" rx="2" fill="#E53E3E" />
          <text x="500" y="102" fontFamily="Poppins" fontSize="9" fontWeight="800" fill="var(--color-white)" textAnchor="middle">www</text>
        </svg>
      );
    }

    if (type === 'http_flow') {
      return (
        <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%', minHeight: '180px', background: 'var(--color-soft-blue)', borderRadius: '16px' }}>
          <defs>
            <marker id="flow-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-navy)" />
            </marker>
          </defs>

          {/* Client (left) */}
          <circle cx="100" cy="100" r="35" fill="var(--color-white)" stroke="var(--color-navy)" strokeWidth="2" />
          <rect x="85" y="90" width="30" height="20" rx="3" fill="var(--color-sky-blue)" />
          <line x1="100" y1="110" x2="100" y2="125" stroke="var(--color-navy)" strokeWidth="2" />
          <line x1="85" y1="125" x2="115" y2="125" stroke="var(--color-navy)" strokeWidth="2" />
          <text x="100" y="145" fontFamily="Poppins" fontSize="10" fontWeight="700" fill="var(--color-navy)" textAnchor="middle">Client</text>

          {/* Server (right) */}
          <circle cx="500" cy="100" r="35" fill="var(--color-white)" stroke="var(--color-navy)" strokeWidth="2" />
          <rect x="485" y="85" width="30" height="30" rx="4" fill="#E53E3E" />
          <text x="500" y="103" fontFamily="Poppins" fontSize="10" fontWeight="800" fill="var(--color-white)" textAnchor="middle">Web</text>
          <text x="500" y="145" fontFamily="Poppins" fontSize="10" fontWeight="700" fill="var(--color-navy)" textAnchor="middle">Web Server</text>

          {/* Request Arrow (top line) */}
          <line x1="150" y1="75" x2="450" y2="75" stroke="var(--color-navy)" strokeWidth="2.5" markerEnd="url(#flow-arrow)" />

          {/* Response Arrow (bottom line) */}
          <line x1="450" y1="125" x2="150" y2="125" stroke="#48BB78" strokeWidth="2.5" markerEnd="url(#flow-arrow)" />
        </svg>
      );
    }



    if (type === 'network_path') {
      return (
        <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%', minHeight: '180px', background: 'var(--color-soft-blue)', borderRadius: '16px' }}>
          <defs>
            <marker id="path-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-navy)" />
            </marker>
          </defs>
          {/* Connection lines */}
          <line x1="160" y1="100" x2="260" y2="100" stroke="var(--color-navy)" strokeWidth="3" markerEnd="url(#path-arrow)" />
          <line x1="340" y1="100" x2="440" y2="100" stroke="var(--color-navy)" strokeWidth="3" markerEnd="url(#path-arrow)" />
          
          {/* Source Host visual (x = 120, y = 100) */}
          <circle cx="120" cy="100" r="35" fill="var(--color-white)" stroke="var(--color-navy)" strokeWidth="2" />
          <rect x="105" y="90" width="30" height="20" rx="3" fill="var(--color-sky-blue)" />
          <line x1="120" y1="110" x2="120" y2="125" stroke="var(--color-navy)" strokeWidth="2" />
          <line x1="105" y1="125" x2="135" y2="125" stroke="var(--color-navy)" strokeWidth="2" />

          {/* Router visual (x = 300, y = 100) */}
          <circle cx="300" cy="100" r="35" fill="var(--color-white)" stroke="var(--color-navy)" strokeWidth="2" />
          {/* Router arrows cross */}
          <line x1="280" y1="100" x2="320" y2="100" stroke="var(--color-navy)" strokeWidth="2.5" markerEnd="url(#path-arrow)" />
          <line x1="320" y1="100" x2="280" y2="100" stroke="var(--color-navy)" strokeWidth="2.5" markerEnd="url(#path-arrow)" />
          <line x1="300" y1="80" x2="300" y2="120" stroke="var(--color-navy)" strokeWidth="2.5" markerEnd="url(#path-arrow)" />
          <line x1="300" y1="120" x2="300" y2="80" stroke="var(--color-navy)" strokeWidth="2.5" markerEnd="url(#path-arrow)" />

          {/* Destination Host visual (x = 480, y = 100) */}
          <circle cx="480" cy="100" r="35" fill="var(--color-white)" stroke="var(--color-navy)" strokeWidth="2" />
          <rect x="465" y="90" width="30" height="20" rx="3" fill="var(--color-sky-blue)" />
          <line x1="480" y1="110" x2="480" y2="125" stroke="var(--color-navy)" strokeWidth="2" />
          <line x1="465" y1="125" x2="495" y2="125" stroke="var(--color-navy)" strokeWidth="2" />
        </svg>
      );
    }

    if (type === 'ipv4_format') {
      return (
        <svg viewBox="0 0 600 200" style={{ width: '100%', height: '100%', minHeight: '180px', background: 'var(--color-soft-blue)', borderRadius: '16px' }}>
          {/* Main 32-bit address container */}
          <rect x="60" y="70" width="480" height="60" rx="8" fill="var(--color-white)" stroke="var(--color-navy)" strokeWidth="2.5" />
          
          {/* Division line between Net ID (e.g. 24 bits) and Host ID (e.g. 8 bits) */}
          <line x1="380" y1="70" x2="380" y2="130" stroke="var(--color-navy)" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* Under braces or labels */}
          <text x="220" y="160" fontFamily="Poppins" fontSize="11" fontWeight="700" fill="var(--color-navy)" textAnchor="middle">Network Portion (Prefix)</text>
          <text x="460" y="160" fontFamily="Poppins" fontSize="11" fontWeight="700" fill="var(--color-navy)" textAnchor="middle">Host Portion</text>
          
          {/* Indicators for bits */}
          <path d="M 65,60 L 65,50 L 375,50 L 375,60" fill="none" stroke="var(--color-text-light)" strokeWidth="1.5" />
          <text x="220" y="42" fontFamily="Poppins" fontSize="9" fontWeight="600" fill="var(--color-text-light)" textAnchor="middle">Leading bits (e.g., 24 bits)</text>

          <path d="M 385,60 L 385,50 L 535,50 L 535,60" fill="none" stroke="var(--color-text-light)" strokeWidth="1.5" />
          <text x="460" y="42" fontFamily="Poppins" fontSize="9" fontWeight="600" fill="var(--color-text-light)" textAnchor="middle">Trailing bits (e.g., 8 bits)</text>
        </svg>
      );
    }


    // Default diagram template for matching subnets, TCP 3-way, ports, or encryption
    return (
      <svg viewBox="0 0 500 200" style={{ width: '100%', height: '100%', minHeight: '180px', background: 'var(--color-soft-blue)', borderRadius: '16px' }}>
        <g stroke="var(--color-navy)" strokeWidth="1.5" opacity="0.5">
          <line x1="50" y1="100" x2="450" y2="100" />
          <line x1="250" y1="20" x2="250" y2="180" />
          <circle cx="250" cy="100" r="30" fill="none" />
        </g>
        <text x="250" y="104" textAnchor="middle" fontFamily="Poppins" fontSize="11" fontWeight="700" fill="var(--color-navy)">CONCEPT MATRIX</text>
      </svg>
    );
  };

  return (
    <div className="quiz-card animate-scale-in" style={{
      maxWidth: '750px',
      margin: '0 auto',
      backgroundColor: 'var(--color-white)',
      padding: '2rem',
      borderRadius: '24px',
      boxShadow: 'var(--shadow-medium)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.2rem'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          backgroundColor: 'var(--color-soft-blue)',
          color: 'var(--color-sky-blue)',
          padding: '0.4rem 1rem',
          borderRadius: '20px',
          fontWeight: 700,
          fontSize: '0.8rem',
          textTransform: 'uppercase'
        }}>
          D. Drag & Drop to Image
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: 500 }}>
          Visual Mapping • drag/tap
        </span>
      </div>

      <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', fontWeight: 700, margin: 0 }}>
        {questionData.title}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', margin: 0 }}>
        Drag each label onto its corresponding target slot in the diagram, or click a label then click its slot.
      </p>

      {/* Interactive Diagram Container */}
      <div style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
        {renderDiagram()}

        {/* Absolute overlays for target slots */}
        {questionData.targets.map((target) => {
          const placedLabel = placedLabels[target.id];
          const isShaking = shakeTargets[target.id];

          return (
            <div
              key={target.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, target)}
              onClick={() => handleTargetClick(target)}
              className={`target-slot ${placedLabel ? 'filled' : ''} ${isShaking ? 'animate-shake incorrect' : ''}`}
              style={{
                position: 'absolute',
                left: `${target.x}%`,
                top: `${target.y}%`,
                transform: 'translate(-50%, -50%)',
                width: '120px',
                height: '34px',
                borderRadius: '8px',
                border: placedLabel ? '2px solid var(--color-correct)' : '2px dashed var(--color-sky-blue)',
                backgroundColor: placedLabel ? 'var(--color-soft-green)' : 'rgba(255, 255, 255, 0.85)',
                color: 'var(--color-navy)',
                fontSize: '0.78rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: placedLabel ? '0 4px 10px rgba(39, 174, 96, 0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
                cursor: placedLabel ? 'default' : 'pointer',
                textAlign: 'center',
                zIndex: 10,
                transition: 'all 0.25s ease'
              }}
            >
              {placedLabel ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: 'var(--color-correct)' }}>
                  <CheckCircle2 size={12} strokeWidth={3} /> {placedLabel}
                </span>
              ) : (
                <span style={{ opacity: 0.7, color: 'var(--color-navy)' }}>Place Here</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Available Labels Bank */}
      {!isCompleted && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-light)', textTransform: 'uppercase' }}>
            Available Labels
          </span>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.8rem',
            padding: '0.8rem',
            border: '2px dashed var(--color-border)',
            borderRadius: '16px',
            backgroundColor: 'rgba(245, 247, 252, 0.5)',
            justifyContent: 'center'
          }}>
            {availableLabels.map((label, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={(e) => handleDragStart(e, label)}
                onClick={() => handleLabelClick(label)}
                style={{
                  padding: '0.4rem 0.8rem',
                  backgroundColor: selectedLabel === label ? 'var(--color-soft-blue)' : 'var(--color-white)',
                  border: selectedLabel === label ? '2px solid var(--color-sky-blue)' : '1px solid var(--color-border)',
                  color: 'var(--color-navy)',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'grab',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s ease',
                  userSelect: 'none'
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed State & Explanation */}
      {isCompleted && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
          <div style={{
            backgroundColor: 'var(--color-soft-green)',
            padding: '1.2rem',
            borderRadius: '16px',
            borderLeft: '5px solid var(--color-correct)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem'
          }}>
            <h4 style={{
              fontSize: '0.95rem',
              color: 'var(--color-navy)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <Sparkles size={18} color="var(--color-correct)" /> Visual Diagram Complete!
            </h4>
            <p style={{
              fontSize: '0.88rem',
              color: 'var(--color-text-dark)',
              lineHeight: '1.5'
            }}>
              {questionData.explanation}
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={handleContinue}
            style={{
              alignSelf: 'flex-end',
              padding: '0.8rem 2rem',
              fontSize: '0.95rem'
            }}
          >
            Continue
          </button>
        </div>
      )}

      <style>{`
        .target-slot.incorrect {
          border-color: var(--color-incorrect) !important;
          background-color: #FDF3F2 !important;
          box-shadow: var(--shadow-danger) !important;
        }
      `}</style>
    </div>
  );
};
