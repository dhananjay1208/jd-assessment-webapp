import type { Question } from './quizTypes'

/**
 * The 25-question Block 1 and 2 assessment.
 * Balanced across the two blocks, 20 intermediate and 5 difficult.
 * One option per question is correct (a dev check enforces this).
 * Grounded in the workshop content. Proof-point questions cite sources.ts.
 */
export const QUESTIONS: Question[] = [
  // ============================ BLOCK 1 ============================
  {
    id: 'b1-iiot',
    block: 1,
    topic: 'Pillar: Industrial IoT',
    difficulty: 'intermediate',
    prompt:
      'Sensors on the machining-line spindles stream vibration and temperature data continuously. Which technology pillar is this?',
    options: [
      {
        text: 'Industrial IoT',
        correct: true,
        explanation:
          'Continuously connected sensors streaming machine-condition data are the heart of Industrial IoT, the data foundation for the rest.',
      },
      {
        text: 'Cloud Computing',
        correct: false,
        explanation:
          'Cloud is where data can be stored and processed, not the sensing of it on the machine.',
      },
      {
        text: 'Additive Manufacturing',
        correct: false,
        explanation:
          'Additive is 3D printing of parts and fixtures, not sensing.',
      },
      {
        text: 'Augmented and Virtual Reality',
        correct: false,
        explanation:
          'AR and VR overlay information for people, they do not stream machine data.',
      },
    ],
  },
  {
    id: 'b1-twin',
    block: 1,
    topic: 'Pillar: Digital Twin',
    difficulty: 'intermediate',
    prompt:
      'A live virtual model of the assembly line is used to test a line-balancing change before touching the floor. Which pillar is this?',
    options: [
      {
        text: 'Simulation and Digital Twin',
        correct: true,
        explanation:
          'A live model fed by real data that you test changes on safely is a digital twin. Siemens used one to cut a cycle time from 11 seconds to 8.',
      },
      {
        text: 'System Integration',
        correct: false,
        explanation:
          'Integration moves data between systems, it does not model the line.',
      },
      {
        text: 'Big Data and Analytics',
        correct: false,
        explanation:
          'Analytics finds patterns in data, it is not a live virtual model of the line.',
      },
      {
        text: 'Cybersecurity',
        correct: false,
        explanation:
          'Cybersecurity protects the systems, it does not simulate the line.',
      },
    ],
  },
  {
    id: 'b1-amr',
    block: 1,
    topic: 'Pillar: Autonomous Robots and AMRs',
    difficulty: 'intermediate',
    prompt:
      'Mobile robots navigate the floor on their own to deliver kitted parts to assembly stations. Which pillar is this?',
    options: [
      {
        text: 'Autonomous Robots and AMRs',
        correct: true,
        explanation:
          'Self-navigating mobile robots are AMRs. John Deere runs more than 100 of them on a private 5G network to move engines and components.',
      },
      {
        text: 'Industrial IoT',
        correct: false,
        explanation: 'IIoT is the sensing layer, not the moving robots.',
      },
      {
        text: 'System Integration',
        correct: false,
        explanation: 'Integration links systems, it does not move parts.',
      },
      {
        text: 'Big Data and Analytics',
        correct: false,
        explanation: 'Analytics reads data, it does not deliver parts.',
      },
    ],
    source: 'John Deere private 5G and smart factory coverage',
  },
  {
    id: 'b1-integration',
    block: 1,
    topic: 'Pillar: System Integration',
    difficulty: 'intermediate',
    prompt:
      'A customer order flows automatically from ERP to MES to the right station, and quality data flows back up without anyone re-typing it. Which pillar is this?',
    options: [
      {
        text: 'System Integration',
        correct: true,
        explanation:
          'Data moving between business and shop-floor systems without re-keying is system integration, the pillar every dashboard quietly depends on.',
      },
      {
        text: 'Big Data and Analytics',
        correct: false,
        explanation:
          'Analytics studies the data once it is joined, it is not the plumbing that joins it.',
      },
      {
        text: 'AI and Machine Learning',
        correct: false,
        explanation:
          'AI predicts and classifies, it does not route the order between systems.',
      },
      {
        text: 'Augmented and Virtual Reality',
        correct: false,
        explanation:
          'AR and VR guide people, they do not connect ERP and MES.',
      },
    ],
  },
  {
    id: 'b1-cyber',
    block: 1,
    topic: 'Pillar: Cybersecurity',
    difficulty: 'intermediate',
    prompt:
      'The shop-floor network is segmented so a vendor laptop cannot reach the PLCs that run the line. Which pillar is this?',
    options: [
      {
        text: 'Cybersecurity',
        correct: true,
        explanation:
          'Segmenting the network and controlling who can reach the controllers is cybersecurity. On the OT side a breach can stop the line, not just leak data.',
      },
      {
        text: 'Cloud Computing',
        correct: false,
        explanation:
          'Cloud is remote compute and storage, not network segmentation.',
      },
      {
        text: 'System Integration',
        correct: false,
        explanation:
          'Integration connects systems, here the point is to keep them safely apart.',
      },
      {
        text: 'Industrial IoT',
        correct: false,
        explanation:
          'IIoT is the sensing layer being protected, not the protection itself.',
      },
    ],
  },
  {
    id: 'b1-ai-needs',
    block: 1,
    topic: 'AI in manufacturing',
    difficulty: 'intermediate',
    prompt:
      'An AI model needs two things to be useful on the line. Which pair?',
    options: [
      {
        text: 'Good labelled examples and a clear question to answer',
        correct: true,
        explanation:
          'Without labelled good-and-bad examples and a clear question, a model has nothing to learn from and no job to do.',
      },
      {
        text: 'More dashboards and more servers',
        correct: false,
        explanation: 'Hardware and screens do not teach a model anything.',
      },
      {
        text: 'Faster sensors and a bigger display',
        correct: false,
        explanation: 'Speed and display size are not what a model learns from.',
      },
      {
        text: 'A larger paint booth',
        correct: false,
        explanation:
          'Plant equipment size is unrelated to whether a model can learn.',
      },
    ],
  },
  {
    id: 'b1-additive',
    block: 1,
    topic: 'Pillar: Additive Manufacturing',
    difficulty: 'intermediate',
    prompt:
      'Additive manufacturing (3D printing) is most often oversold for which use?',
    options: [
      {
        text: 'Mass production of identical parts',
        correct: true,
        explanation:
          'Unit speed makes additive a poor fit for high volume. Its real value is jigs, fixtures and low-volume parts where tooling cost and lead time hurt.',
      },
      {
        text: 'Jigs and fixtures',
        correct: false,
        explanation:
          'This is where additive genuinely pays, by removing tooling cost and wait.',
      },
      {
        text: 'Low-volume spare parts',
        correct: false,
        explanation: 'This is a sound use of additive, not an oversell.',
      },
      {
        text: 'Prototypes',
        correct: false,
        explanation: 'Prototyping is a classic, well-justified use of additive.',
      },
    ],
  },
  {
    id: 'b1-revolutions',
    block: 1,
    topic: 'Industrial revolutions',
    difficulty: 'intermediate',
    prompt:
      'Industry 3.0 brought programmable automation with PLCs and computers. What is the defining shift to Industry 4.0?',
    options: [
      {
        text: 'Machines, products and systems are connected and share data, so decisions move from gut feel to data',
        correct: true,
        explanation:
          'Industry 4.0 is the connected factory. The change is data flowing across the plant, not just a single machine running a program.',
      },
      {
        text: 'Factories simply add more robots',
        correct: false,
        explanation:
          'More robots is still automation, the 3.0 idea, not the connected-data shift.',
      },
      {
        text: 'Electronics become cheaper',
        correct: false,
        explanation:
          'Cheaper electronics enabled it but is not the defining change.',
      },
      {
        text: 'Plants get physically larger',
        correct: false,
        explanation: 'Size is not what defines the fourth revolution.',
      },
    ],
  },
  {
    id: 'b1-five',
    block: 1,
    topic: 'Industry 5.0',
    difficulty: 'intermediate',
    prompt:
      'Industry 4.0 tends to ask can a machine do this faster. What does Industry 5.0 add on top?',
    options: [
      {
        text: 'A human-centric, sustainable and resilient lens: should we, who benefits, and can we absorb a shock',
        correct: true,
        explanation:
          'The European Commission frames Industry 5.0 as human-centric, sustainable and resilient, putting people and robustness alongside efficiency.',
      },
      {
        text: 'A push to remove all people from the plant',
        correct: false,
        explanation:
          'Industry 5.0 treats the worker as an asset to develop, not a cost to remove.',
      },
      {
        text: 'A focus only on cutting cost',
        correct: false,
        explanation:
          'Cost alone is the narrow view that 5.0 deliberately widens.',
      },
      {
        text: 'Faster sensors and networks',
        correct: false,
        explanation: 'Better technology is a 4.0 enabler, not the 5.0 idea.',
      },
    ],
    source: 'European Commission, "Industry 5.0" (2021)',
  },
  {
    id: 'b1-amberg',
    block: 1,
    topic: 'Best-in-class proof point',
    difficulty: 'intermediate',
    prompt:
      "Siemens' Electronics Works in Amberg is often cited in Industry 4.0 talks. What is the headline result?",
    options: [
      {
        text: 'Around 99.99885 percent quality, roughly 11 defects per million, with very high automation',
        correct: true,
        explanation:
          'Amberg is a benchmark for quality at scale, capturing around 50 million data points a day to get there.',
      },
      {
        text: 'A plant that runs with zero employees',
        correct: false,
        explanation: 'Amberg is highly automated but still run by people.',
      },
      {
        text: 'The lowest labour cost in Europe',
        correct: false,
        explanation: 'Its fame is quality and data, not labour cost.',
      },
      {
        text: 'Products that are entirely 3D printed',
        correct: false,
        explanation:
          'Amberg makes electronic controllers, it is not an additive showcase.',
      },
    ],
    source: 'Siemens, Electronics Works Amberg',
  },
  {
    id: 'b1-three-ds',
    block: 1,
    topic: 'The Three Ds',
    difficulty: 'difficult',
    prompt:
      'A torque reading that is out of spec now automatically holds the tractor and reorders the next job, where before it was just written on a sheet. Is this digitization, digitalization or transformation?',
    options: [
      {
        text: 'Digitalization, because the work itself is redesigned around the data',
        correct: true,
        explanation:
          'The data now changes how the process runs. That is digitalization, a step beyond simply capturing the number.',
      },
      {
        text: 'Digitization, because a reading is captured',
        correct: false,
        explanation:
          'Digitization would be only turning the paper sheet into a digital record, with the process unchanged.',
      },
      {
        text: 'Transformation, because the business model changes',
        correct: false,
        explanation:
          'The business model and what the plant sells have not changed, so this is not transformation.',
      },
      {
        text: 'None of these',
        correct: false,
        explanation: 'It is a clear case of digitalization.',
      },
    ],
    source: 'Gartner IT Glossary',
  },
  {
    id: 'b1-isa95',
    block: 1,
    topic: 'ISA-95 pyramid',
    difficulty: 'difficult',
    prompt:
      'A torque value is born at the machine in milliseconds and must end up as a warranty record in the business system. Where do most digital projects lose the most time and money?',
    options: [
      {
        text: 'At the boundaries between the automation levels, where formats and meaning must be agreed',
        correct: true,
        explanation:
          'In the ISA-95 pyramid the integration cost lives at the boundaries between levels, not inside any one level.',
      },
      {
        text: 'Inside the PLC at level 1',
        correct: false,
        explanation:
          'Control at level 1 is usually well solved, the pain is handing data upward.',
      },
      {
        text: 'In the ERP at level 4 alone',
        correct: false,
        explanation:
          'The ERP is one end, the cost is in connecting the levels, not in the ERP by itself.',
      },
      {
        text: 'In the sensor itself',
        correct: false,
        explanation:
          'The sensor is the cheap, solved part, the difficulty is the journey upward.',
      },
    ],
    source: 'ANSI/ISA-95 (IEC 62264) and the Purdue model',
  },

  // ============================ BLOCK 2 ============================
  {
    id: 'b2-ignition',
    block: 2,
    topic: 'Ignition',
    difficulty: 'intermediate',
    prompt: 'In the Block 2 data journey, what is Ignition\'s role?',
    options: [
      {
        text: 'A central hub that collects from machines, stores history, shows it live, and publishes upstream',
        correct: true,
        explanation:
          'Ignition reads from drivers like OPC UA and Modbus into one tag model, shows it in a browser, and publishes upward over MQTT.',
      },
      {
        text: 'A PLC that directly controls the line',
        correct: false,
        explanation:
          'Ignition is a software platform above the controllers, it does not run the line like a PLC.',
      },
      {
        text: 'A cloud database and nothing else',
        correct: false,
        explanation:
          'It stores history but it also collects, visualizes and publishes.',
      },
      {
        text: 'A wireless radio standard',
        correct: false,
        explanation: 'That describes the radios at the edge, not Ignition.',
      },
    ],
  },
  {
    id: 'b2-edge',
    block: 2,
    topic: 'Edge computing',
    difficulty: 'intermediate',
    prompt:
      'Why compute at the edge, near the machine, rather than send every reading to the centre?',
    options: [
      {
        text: 'To cut data volume and keep local decisions fast and resilient to link drops',
        correct: true,
        explanation:
          'The edge filters traffic before it travels, reacts locally without a round trip, and buffers through outages.',
      },
      {
        text: 'Because edge hardware is always cheaper',
        correct: false,
        explanation: 'Cost is not the point, and edge nodes are not always cheaper.',
      },
      {
        text: 'Because it removes the need for any central system',
        correct: false,
        explanation: 'The centre is still needed, the edge complements it.',
      },
      {
        text: 'Because it makes the sensors more accurate',
        correct: false,
        explanation: 'Edge compute does not change sensor accuracy.',
      },
    ],
  },
  {
    id: 'b2-rbe',
    block: 2,
    topic: 'Report-by-exception',
    difficulty: 'intermediate',
    prompt: 'What does report-by-exception mean, and why does it help?',
    options: [
      {
        text: 'Publish only when a value changes, which cuts traffic sharply compared with constant polling',
        correct: true,
        explanation:
          'Most readings are steady most of the time, so sending only the changes turns a heavy poll into a light stream.',
      },
      {
        text: 'Publish every value twice for safety',
        correct: false,
        explanation: 'That would increase traffic, not reduce it.',
      },
      {
        text: 'Publish on a fixed timer regardless of change',
        correct: false,
        explanation: 'That is polling, the opposite of report-by-exception.',
      },
      {
        text: 'Publish only error messages',
        correct: false,
        explanation: 'It sends any changed value, not only errors.',
      },
    ],
  },
  {
    id: 'b2-opcua',
    block: 2,
    topic: 'OPC UA',
    difficulty: 'intermediate',
    prompt: "What does OPC UA's information model add over a raw register value?",
    options: [
      {
        text: 'Context: the name, type, units and structure, so the data is self-describing',
        correct: true,
        explanation:
          'The meaning travels with the value, so the receiving system knows that a number is, say, spindle temperature in degrees C.',
      },
      {
        text: 'A faster sampling rate for the same value',
        correct: false,
        explanation: 'Speed is not what the information model provides.',
      },
      {
        text: 'Lower hardware cost for the controller',
        correct: false,
        explanation: 'It is about meaning, not cost.',
      },
      {
        text: 'It replaces the PLC',
        correct: false,
        explanation: 'OPC UA is a communication standard, not a controller.',
      },
    ],
  },
  {
    id: 'b2-modbus',
    block: 2,
    topic: 'Modbus',
    difficulty: 'intermediate',
    prompt:
      'Why is Modbus still everywhere on older meters and testers, and what does it lack?',
    options: [
      {
        text: 'It is simple and cheap with numbered registers, but it has no information model and no built-in security',
        correct: true,
        explanation:
          'Modbus from 1979 is easy and ubiquitous, but a register is just a number with no meaning attached and no protection.',
      },
      {
        text: 'It is modern and encrypted by default',
        correct: false,
        explanation: 'Modbus has no built-in security at all.',
      },
      {
        text: 'It is a vehicle bus for ECUs',
        correct: false,
        explanation: 'That is CAN, not Modbus.',
      },
      {
        text: 'It is a wireless mesh protocol',
        correct: false,
        explanation: 'Modbus is a wired serial or TCP protocol, not a radio mesh.',
      },
    ],
  },
  {
    id: 'b2-can',
    block: 2,
    topic: 'CAN bus',
    difficulty: 'intermediate',
    prompt: 'How does a CAN bus carry messages between ECUs and test rigs?',
    options: [
      {
        text: 'As a broadcast bus where every node hears every message, ordered by priority, with strong error detection',
        correct: true,
        explanation:
          'CAN is a rugged broadcast bus built for vehicles. Messages carry a priority, and error detection survives electrical noise.',
      },
      {
        text: 'Point to point, each device addressed individually',
        correct: false,
        explanation: 'CAN has no per-device addressing, every node hears the bus.',
      },
      {
        text: 'Over Wi-Fi between controllers',
        correct: false,
        explanation: 'CAN is a wired bus, not a wireless link.',
      },
      {
        text: 'Only through Ignition',
        correct: false,
        explanation:
          'CAN runs between the devices themselves, independent of Ignition.',
      },
    ],
  },
  {
    id: 'b2-uds',
    block: 2,
    topic: 'UDS diagnostics',
    difficulty: 'intermediate',
    prompt: 'At end-of-line test, what does UDS add on top of CAN?',
    options: [
      {
        text: 'A standard diagnostic language to read and clear fault codes, read parameters and run self-tests',
        correct: true,
        explanation:
          'UDS turns a memory-dependent check into a repeatable standard sequence, reading and clearing fault codes and running routines.',
      },
      {
        text: 'It encrypts the CAN bus',
        correct: false,
        explanation: 'UDS is a diagnostic service, not encryption.',
      },
      {
        text: 'It replaces the CAN wiring with Ethernet',
        correct: false,
        explanation: 'UDS runs on top of CAN, it does not replace the wiring.',
      },
      {
        text: 'It is a wireless protocol',
        correct: false,
        explanation: 'UDS is a diagnostic standard carried over CAN, not a radio.',
      },
    ],
  },
  {
    id: 'b2-sparkplug',
    block: 2,
    topic: 'MQTT and Sparkplug B',
    difficulty: 'intermediate',
    prompt: 'What does Sparkplug B add on top of plain MQTT?',
    options: [
      {
        text: 'A standard topic namespace and a typed, stateful payload, including knowing when a device drops',
        correct: true,
        explanation:
          'Sparkplug fixes the topic names and payload shape, and its birth and death certificates tell the system when a device is alive or gone.',
      },
      {
        text: 'It encrypts the network',
        correct: false,
        explanation:
          'Sparkplug standardizes structure and state, it is not an encryption layer.',
      },
      {
        text: 'It increases the available bandwidth',
        correct: false,
        explanation: 'It does not change bandwidth.',
      },
      {
        text: 'It replaces the broker',
        correct: false,
        explanation: 'It still relies on an MQTT broker.',
      },
    ],
  },
  {
    id: 'b2-kafka',
    block: 2,
    topic: 'Apache Kafka',
    difficulty: 'intermediate',
    prompt: 'Why does Kafka make a good analytics backbone?',
    options: [
      {
        text: 'Many consumers can read the same retained stream independently and replay it, at high throughput',
        correct: true,
        explanation:
          'A dashboard, a quality model and the warranty team each read the same stream at their own pace, and a new reader can replay the history.',
      },
      {
        text: 'It deletes data immediately to save space',
        correct: false,
        explanation: 'Kafka retains the stream, that is the whole point.',
      },
      {
        text: 'It allows only one reader at a time',
        correct: false,
        explanation: 'Kafka is built for many independent consumers.',
      },
      {
        text: 'It is simply the cheapest option',
        correct: false,
        explanation: 'Cost is not why it is chosen as the backbone.',
      },
    ],
  },
  {
    id: 'b2-journey',
    block: 2,
    topic: 'The data journey',
    difficulty: 'intermediate',
    prompt: 'Put the northbound data path in the right order, from the machine upward.',
    options: [
      {
        text: 'Edge, then Ignition, then MQTT, then RabbitMQ, then Kafka, then analytics',
        correct: true,
        explanation:
          'Data is gathered at the edge, hubbed in Ignition, carried by MQTT, queued in RabbitMQ, retained in Kafka, then read by analytics.',
      },
      {
        text: 'Kafka, then RabbitMQ, then Ignition, then the edge',
        correct: false,
        explanation: 'This is backwards, it runs from analytics down to the machine.',
      },
      {
        text: 'Ignition, then the edge, then Kafka, then MQTT',
        correct: false,
        explanation:
          'The edge sits below Ignition, and MQTT carries data into the brokers, not after Kafka.',
      },
      {
        text: 'Analytics, then Kafka, then the edge',
        correct: false,
        explanation: 'Analytics is the top consumer, not the start of the path.',
      },
    ],
  },
  {
    id: 'b2-rabbit-vs-kafka',
    block: 2,
    topic: 'RabbitMQ vs Kafka',
    difficulty: 'difficult',
    prompt:
      'A quality model must retrain by replaying months of past test data. Which broker fits as the backbone, and why?',
    options: [
      {
        text: 'Kafka, because it retains the stream on a log so the whole history can be replayed',
        correct: true,
        explanation:
          'Kafka keeps events after they are read. RabbitMQ deletes each message once it is consumed and acknowledged, so the history would be gone.',
      },
      {
        text: 'RabbitMQ, because it keeps every message forever',
        correct: false,
        explanation:
          'RabbitMQ removes a message after it is acknowledged, it is not a retained log.',
      },
      {
        text: 'Either one, they behave identically',
        correct: false,
        explanation:
          'They differ on the key point: retain and replay versus consume and delete.',
      },
      {
        text: 'Neither, brokers cannot store data',
        correct: false,
        explanation: 'Kafka is exactly a broker designed to retain and replay.',
      },
    ],
  },
  {
    id: 'b2-opcua-vs-modbus',
    block: 2,
    topic: 'OPC UA vs Modbus security',
    difficulty: 'difficult',
    prompt:
      'A vendor device speaks Modbus and sits on a network shared with untrusted users. What is the risk, and what would OPC UA add?',
    options: [
      {
        text: 'Modbus has no built-in security, so anyone on the network can read or write registers; OPC UA adds authentication, encryption and self-describing data',
        correct: true,
        explanation:
          'Modbus trusts the network. OPC UA brings identity and encryption, and turns register 40001 into spindle temperature with type and units.',
      },
      {
        text: 'There is no risk, Modbus encrypts traffic by default',
        correct: false,
        explanation: 'Modbus has no encryption or authentication of its own.',
      },
      {
        text: 'The only fix is to unplug the device',
        correct: false,
        explanation:
          'Segmentation plus a secure protocol like OPC UA is the real answer.',
      },
      {
        text: 'OPC UA would make it slower with no other benefit',
        correct: false,
        explanation: 'OPC UA adds security and meaning, not just overhead.',
      },
    ],
  },
  {
    id: 'b2-can-arbitration',
    block: 2,
    topic: 'CAN arbitration',
    difficulty: 'difficult',
    prompt:
      'Two ECUs on the same CAN bus start sending at the same instant, one with a lower message ID than the other. What happens?',
    options: [
      {
        text: 'The lower ID wins the bus because it has higher priority; the other backs off and retries, and no data is lost',
        correct: true,
        explanation:
          'CAN arbitration is non-destructive. The higher-priority (lower ID) message proceeds and the loser simply tries again.',
      },
      {
        text: 'Both messages collide and are destroyed',
        correct: false,
        explanation:
          'CAN arbitration is designed so the winning message is not corrupted.',
      },
      {
        text: 'The higher ID always wins',
        correct: false,
        explanation: 'Lower numeric ID means higher priority on CAN.',
      },
      {
        text: 'The bus shuts down until reset',
        correct: false,
        explanation: 'Arbitration resolves it instantly without stopping the bus.',
      },
    ],
  },
]
