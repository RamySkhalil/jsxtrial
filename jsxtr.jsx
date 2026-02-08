import React from 'react';

const ATSWorkflowChart = () => {
  const colors = {
    primary: '#1E2761',
    secondary: '#2B4B8C',
    accent: '#4A90D9',
    success: '#2E7D32',
    warning: '#F9A825',
    danger: '#C62828',
    lightBlue: '#CADCFC',
    white: '#FFFFFF',
    text: '#2D3748',
    lightGray: '#E8ECF1',
  };

  const Box = ({ x, y, width, height, color, children, fontSize = 11 }) => (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        rx={4}
        ry={4}
        filter="url(#shadow)"
      />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={color === colors.warning ? colors.text : colors.white}
        fontSize={fontSize}
        fontFamily="Calibri, Arial, sans-serif"
        fontWeight="500"
      >
        {children}
      </text>
    </g>
  );

  const MultiLineBox = ({ x, y, width, height, color, lines, fontSize = 11 }) => (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        rx={4}
        ry={4}
        filter="url(#shadow)"
      />
      {lines.map((line, i) => (
        <text
          key={i}
          x={x + width / 2}
          y={y + height / 2 + (i - (lines.length - 1) / 2) * (fontSize + 2)}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={color === colors.warning ? colors.text : colors.white}
          fontSize={fontSize}
          fontFamily="Calibri, Arial, sans-serif"
          fontWeight="500"
        >
          {line}
        </text>
      ))}
    </g>
  );

  const Arrow = ({ x1, y1, x2, y2, label, labelPos = 'middle' }) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);
    const len = Math.sqrt(dx * dx + dy * dy);
    
    const arrowSize = 6;
    const endX = x2 - arrowSize * Math.cos(angle);
    const endY = y2 - arrowSize * Math.sin(angle);

    return (
      <g>
        <line
          x1={x1}
          y1={y1}
          x2={endX}
          y2={endY}
          stroke={colors.text}
          strokeWidth={1.5}
        />
        <polygon
          points={`${x2},${y2} ${x2 - arrowSize * Math.cos(angle - Math.PI / 6)},${y2 - arrowSize * Math.sin(angle - Math.PI / 6)} ${x2 - arrowSize * Math.cos(angle + Math.PI / 6)},${y2 - arrowSize * Math.sin(angle + Math.PI / 6)}`}
          fill={colors.text}
        />
        {label && (
          <text
            x={(x1 + x2) / 2 + (labelPos === 'above' ? 0 : 5)}
            y={(y1 + y2) / 2 + (labelPos === 'above' ? -8 : 0)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={colors.text}
            fontSize={9}
            fontFamily="Calibri, Arial, sans-serif"
            fontStyle="italic"
          >
            {label}
          </text>
        )}
      </g>
    );
  };

  const ElbowArrow = ({ points, label, labelX, labelY }) => {
    const pathD = points.reduce((acc, point, i) => {
      return acc + (i === 0 ? `M ${point[0]},${point[1]}` : ` L ${point[0]},${point[1]}`);
    }, '');
    
    const lastPoint = points[points.length - 1];
    const secondLastPoint = points[points.length - 2];
    const dx = lastPoint[0] - secondLastPoint[0];
    const dy = lastPoint[1] - secondLastPoint[1];
    const angle = Math.atan2(dy, dx);
    const arrowSize = 6;

    return (
      <g>
        <path
          d={pathD}
          fill="none"
          stroke={colors.text}
          strokeWidth={1.5}
        />
        <polygon
          points={`${lastPoint[0]},${lastPoint[1]} ${lastPoint[0] - arrowSize * Math.cos(angle - Math.PI / 6)},${lastPoint[1] - arrowSize * Math.sin(angle - Math.PI / 6)} ${lastPoint[0] - arrowSize * Math.cos(angle + Math.PI / 6)},${lastPoint[1] - arrowSize * Math.sin(angle + Math.PI / 6)}`}
          fill={colors.text}
        />
        {label && (
          <text
            x={labelX}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={colors.text}
            fontSize={9}
            fontFamily="Calibri, Arial, sans-serif"
            fontStyle="italic"
          >
            {label}
          </text>
        )}
      </g>
    );
  };

  const boxW = 140;
  const boxH = 45;
  const gap = 20;

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
        ATS Workflow Chart
      </h1>
      <svg width="900" height="750" viewBox="0 0 900 750">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Row 1: Job Posted */}
        <MultiLineBox x={380} y={20} width={boxW} height={boxH} color={colors.secondary} lines={["Job Posted", "by Recruiter"]} />
        
        {/* Arrow down */}
        <Arrow x1={450} y1={65} x2={450} y2={85} />

        {/* Row 2: Candidate Applies */}
        <MultiLineBox x={380} y={85} width={boxW} height={boxH} color={colors.secondary} lines={["Candidate Applies", "via Portal or Chatbot"]} />
        
        <Arrow x1={450} y1={130} x2={450} y2={150} />

        {/* Row 3: Chatbot Pre-screen */}
        <MultiLineBox x={380} y={150} width={boxW} height={boxH} color={colors.secondary} lines={["Chatbot Pre-screen", "and Data Collection"]} />
        
        <Arrow x1={450} y1={195} x2={450} y2={215} />

        {/* Row 4: CV Parsing */}
        <MultiLineBox x={380} y={215} width={boxW} height={boxH} color={colors.secondary} lines={["CV Parsing and", "Profile Extraction"]} />
        
        <Arrow x1={450} y1={260} x2={450} y2={280} />

        {/* Row 5: AI Scoring Engine */}
        <MultiLineBox x={380} y={280} width={boxW} height={boxH} color={colors.accent} lines={["AI Scoring Engine"]} fontSize={13} />
        
        <Arrow x1={450} y1={325} x2={450} y2={345} />

        {/* Row 6: Recruiter Review Queue */}
        <MultiLineBox x={380} y={345} width={boxW} height={boxH} color={colors.primary} lines={["Recruiter Review Queue"]} fontSize={12} />

        {/* Three branches from Recruiter Review */}
        {/* Left branch: Shortlist */}
        <ElbowArrow 
          points={[[380, 367], [200, 367], [200, 410]]} 
          label="Shortlist" 
          labelX={290} 
          labelY={357}
        />
        <MultiLineBox x={130} y={410} width={boxW} height={boxH} color={colors.success} lines={["Send AI Scored CV", "to Hiring Manager"]} />

        {/* Middle branch: Hold */}
        <ElbowArrow 
          points={[[450, 390], [450, 410]]} 
        />
        <text x={470} y={402} fontSize={9} fontStyle="italic" fill={colors.text}>Hold</text>
        <MultiLineBox x={380} y={410} width={boxW} height={boxH} color={colors.warning} lines={["Talent Pool"]} fontSize={13} />

        {/* Right branch: Reject */}
        <ElbowArrow 
          points={[[520, 367], [700, 367], [700, 410]]} 
          label="Reject" 
          labelX={610} 
          labelY={357}
        />
        <MultiLineBox x={630} y={410} width={boxW} height={boxH} color={colors.danger} lines={["Reject with", "Recruiter Reason"]} />

        {/* Hiring Manager Review */}
        <Arrow x1={200} y1={455} x2={200} y2={490} />
        <MultiLineBox x={130} y={490} width={boxW} height={boxH} color={colors.primary} lines={["Hiring Manager Review"]} fontSize={12} />

        {/* Two branches from HM Review */}
        {/* Left: Request Interview */}
        <ElbowArrow 
          points={[[130, 512], [60, 512], [60, 555]]} 
          label="Request Interview" 
          labelX={95} 
          labelY={538}
        />
        <MultiLineBox x={20} y={555} width={150} height={boxH} color={colors.success} lines={["Interview Scheduling", "via Chatbot"]} />

        {/* Right: Drop */}
        <ElbowArrow 
          points={[[270, 512], [340, 512], [340, 555]]} 
          label="Drop" 
          labelX={305} 
          labelY={502}
        />
        <MultiLineBox x={270} y={555} width={boxW} height={boxH} color={colors.danger} lines={["Drop with HM", "Feedback"]} />

        {/* Interview Conducted */}
        <Arrow x1={95} y1={600} x2={95} y2={620} />
        <MultiLineBox x={20} y={620} width={150} height={boxH} color={colors.secondary} lines={["Interview Conducted", "& Feedback Submitted"]} />

        {/* Final Decision */}
        <Arrow x1={95} y1={665} x2={95} y2={690} />
        <MultiLineBox x={20} y={690} width={150} height={boxH} color={colors.primary} lines={["Final Decision"]} fontSize={13} />

        {/* Three outcomes from Final Decision */}
        {/* Hire */}
        <ElbowArrow 
          points={[[170, 712], [230, 712], [230, 620], [270, 620]]} 
          label="Hire" 
          labelX={200} 
          labelY={702}
        />
        <MultiLineBox x={270} y={620} width={boxW} height={35} color={colors.success} lines={["Offer and Onboarding"]} />

        {/* Reject */}
        <ElbowArrow 
          points={[[170, 712], [230, 712], [230, 665], [270, 665]]} 
          label="Reject" 
          labelX={250} 
          labelY={655}
        />
        <MultiLineBox x={270} y={665} width={boxW} height={35} color={colors.danger} lines={["Final Rejection"]} />

        {/* Pool - back to Talent Pool */}
        <ElbowArrow 
          points={[[170, 712], [230, 712], [230, 710], [450, 710], [450, 455]]} 
          label="Pool" 
          labelX={340} 
          labelY={700}
        />

        {/* History and Audit Log */}
        <rect x={560} y={490} width={180} height={130} fill={colors.primary} rx={6} filter="url(#shadow)" />
        <text x={650} y={520} textAnchor="middle" fill={colors.white} fontSize={14} fontWeight="bold" fontFamily="Georgia, serif">
          History & Audit Log
        </text>
        <text x={650} y={550} textAnchor="middle" fill={colors.lightBlue} fontSize={10} fontFamily="Calibri, Arial, sans-serif">
          All decisions, feedback,
        </text>
        <text x={650} y={565} textAnchor="middle" fill={colors.lightBlue} fontSize={10} fontFamily="Calibri, Arial, sans-serif">
          and outcomes recorded
        </text>
        <text x={650} y={580} textAnchor="middle" fill={colors.lightBlue} fontSize={10} fontFamily="Calibri, Arial, sans-serif">
          for compliance
        </text>
        <text x={650} y={595} textAnchor="middle" fill={colors.lightBlue} fontSize={10} fontFamily="Calibri, Arial, sans-serif">
          and analytics
        </text>

        {/* Arrows to Audit Log */}
        {/* From Reject with Recruiter Reason */}
        <Arrow x1={700} y1={455} x2={700} y2={490} />
        
        {/* From Drop with HM Feedback */}
        <ElbowArrow points={[[340, 600], [340, 640], [540, 640], [540, 555], [560, 555]]} />
        
        {/* From Offer */}
        <ElbowArrow points={[[410, 637], [480, 637], [480, 530], [560, 530]]} />
        
        {/* From Final Rejection */}
        <ElbowArrow points={[[410, 682], [500, 682], [500, 570], [560, 570]]} />
        
        {/* From Talent Pool */}
        <ElbowArrow points={[[520, 432], [650, 432], [650, 490]]} />

      </svg>
      
      <div className="mt-6 text-sm text-gray-600 max-w-2xl text-center">
        <p className="font-semibold mb-2">Color Legend:</p>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: colors.secondary }}></span>
            Process Steps
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: colors.primary }}></span>
            Decision Points
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: colors.accent }}></span>
            AI Processing
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: colors.success }}></span>
            Positive Actions
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: colors.warning }}></span>
            Hold/Pool
          </span>
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 rounded" style={{ backgroundColor: colors.danger }}></span>
            Reject Actions
          </span>
        </div>
      </div>
    </div>
  );
};

export default ATSWorkflowChart;
