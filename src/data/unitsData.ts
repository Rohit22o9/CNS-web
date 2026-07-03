export interface MCQQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FillBlankQuestion {
  question: string;
  answers: string[]; // Acceptable answers (case-insensitive)
  hint: string;
  explanation: string;
}

export interface DragDropTextQuestion {
  // A string with placeholders like {0}, {1} for blanks
  textTemplate: string;
  blanks: string[]; // Correct answers in order
  options: string[]; // Draggable options (including distractors)
  explanation: string;
}

export interface ImageTarget {
  id: string;
  label: string;
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
}

export interface DragDropImageQuestion {
  imageType: 'topologies' | 'osi_model' | 'communication_model' | 'sliding_window' | 'security_attacks' | 'frame_structure' | 'stop_wait_timing' | 'network_path' | 'ipv4_format' | 'three_way_handshake' | 'tcp_header' | 'web_request' | 'http_flow';
  title: string;
  labels: string[]; // Draggable labels
  targets: ImageTarget[]; // Target slots
  explanation: string;
}

export interface MatchPairItem {
  left: string;
  right: string;
}

export interface MatchPairsQuestion {
  pairs: MatchPairItem[];
  explanation: string;
}

export interface NumericalQuestion {
  question: string;
  correctAnswer: string;
  formula?: string;
  steps: string[];
  explanation: string;
}

export interface UnitData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string; // Theme color (blue, green, orange, etc.)
  progress: number;
  mcqs: MCQQuestion[];
  fillBlanks: FillBlankQuestion[];
  dragText: DragDropTextQuestion[];
  dragImage: DragDropImageQuestion[];
  matchPairs: MatchPairsQuestion[];
  numericals: NumericalQuestion[];
}

export const unitsData: UnitData[] = [
  {
    id: 1,
    title: "Introduction to Computer Network & Physical Layer",
    subtitle: "Unit 1",
    description: "Explore topologies, transmission media (fiber, coax), OSI/TCP-IP layers, Nyquist/Shannon limit, and transmission rates.",
    icon: "Network",
    color: "#4F9DFF", // Sky Blue
    progress: 0,
    mcqs: [
      {
        question: "What is the primary function of the Physical Layer in the OSI model?",
        options: [
          "Routing packets between networks",
          "Transmission of raw bits over a communication medium",
          "Error correction at the data link level",
          "Managing sessions between applications"
        ],
        correctIndex: 1,
        explanation: "The Physical Layer is the first (lowest) layer of the OSI model. Its primary function is the mechanical, electrical, and procedural interface to transmit raw, unstructured bit streams over a physical communication medium."
      },
      {
        question: "Which network topology connects all devices to a single central node?",
        options: [
          "Bus",
          "Ring",
          "Star",
          "Mesh"
        ],
        correctIndex: 2,
        explanation: "In a Star topology, all devices are connected directly to a central node (a switch or hub). All data transmissions go through this central hub, which acts as the coordinator."
      },
      {
        question: "Which transmission mode allows data to flow in both directions simultaneously?",
        options: [
          "Simplex",
          "Half-duplex",
          "Full-duplex",
          "None of these"
        ],
        correctIndex: 2,
        explanation: "Full-duplex mode enables simultaneous bidirectional communication, allowing both communicating devices to transmit and receive data at the exact same time (like a telephone conversation)."
      },
      {
        question: "Which of the following is an example of guided transmission media?",
        options: [
          "Radio waves",
          "Microwave",
          "Fiber optic cable",
          "Satellite link"
        ],
        correctIndex: 2,
        explanation: "Guided media direct signals along a physical solid conduit (like twisted pair, coaxial, or fiber optic cables). Radio, microwave, and satellite links propagate wirelessly in space (unguided media)."
      }
    ],
    fillBlanks: [
      {
        question: "The __________ layer is responsible for the mechanical, electrical, and procedural interface to the transmission medium.",
        answers: ["Physical"],
        hint: "It represents Layer 1 of the OSI model.",
        explanation: "The Physical Layer defines the specifications for devices, connectors, cables, voltage ranges, and bit-level transmissions."
      },
      {
        question: "A __________ topology has a single point of failure at the central connecting device.",
        answers: ["Star"],
        hint: "Devices are arranged like points of a star branching from a hub.",
        explanation: "In a Star topology, if the central hub or switch fails, all nodes disconnected from it can no longer communicate, making it a single point of failure."
      },
      {
        question: "The basic unit of data handled at the physical layer is called a __________.",
        answers: ["bit", "bits"],
        hint: "The smallest unit of computer data (0 or 1).",
        explanation: "The Physical Layer handles raw binary digits (bits: 0s and 1s) sent over the physical medium."
      },
      {
        question: "__________ cable transmits data using pulses of light through a glass or plastic core.",
        answers: ["Fiber optic", "Fiber-optic", "Optical fiber"],
        hint: "Uses glass cores to guide light wave signals.",
        explanation: "Fiber optic cables carry data encoded in light pulses through long glass threads, offering massive bandwidth and total immunity to electrical interference."
      }
    ],
    dragText: [
      {
        textTemplate: "{0} is the maximum rate at which data can be transferred over a communication channel, measured in bits per second.",
        blanks: ["Bandwidth"],
        options: ["Bandwidth", "Latency", "Jitter"],
        explanation: "Bandwidth defines the transmission capacity of a communication channel. Higher bandwidth means more bits per second can be sent."
      },
      {
        textTemplate: "{0} refers to the time delay experienced as data travels from source to destination.",
        blanks: ["Latency"],
        options: ["Throughput", "Latency", "Attenuation"],
        explanation: "Latency represents the transit time or time delay for a data packet to travel across a network from sender to receiver."
      }
    ],
    dragImage: [
      {
        imageType: "topologies",
        title: "Identify Network Topologies",
        labels: ["Star", "Bus", "Ring", "Mesh"],
        targets: [
          { id: "bus", label: "Bus", x: 18, y: 70 },
          { id: "star", label: "Star", x: 50, y: 30 },
          { id: "ring", label: "Ring", x: 82, y: 70 },
          { id: "mesh", label: "Mesh", x: 50, y: 80 }
        ],
        explanation: "Bus uses a single line backbone. Star centers on a hub. Ring creates a circular sequence loop. Mesh links every device to all other nodes."
      },
      {
        imageType: "communication_model",
        title: "Basic Data Communication System Model",
        labels: ["Transmitter", "Transmission Medium", "Receiver"],
        targets: [
          { id: "tx", label: "Transmitter", x: 27.5, y: 50 },
          { id: "channel", label: "Transmission Medium", x: 50, y: 50 },
          { id: "rx", label: "Receiver", x: 72.5, y: 50 }
        ],
        explanation: "In a basic data communication system, data flows from the Sender through the Transmitter (modulator), travels over the Transmission Medium, is processed by the Receiver (demodulator), and reaches the Destination."
      }
    ],
    matchPairs: [
      {
        pairs: [
          { left: "Twisted Pair Cable", right: "Guided transmission medium" },
          { left: "Microwave", right: "Unguided transmission medium" },
          { left: "Attenuation", right: "Loss of signal strength over distance" },
          { left: "Multiplexing", right: "Combining multiple signals onto one channel" }
        ],
        explanation: "Twisted pair copper lines represent guided physical media. Microwave is wireless unguided propagation. Attenuation refers to the signal degrading as it travels over distances. Multiplexing allows sharing a channel by combining multiple feeds."
      }
    ],
    numericals: [
      {
        question: "If the available bandwidth is 10 Mbps and a file size is 25 MB, calculate the approximate time required to transmit the file (ignore overhead) in seconds.",
        correctAnswer: "20",
        formula: "Transmission Time = File Size (bits) / Bandwidth (bps)",
        steps: [
          "Convert file size to bits: 25 MB = 25 * 8 = 200 Megabits.",
          "Identify Bandwidth: 10 Mbps.",
          "Calculate time: 200 Megabits / 10 Mbps = 20 seconds.",
          "Note: If using binary MB (2^20 bytes), the calculation is 25 * 8 * 1,048,576 bits / 10,000,000 bps = 20.97 seconds (rounded to 20 or 21 seconds)."
        ],
        explanation: "By dividing the file size in bits (200,000,000 bits) by the data rate (10,000,000 bps), we find the transmission delay is approximately 20 seconds."
      },
      {
        question: "Convert a data rate of 2 Gbps into Mbps. (Enter only the numeric value in Mbps)",
        correctAnswer: "2000",
        steps: [
          "Identify input data rate: 2 Gbps.",
          "Recall conversion scale: 1 Gbps = 1000 Mbps (decimal) or 1024 Mbps (binary).",
          "Convert decimal: 2 * 1000 = 2000 Mbps.",
          "Convert binary: 2 * 1024 = 2048 Mbps. We accept both values!"
        ],
        explanation: "1 Gigabits per second converts to 1000 Megabits per second in networking decimal standards (or 1024 Mbps in binary), so 2 Gbps equals 2000 Mbps."
      },
      {
        question: "A signal travels a distance of 6000 km through a medium with propagation speed 2 * 10^8 m/s. Calculate the propagation delay in milliseconds (ms).",
        correctAnswer: "30",
        formula: "Propagation Delay = Distance / Propagation Speed",
        steps: [
          "Identify distance: d = 6000 km = 6,000,000 meters.",
          "Identify speed: v = 2 * 10^8 m/s = 200,000,000 m/s.",
          "Calculate delay: 6,000,000 / 200,000,000 = 0.03 seconds.",
          "Convert to milliseconds: 0.03 * 1000 = 30 ms."
        ],
        explanation: "Propagation delay measures the transit time for a signal. Distance (6 * 10^6 m) divided by speed (2 * 10^8 m/s) is 0.03 seconds, which converts to 30 milliseconds."
      },
      {
        question: "Compare baseband and broadband transmissions. (Submit any text to review the comparative analysis)",
        correctAnswer: "baseband",
        steps: [
          "Baseband transmission: Digital signals sent directly over the medium. Uses the entire channel bandwidth for a single signal at a time (e.g. Ethernet LAN).",
          "Broadband transmission: Analog signals modulated over multiple carrier frequencies. Divides bandwidth into multiple logical channels using Frequency Division Multiplexing (FDM) (e.g. DSL, Cable TV)."
        ],
        explanation: "Baseband sends raw, unmodulated digital signals, occupying the entire frequency spectrum of the link for a single channel. Broadband modulates signals onto separate higher carrier frequencies, allowing multiple independent channels to transmit simultaneously."
      }
    ]
  },
  {
    id: 2,
    title: "Data Link Layer",
    subtitle: "Unit 2",
    description: "Learn about framing, error control (CRC, Hamming), flow control (Stop & Wait, sliding windows), and MAC protocols (ALOHA, CSMA).",
    icon: "Layers",
    color: "#E8F8F0", // Soft Green
    progress: 0,
    mcqs: [
      {
        question: "Which sublayer of the Data Link Layer deals with MAC addressing and channel access?",
        options: ["LLC (Logical Link Control)", "MAC (Media Access Control)", "Network sublayer", "Physical sublayer"],
        correctIndex: 1,
        explanation: "The MAC (Media Access Control) sublayer handles physical addressing (MAC addresses), frame encapsulation, and sharing access to the physical transmission medium."
      },
      {
        question: "Which error-detection technique uses polynomial division on the transmitted data?",
        options: ["Parity check", "Checksum", "Cyclic Redundancy Check (CRC)", "Hamming code"],
        correctIndex: 2,
        explanation: "Cyclic Redundancy Check (CRC) is a highly reliable error-detection code that uses polynomial modulo-2 division to compute a remainder (checksum) appended to the frame."
      },
      {
        question: "What is the main purpose of framing in the Data Link Layer?",
        options: ["Assigning IP addresses", "Marking the start and end of a data unit for transmission", "Determining the shortest routing path", "Controlling network congestion"],
        correctIndex: 1,
        explanation: "Framing encapsulates network-layer packets into frames by adding specialized header and trailer start/end delimiters to demarcate transmission blocks."
      },
      {
        question: "Which protocol allows the sender to transmit multiple frames before requiring an acknowledgment?",
        options: ["Stop-and-Wait ARQ", "Sliding Window protocol", "ALOHA", "CSMA/CD"],
        correctIndex: 1,
        explanation: "Sliding Window protocols (like Go-Back-N and Selective Repeat) allow the sender to transmit multiple unacknowledged frames up to the window size before stopping to wait for ACKs."
      }
    ],
    fillBlanks: [
      {
        question: "The Data Link Layer is divided into the __________ sublayer and the MAC (Media Access Control) sublayer.",
        answers: ["LLC", "Logical Link Control"],
        hint: "This sublayer manages flow control, error checking, and packet demultiplexing.",
        explanation: "The Data Link Layer is divided into LLC (Logical Link Control) and MAC (Media Access Control) sublayers under IEEE 802 standards."
      },
      {
        question: "__________ is an error-detection method that appends redundant bits computed via polynomial division.",
        answers: ["CRC", "Cyclic Redundancy Check"],
        hint: "Abbreviation for Cyclic Redundancy Check.",
        explanation: "Cyclic Redundancy Check (CRC) relies on polynomial division to compute redundant bits that are checked by the receiver to catch transmission errors."
      },
      {
        question: "In the __________ protocol, the sender transmits one frame and waits for an acknowledgment before sending the next.",
        answers: ["Stop-and-Wait", "Stop and Wait"],
        hint: "Two actions: first halt, then listen.",
        explanation: "Stop-and-Wait is a simple flow control protocol where the sender handles exactly one frame at a time, blocking further transmissions until an ACK is received."
      },
      {
        question: "A __________ address is a unique 48-bit identifier assigned to a network interface card.",
        answers: ["MAC"],
        hint: "Also known as the physical hardware address.",
        explanation: "A MAC (Media Access Control) address is a permanent 48-bit address burned into network adapters to uniquely identify devices at Layer 2."
      }
    ],
    dragText: [
      {
        textTemplate: "{0} control ensures that a fast sender does not overwhelm a slower receiver with data.",
        blanks: ["Flow"],
        options: ["Flow", "Access", "Congestion"],
        explanation: "Flow control prevents a fast transmitter from overflowing a slow receiver's buffer space by regulating data sending rates."
      },
      {
        textTemplate: "A {0} occurs when two or more devices transmit on a shared medium at the same time, corrupting the signals.",
        blanks: ["Collision"],
        options: ["Collision", "Handshake", "Checksum"],
        explanation: "A collision occurs when signals from multiple stations overlap on a shared channel, resulting in corrupted data frames."
      }
    ],
    dragImage: [
      {
        imageType: "frame_structure",
        title: "Identify Data Frame Structure Fields",
        labels: ["Header", "Data/Payload", "Trailer"],
        targets: [
          { id: "hdr", label: "Header", x: 20, y: 50 },
          { id: "payload", label: "Data/Payload", x: 50, y: 50 },
          { id: "trl", label: "Trailer", x: 80, y: 50 }
        ],
        explanation: "A standard Layer 2 frame has a Header (source/destination MAC, control flags), the Payload (IP packet), and a Trailer (error checks like CRC)."
      },
      {
        imageType: "stop_wait_timing",
        title: "Identify Steps in Stop-and-Wait Sequence",
        labels: ["Sender transmits Frame", "Receiver sends ACK", "Sender waits for timeout", "Sender transmits next Frame"],
        targets: [
          { id: "tx_frame", label: "Sender transmits Frame", x: 50, y: 22 },
          { id: "rx_ack", label: "Receiver sends ACK", x: 50, y: 50 },
          { id: "timeout", label: "Sender waits for timeout", x: 18, y: 35 },
          { id: "tx_next", label: "Sender transmits next Frame", x: 50, y: 78 }
        ],
        explanation: "The Stop-and-Wait sequence shows the sender transmitting a frame, waiting for a response, the receiver replying with an ACK, and the sender sending the next frame."
      }
    ],
    matchPairs: [
      {
        pairs: [
          { left: "CRC", right: "Error detection technique" },
          { left: "Hamming Code", right: "Error correction technique" },
          { left: "CSMA/CD", right: "Collision detection on shared medium" },
          { left: "Sliding Window Protocol", right: "Flow control technique" }
        ],
        explanation: "CRC detects errors using polynomial binary division. Hamming Code detects and corrects single-bit errors. CSMA/CD listens to detect collisions on shared lines (Ethernet). Sliding Window protocols manage transmission flows using dynamic buffer sizing."
      }
    ],
    numericals: [
      {
        question: "For the dataword 1101011011 and generator polynomial 1011, determine the CRC remainder that would be appended to form the codeword.",
        correctAnswer: "100",
        steps: [
          "Append r = 3 zero bits to the 10-bit dataword to get dividend: 1101011011000.",
          "Perform modulo-2 division of 1101011011000 by 1011 divisor.",
          "Perform XOR division steps: 1101 XOR 1011 = 110. Pull down 0 -> 1100 XOR 1011 = 111. Pull down 1 -> 1111 XOR 1011 = 100. Pull down 1 -> 1001 XOR 1011 = 10.",
          "Continue binary division steps until all bits are divided.",
          "The division leaves a final remainder of 100."
        ],
        explanation: "Modulo-2 division of 1101011011000 by 1011 yields a remainder of 100. The full codeword sent is 1101011011100."
      },
      {
        question: "In a Hamming code scheme protecting 8 data bits, calculate the minimum number of redundant (parity) bits required.",
        correctAnswer: "4",
        formula: "2^r >= d + r + 1",
        steps: [
          "Let d = 8 (number of data bits). We test values of redundant bits r in the equation: 2^r >= 8 + r + 1.",
          "Test r = 3: 2^3 = 8. 8 + 3 + 1 = 12. 8 >= 12 is False.",
          "Test r = 4: 2^4 = 16. 8 + 4 + 1 = 13. 16 >= 13 is True.",
          "The minimum number of redundant bits r is 4."
        ],
        explanation: "For 8 data bits, 4 parity bits are needed since 2^4 (16) is the smallest power of 2 greater than or equal to 8 + 4 + 1 (13)."
      },
      {
        question: "A Stop-and-Wait protocol has a round-trip time (RTT) of 20 ms and a frame transmission time of 5 ms. Calculate the channel efficiency in percent (%) (Enter number only).",
        correctAnswer: "20",
        formula: "Efficiency = Tx / (Tx + RTT)",
        steps: [
          "Identify transmission time (Tx) = 5 ms.",
          "Identify round-trip time (RTT) = 20 ms.",
          "Total frame cycle time = Tx + RTT = 5 ms + 20 ms = 25 ms.",
          "Efficiency = Tx / (Tx + RTT) = 5 / 25 = 0.20.",
          "Convert to percentage: 0.20 * 100 = 20%."
        ],
        explanation: "Channel efficiency is the ratio of transmission time to total time. Here, efficiency = 5 / (5 + 20) = 20%."
      },
      {
        question: "Given even parity, determine whether the received byte 10110101 contains a detectable error. (Enter 'yes' or 'no')",
        correctAnswer: "yes",
        steps: [
          "Count the number of 1s in the received byte 10110101: 1 + 0 + 1 + 1 + 0 + 1 + 0 + 1 = 5.",
          "Identify the parity scheme: Even Parity (requires an even number of 1s).",
          "Compare: 5 is an odd number, violating the even parity constraint.",
          "Since there is an odd number of 1s, an error is detected. Answer: yes."
        ],
        explanation: "Even parity requires that the total count of 1s in any received block must be even. The byte 10110101 contains five 1s, which is odd. Thus, an error is successfully detected."
      }
    ]
  },
  {
    id: 3,
    title: "Network Layer",
    subtitle: "Unit 3",
    description: "Understand routing, IP addressing (IPv4, IPv6), subnetting, congestion control, and protocols like RIP, OSPF, and BGP.",
    icon: "Network",
    color: "#EAF4FF", // Soft Blue
    progress: 0,
    mcqs: [
      {
        question: "Which protocol is used to find the MAC address corresponding to a known IP address?",
        options: ["DNS", "ARP", "ICMP", "DHCP"],
        correctIndex: 1,
        explanation: "ARP (Address Resolution Protocol) is used to find the physical MAC address corresponding to a known IP address."
      },
      {
        question: "Which routing approach requires each router to have complete knowledge of the network topology?",
        options: ["Distance vector routing", "Link state routing", "Static routing", "Flooding"],
        correctIndex: 1,
        explanation: "Link state routing requires every router to have complete knowledge of the network topology to build a local map and run Dijkstra's algorithm."
      },
      {
        question: "How many bits make up a standard IPv4 address?",
        options: ["16", "32", "48", "64"],
        correctIndex: 1,
        explanation: "A standard IPv4 address is composed of 32 bits (4 octets)."
      },
      {
        question: "Which protocol is primarily used for error reporting and diagnostics (e.g., the 'ping' command) in IP networks?",
        options: ["ICMP", "ARP", "TCP", "UDP"],
        correctIndex: 0,
        explanation: "ICMP (Internet Control Message Protocol) is used by network devices to send error messages and operational information (like ping results)."
      }
    ],
    fillBlanks: [
      {
        question: "__________ is the process of selecting the best path for data to travel from source to destination across networks.",
        answers: ["routing"],
        hint: "Selecting paths in a network.",
        explanation: "Routing is the process of selecting the path for traffic in a network or across multiple networks."
      },
      {
        question: "A __________ stores the best known paths to various network destinations for a router.",
        answers: ["routing table"],
        hint: "A table stored in a router.",
        explanation: "A routing table stores the list of routes and destinations to help the router determine where to forward packets."
      },
      {
        question: "__________ divides a large network into smaller, more manageable sub-networks.",
        answers: ["subnetting"],
        hint: "Splitting IP networks.",
        explanation: "Subnetting is the practice of dividing a network into two or more smaller networks."
      },
      {
        question: "The __________ protocol resolves a known IP address into its corresponding physical (MAC) address.",
        answers: ["arp", "address resolution protocol"],
        hint: "Acronym for resolving IP to MAC.",
        explanation: "The Address Resolution Protocol (ARP) translates a network layer IP address to a link layer physical MAC address."
      }
    ],
    dragText: [
      {
        textTemplate: "{0} is a connectionless network-layer protocol responsible for addressing and routing packets across networks.",
        blanks: ["IP (Internet Protocol)"],
        options: ["IP (Internet Protocol)", "TCP", "HTTP"],
        explanation: "IP (Internet Protocol) is the primary network-layer protocol responsible for logical addressing and packet routing."
      },
      {
        textTemplate: "The {0} algorithm computes the shortest path to every node using complete topology information, typically via Dijkstra's method.",
        blanks: ["Link State"],
        options: ["Distance Vector", "Link State", "Flooding"],
        explanation: "Link State routing algorithms compute shortest paths using global topology knowledge, usually via Dijkstra's algorithm."
      }
    ],
    dragImage: [
      {
        imageType: "network_path",
        title: "Identify Network Path Nodes",
        labels: ["Source Host", "Router", "Destination Host"],
        targets: [
          { id: "src_host", label: "Source Host", x: 20, y: 50 },
          { id: "router", label: "Router", x: 50, y: 50 },
          { id: "dest_host", label: "Destination Host", x: 80, y: 50 }
        ],
        explanation: "In network routing, data moves from the Source Host, through an intermediate Router (or default gateway), to the Destination Host."
      },
      {
        imageType: "ipv4_format",
        title: "Identify IPv4 Address Portions",
        labels: ["Network ID", "Host ID"],
        targets: [
          { id: "net_id", label: "Network ID", x: 37, y: 50 },
          { id: "host_id", label: "Host ID", x: 77, y: 50 }
        ],
        explanation: "An IP address is split into two parts: the Network ID (identifying the specific network segment) and the Host ID (identifying the specific host on that segment)."
      }
    ],
    matchPairs: [
      {
        pairs: [
          { left: "ARP", right: "Resolves IP address to MAC address" },
          { left: "RIP", right: "Distance vector routing protocol" },
          { left: "OSPF", right: "Link state routing protocol" },
          { left: "ICMP", right: "Error reporting and diagnostics" }
        ],
        explanation: "ARP maps IP addresses to MAC addresses; RIP uses hop-count (distance vector); OSPF builds topology maps (link state); ICMP handles error messages."
      }
    ],
    numericals: [
      {
        question: "Determine the subnet mask required for a network that must support at least 50 usable host addresses.",
        correctAnswer: "255.255.255.192",
        steps: [
          "Find host bits needed: 2^h - 2 >= 50. Smallest h is 6 since 2^6 - 2 = 62 hosts.",
          "Calculate network bits: 32 - 6 = 26 bits (/26 prefix).",
          "Convert /26 to dotted decimal: 255.255.255.192."
        ],
        explanation: "Supporting 50 hosts requires 6 host bits (62 usable addresses). The remaining 26 bits form the network prefix, yielding a subnet mask of 255.255.255.192."
      },
      {
        question: "For the network 192.168.10.0/24, calculate the total number of usable host addresses.",
        correctAnswer: "254",
        formula: "Usable Hosts = 2^(32 - CIDR) - 2",
        steps: [
          "Identify host bits: 32 - 24 = 8 bits.",
          "Calculate total addresses: 2^8 = 256.",
          "Subtract 2 for network ID and broadcast addresses: 256 - 2 = 254."
        ],
        explanation: "A standard /24 block contains 256 total IP addresses. Subtracting the network address and broadcast address yields 254 usable host addresses."
      },
      {
        question: "If 3 bits are borrowed from the host portion of a /24 network for subnetting, calculate the number of subnets created and the number of usable hosts per subnet. (Format: X subnets, Y hosts)",
        correctAnswer: "8 subnets, 30 hosts",
        steps: [
          "Calculate subnets: 2^3 borrowed bits = 8 subnets.",
          "Remaining host bits: 8 original host bits - 3 borrowed bits = 5 host bits.",
          "Calculate usable hosts per subnet: 2^5 - 2 = 30 hosts."
        ],
        explanation: "Borrowing 3 bits yields 2^3 = 8 subnets. With 5 bits remaining for hosts, each subnet supports 2^5 - 2 = 30 usable host addresses."
      },
      {
        question: "Given a distance vector table where Router A shows a cost of 4 to Router C via Router B, and Router B advertises a new cost of 2 to Router C, calculate Router A's updated shortest path cost to Router C. (Assume link cost between A and B is 2)",
        correctAnswer: "4",
        steps: [
          "Identify old cost to C via B: 4. Since link A-B is 2, B's old cost to C was 2.",
          "B advertises new cost to C: 2.",
          "Apply Bellman-Ford equation: Cost(A to C via B) = LinkCost(A to B) + AdvertisedCost(B to C) = 2 + 2 = 4."
        ],
        explanation: "By the Bellman-Ford algorithm, Router A updates its path cost to Router C via neighbor B: Cost(A to C via B) = LinkCost(A to B) + AdvertisedCost(B to C) = 2 + 2 = 4."
      }
    ]
  },
  {
    id: 4,
    title: "Transport Layer Protocols",
    subtitle: "Unit 4",
    description: "Study connection-oriented TCP, connectionless UDP, the 3-way handshake, flow control, and TCP congestion window phases.",
    icon: "Layers",
    color: "#FFF4E5", // Light Orange
    progress: 0,
    mcqs: [
      {
        question: "Which transport layer protocol is connection-oriented and guarantees reliable delivery?",
        options: ["UDP", "IP", "TCP", "ICMP"],
        correctIndex: 2,
        explanation: "TCP (Transmission Control Protocol) is connection-oriented, providing reliable, ordered, and error-checked delivery of a stream of octets between applications."
      },
      {
        question: "Which mechanism does TCP use to establish a connection before data transfer begins?",
        options: ["Two-way handshake", "Three-way handshake", "Four-way handshake", "No handshake required"],
        correctIndex: 1,
        explanation: "TCP uses a three-way handshake (SYN, SYN-ACK, ACK) to establish a connection and synchronize sequence numbers before sending payload data."
      },
      {
        question: "What is the size of the UDP header?",
        options: ["8 bytes", "12 bytes", "20 bytes", "24 bytes"],
        correctIndex: 0,
        explanation: "A standard UDP header is fixed at 8 bytes, containing source port, destination port, length, and checksum fields."
      },
      {
        question: "Which TCP mechanism adjusts the sender's transmission rate to prevent overwhelming the network?",
        options: ["Flow control", "Congestion control", "Error control", "Framing"],
        correctIndex: 1,
        explanation: "Congestion control (such as slow start and congestion avoidance) adjusts the sender's transmission rate to prevent overwhelming intermediate routers and links in the network."
      }
    ],
    fillBlanks: [
      {
        question: "__________ is a connectionless transport layer protocol that does not guarantee delivery.",
        answers: ["udp", "user datagram protocol"],
        hint: "Usually a 3-letter acronym.",
        explanation: "User Datagram Protocol (UDP) is a connectionless, lightweight transport protocol that doesn't guarantee delivery or ordering."
      },
      {
        question: "TCP establishes a reliable connection using a __________ handshake.",
        answers: ["three-way", "3-way"],
        hint: "Number of steps in the process.",
        explanation: "TCP uses a three-way handshake (SYN -> SYN-ACK -> ACK) to initialize transmission state between hosts."
      },
      {
        question: "A __________ number identifies a specific process or application running on a host.",
        answers: ["port"],
        hint: "A logical 16-bit address for processes.",
        explanation: "A port number is used in transport layer headers to direct incoming traffic to the correct software process or service."
      },
      {
        question: "__________ control in TCP prevents the sender from injecting too much data into the network, causing overload.",
        answers: ["congestion"],
        hint: "Related to network capacity, not receiver buffers.",
        explanation: "Congestion control regulates traffic rate based on network load and packet loss indicators, preventing intermediate queue collapse."
      }
    ],
    dragText: [
      {
        textTemplate: "{0} ensures reliable, ordered, and error-checked delivery of a stream of data between applications.",
        blanks: ["TCP"],
        options: ["TCP", "UDP", "IP"],
        explanation: "Transmission Control Protocol (TCP) provides full reliability, sequence ordering, and error correction for applications."
      },
      {
        textTemplate: "{0} is preferred for applications like video streaming and online gaming where speed matters more than guaranteed delivery.",
        blanks: ["UDP"],
        options: ["UDP", "TCP", "ARP"],
        explanation: "User Datagram Protocol (UDP) has low overhead and no retransmission delays, making it ideal for real-time traffic."
      }
    ],
    dragImage: [
      {
        imageType: "three_way_handshake",
        title: "Identify TCP Three-Way Handshake Steps",
        labels: ["SYN", "SYN-ACK", "ACK"],
        targets: [
          { id: "step1", label: "SYN", x: 50, y: 25 },
          { id: "step2", label: "SYN-ACK", x: 50, y: 55 },
          { id: "step3", label: "ACK", x: 50, y: 85 }
        ],
        explanation: "The connection starts with a SYN from client to server, followed by a SYN-ACK back to the client, and completed by an ACK from client to server."
      },
      {
        imageType: "tcp_header",
        title: "Identify TCP Header Fields",
        labels: ["Source Port", "Destination Port", "Sequence Number", "Checksum"],
        targets: [
          { id: "src_port", label: "Source Port", x: 26, y: 28 },
          { id: "dest_port", label: "Destination Port", x: 76, y: 28 },
          { id: "seq_num", label: "Sequence Number", x: 50, y: 52 },
          { id: "checksum", label: "Checksum", x: 26, y: 82 }
        ],
        explanation: "The first word of the TCP header contains 16-bit Source and Destination ports. The next contains the 32-bit Sequence Number. The Checksum is located in the 5th word (lower half)."
      }
    ],
    matchPairs: [
      {
        pairs: [
          { left: "TCP", right: "Reliable, connection-oriented delivery" },
          { left: "UDP", right: "Connectionless, fast delivery" },
          { left: "Three-Way Handshake", right: "Connection establishment process" },
          { left: "Congestion Control", right: "Prevents network overload" }
        ],
        explanation: "TCP guarantees delivery; UDP is designed for speed/connectionless flow; 3-way handshake builds the connection; congestion control avoids overload."
      }
    ],
    numericals: [
      {
        question: "Given a TCP window size of 4000 bytes and a segment size of 1000 bytes, calculate the number of segments that can be sent in one window before requiring an acknowledgment. (Enter integer only)",
        correctAnswer: "4",
        steps: [
          "Identify total window size: 4000 bytes.",
          "Identify Maximum Segment Size (MSS): 1000 bytes.",
          "Calculate: number of segments = Window Size / MSS = 4000 / 1000 = 4."
        ],
        explanation: "The sender can transmit up to one full window of data. Dividing 4000 bytes by the segment size of 1000 bytes yields 4 segments."
      },
      {
        question: "Calculate the theoretical maximum throughput for a connection with a window size of 64 KB and a round-trip time (RTT) of 100 ms. (Format: X.XX Mbps)",
        correctAnswer: "5.24 Mbps",
        steps: [
          "Convert window size 64 KB to bits: 64 * 1024 * 8 = 524,288 bits.",
          "Convert RTT to seconds: 100 ms = 0.1 seconds.",
          "Calculate throughput: 524,288 bits / 0.1 seconds = 5,242,880 bps.",
          "Convert to Mbps: 5,242,880 bps / 1,000,000 = 5.24 Mbps (approx)."
        ],
        explanation: "Throughput is limited by Window Size / RTT. 64 KB = 524,288 bits. Dividing by 0.1 seconds gives 5,242,880 bps, or 5.24 Mbps."
      },
      {
        question: "If TCP data transfer starts at sequence number 1000 and three segments of 500 bytes each are sent, determine the sequence number of the next segment. (Enter integer only)",
        correctAnswer: "2500",
        steps: [
          "Identify starting sequence number: 1000.",
          "Calculate total bytes sent: 3 segments * 500 bytes = 1500 bytes.",
          "Calculate next sequence number: 1000 + 1500 = 2500."
        ],
        explanation: "Each byte of data consumed increments the sequence number. 1500 bytes of data sent starting at 1000 means the next segment will begin at sequence number 2500."
      },
      {
        question: "Compare the total header overhead of sending 100 packets using TCP (20-byte header) versus UDP (8-byte header), and calculate the difference in bytes. (Enter integer only)",
        correctAnswer: "1200",
        steps: [
          "Calculate TCP total overhead: 100 packets * 20 bytes = 2000 bytes.",
          "Calculate UDP total overhead: 100 packets * 8 bytes = 800 bytes.",
          "Find the difference: 2000 bytes - 800 bytes = 1200 bytes."
        ],
        explanation: "TCP headers are 20 bytes (2000 bytes total for 100 packets), and UDP headers are 8 bytes (800 bytes total). The overhead difference is 1200 bytes."
      }
    ]
  },
  {
    id: 5,
    title: "Application Layer",
    subtitle: "Unit 5",
    description: "Understand application protocols (DNS, HTTP, SMTP), firewalls, public-key cryptography (RSA), and malicious security attacks.",
    icon: "Shield",
    color: "#DFF6FF", // Light Cyan
    progress: 0,
    mcqs: [
      {
        question: "Which protocol is used for sending email messages between mail servers?",
        options: ["POP3", "IMAP", "SMTP", "FTP"],
        correctIndex: 2,
        explanation: "SMTP (Simple Mail Transfer Protocol) is the standard protocol for sending emails between mail servers."
      },
      {
        question: "Which default port number does HTTP use?",
        options: ["21", "25", "80", "443"],
        correctIndex: 2,
        explanation: "By default, unencrypted HTTP traffic uses TCP port 80."
      },
      {
        question: "What does DNS primarily resolve a domain name into?",
        options: ["A MAC address", "An IP address", "A port number", "A subnet mask"],
        correctIndex: 1,
        explanation: "DNS (Domain Name System) maps human-readable domain names to numerical IP addresses."
      },
      {
        question: "Which protocol is used to transfer files between a client and a server?",
        options: ["HTTP", "FTP", "SMTP", "ARP"],
        correctIndex: 1,
        explanation: "FTP (File Transfer Protocol) is designed specifically for transferring files between a client and a server over a network."
      }
    ],
    fillBlanks: [
      {
        question: "__________ translates human-readable domain names into numeric IP addresses.",
        answers: ["dns", "domain name system"],
        hint: "Usually a 3-letter acronym.",
        explanation: "The Domain Name System (DNS) translates easy-to-remember domain names to numerical IP addresses."
      },
      {
        question: "__________ is the protocol used by an email client to retrieve messages from a mail server.",
        answers: ["pop3", "imap", "pop", "internet message access protocol", "post office protocol"],
        hint: "Two common examples are POP3 and IMAP.",
        explanation: "Email clients retrieve messages from a mail server using either POP3 (Post Office Protocol 3) or IMAP (Internet Message Access Protocol)."
      },
      {
        question: "__________ is used for secure, encrypted web browsing between client and server.",
        answers: ["https"],
        hint: "Add an 'S' to HTTP.",
        explanation: "HTTPS (Hypertext Transfer Protocol Secure) provides secure web communication by encrypting HTTP traffic using TLS/SSL."
      },
      {
        question: "__________ dynamically assigns IP addresses and other configuration to hosts joining a network.",
        answers: ["dhcp", "dynamic host configuration protocol"],
        hint: "Usually a 4-letter acronym.",
        explanation: "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses and other network parameters to client devices."
      }
    ],
    dragText: [
      {
        textTemplate: "{0} is the protocol used by web browsers to request and receive web pages.",
        blanks: ["HTTP"],
        options: ["HTTP", "FTP", "SMTP"],
        explanation: "HTTP (Hypertext Transfer Protocol) is the foundational protocol used by the World Wide Web to request and transmit web pages."
      },
      {
        textTemplate: "{0} automatically assigns IP addresses to devices when they join a network.",
        blanks: ["DHCP"],
        options: ["DHCP", "DNS", "ARP"],
        explanation: "DHCP automatically configures network interfaces on host devices by leasing them temporary IP addresses."
      }
    ],
    dragImage: [
      {
        imageType: "web_request",
        title: "Identify Web Request Positions",
        labels: ["Client", "DNS Server", "Web Server"],
        targets: [
          { id: "client", label: "Client", x: 16, y: 50 },
          { id: "dns", label: "DNS Server", x: 50, y: 30 },
          { id: "web_server", label: "Web Server", x: 84, y: 50 }
        ],
        explanation: "A client first queries the DNS Server for IP resolution, then connects directly to the Web Server to retrieve content."
      },
      {
        imageType: "http_flow",
        title: "Identify HTTP Communication Flow",
        labels: ["Request", "Response"],
        targets: [
          { id: "request", label: "Request", x: 50, y: 35 },
          { id: "response", label: "Response", x: 50, y: 65 }
        ],
        explanation: "Under HTTP, communication consists of a Client-initiated Request followed by a Server-sent Response."
      }
    ],
    matchPairs: [
      {
        pairs: [
          { left: "HTTP", right: "Web page browsing protocol" },
          { left: "FTP", right: "File transfer protocol" },
          { left: "SMTP", right: "Email sending protocol" },
          { left: "DNS", right: "Domain name to IP resolution" }
        ],
        explanation: "HTTP is for web pages; FTP is for transferring files; SMTP is for sending emails; DNS resolves hostnames to IPs."
      }
    ],
    numericals: [
      {
        question: "If a DNS lookup takes 20 ms and the subsequent TCP handshake takes 30 ms, calculate the total delay before the first HTTP request can be sent. (Format: X ms)",
        correctAnswer: "50 ms",
        steps: [
          "DNS Lookup delay: 20 ms.",
          "TCP Handshake delay: 30 ms.",
          "Calculate total: 20 ms + 30 ms = 50 ms."
        ],
        explanation: "Before sending the HTTP request, the client must resolve the IP address via DNS (20 ms) and then establish a TCP connection (30 ms), summing up to 50 ms."
      },
      {
        question: "Calculate the time required to download a 5 MB file over an FTP connection with an effective bandwidth of 2 Mbps. (Format: X seconds)",
        correctAnswer: "20 seconds",
        steps: [
          "Convert 5 MB to bits: 5 * 8 = 40 Megabits.",
          "Bandwidth speed: 2 Mbps.",
          "Calculate download time: 40 Mb / 2 Mbps = 20 seconds."
        ],
        explanation: "5 MB is equivalent to 40 Megabits. Over a 2 Mbps connection, it takes 40 / 2 = 20 seconds."
      },
      {
        question: "A webpage requires 1 HTML request plus 3 embedded image requests, each needing a separate round trip (no pipelining, no persistent connection). If one RTT = 50 ms, calculate the total time to fully load the page. (Format: X ms)",
        correctAnswer: "400 ms",
        steps: [
          "Total objects to load: 1 HTML + 3 images = 4 objects.",
          "For non-persistent HTTP, each object requires 1 RTT for TCP + 1 RTT for HTTP = 2 RTTs.",
          "Total RTTs needed: 4 objects * 2 RTTs = 8 RTTs.",
          "Calculate total time: 8 RTTs * 50 ms = 400 ms."
        ],
        explanation: "Without persistent connections or pipelining, each object needs 2 RTTs (TCP connection + HTTP request/response). For 4 objects, this requires 8 RTTs, taking 400 ms."
      },
      {
        question: "Without caching, each web response takes 200 ms; with caching, a cached response takes 5 ms. Calculate the percentage of time saved per request when the content is served from cache. (Format: X.X%)",
        correctAnswer: "97.5%",
        steps: [
          "Calculate time saved: 200 ms - 5 ms = 195 ms.",
          "Calculate percentage: (195 ms / 200 ms) * 100 = 97.5%."
        ],
        explanation: "Serving content from cache saves 195 ms out of 200 ms, representing a time savings of 97.5%."
      }
    ]
  }
];
