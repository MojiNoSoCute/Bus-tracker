import { Station, TrainPosition } from '../types/train';
import { Bus, Map } from 'lucide-react';

interface RouteMapProps {
  stations: Station[];
  trainPositions: TrainPosition[];
}

export function RouteMap({ stations, trainPositions }: RouteMapProps) {
  // Calculate bus position on the map (circular route)
  const getBusPosition = (train: TrainPosition) => {
    // For circular route, we need to handle the last station connecting back to first
    const totalStations = stations.length;
    const currentSegment = train.currentSegment;
    
    let currentStation, nextStation;
    
    // If parked, stay at current station
    if (train.isParked) {
      return stations[currentSegment].position;
    }
    
    if (currentSegment >= totalStations - 1) {
      // Going from last station back to first
      currentStation = stations[totalStations - 1];
      nextStation = stations[0];
    } else {
      currentStation = stations[currentSegment];
      nextStation = stations[currentSegment + 1];
    }

    const x = currentStation.position.x + (nextStation.position.x - currentStation.position.x) * train.progress;
    const y = currentStation.position.y + (nextStation.position.y - currentStation.position.y) * train.progress;

    return { x, y };
  };

  // Create circular path
  const createCircularPath = () => {
    const pathPoints = stations.map(s => `${s.position.x},${s.position.y}`).join(' L ');
    return `M ${pathPoints} L ${stations[0].position.x},${stations[0].position.y}`;
  };

  // Helper to get contrasting color (for text)
  const getContrastColor = (hexColor: string) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  };

  return (
    <div className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-2xl p-8 border border-emerald-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
          <Map className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">แผนที่เส้นทางรถเมล์ไฟฟ้า</h2>
          <p className="text-sm text-slate-500">เส้นทางวนรอบภายในมหาวิทยาลัย • {trainPositions.length} คัน</p>
        </div>
      </div>
      
      <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl overflow-hidden border-2 border-emerald-200 shadow-inner" style={{ height: '500px' }}>
        <svg width="100%" height="100%" viewBox="0 0 950 500">
          {/* Route line - circular */}
          <path
            d={createCircularPath()}
            stroke="url(#routeGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="12,6"
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {/* Direction arrows */}
          {stations.map((station, index) => {
            const nextIndex = (index + 1) % stations.length;
            const next = stations[nextIndex];
            const midX = (station.position.x + next.position.x) / 2;
            const midY = (station.position.y + next.position.y) / 2;
            const angle = Math.atan2(next.position.y - station.position.y, next.position.x - station.position.x) * 180 / Math.PI;
            
            return (
              <g key={`arrow-${index}`} transform={`translate(${midX}, ${midY}) rotate(${angle})`}>
                <polygon points="0,-8 16,0 0,8" fill="#059669" opacity="0.8" />
              </g>
            );
          })}

          {/* Stations */}
          {stations.map((station, index) => (
            <g key={station.id}>
              {/* Outer glow */}
              <circle
                cx={station.position.x}
                cy={station.position.y}
                r="20"
                fill="#10b981"
                opacity="0.2"
              />
              {/* Station circle */}
              <circle
                cx={station.position.x}
                cy={station.position.y}
                r="16"
                fill="white"
                stroke="#10b981"
                strokeWidth="4"
              />
              <circle
                cx={station.position.x}
                cy={station.position.y}
                r="8"
                fill="#10b981"
              />

              {/* Station label */}
              <text
                x={station.position.x}
                y={station.position.y - 32}
                textAnchor="middle"
                className="text-sm font-bold"
                fill="#0f766e"
              >
                {station.nameTh}
              </text>
              <text
                x={station.position.x}
                y={station.position.y + 42}
                textAnchor="middle"
                className="text-xs font-semibold"
                fill="#64748b"
              >
                P{station.id}
              </text>
            </g>
          ))}

          {/* Bus icons - render all trains */}
          {trainPositions.map(train => {
            const trainPos = getBusPosition(train);
            
            return (
              <g key={train.trainId} transform={`translate(${trainPos.x}, ${trainPos.y})`}>
                {train.isParked ? (
                  // Parked bus
                  <>
                    <circle
                      cx="0"
                      cy="0"
                      r="28"
                      fill={train.color}
                      opacity="0.3"
                      className="animate-pulse"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="24"
                      fill={train.color}
                      opacity="0.8"
                      className="animate-pulse"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="20"
                      fill={train.color}
                    />
                    {/* Bus symbol */}
                    <rect x="-10" y="-8" width="20" height="16" fill="white" rx="3" />
                    <rect x="-8" y="-5" width="6" height="4" fill={train.color} />
                    <rect x="2" y="-5" width="6" height="4" fill={train.color} />
                    <rect x="-8" y="1" width="6" height="4" fill={train.color} />
                    <rect x="2" y="1" width="6" height="4" fill={train.color} />
                    <rect x="-10" y="8" width="4" height="3" fill="#374151" rx="1.5" />
                    <rect x="6" y="8" width="4" height="3" fill="#374151" rx="1.5" />
                    {/* Train ID badge */}
                    <circle cx="12" cy="-12" r="8" fill="white" stroke={train.color} strokeWidth="2" />
                    <text x="12" y="-8" textAnchor="middle" className="text-xs font-black" fill={train.color}>{train.trainId}</text>
                  </>
                ) : (
                  // Moving bus
                  <>
                    <circle
                      cx="0"
                      cy="0"
                      r="28"
                      fill={train.color}
                      opacity="0.3"
                      className="animate-pulse"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="24"
                      fill={train.color}
                      opacity="0.8"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r="20"
                      fill={train.color}
                    />
                    {/* Bus symbol */}
                    <rect x="-10" y="-8" width="20" height="16" fill="white" rx="3" />
                    <rect x="-8" y="-5" width="6" height="4" fill={train.color} />
                    <rect x="2" y="-5" width="6" height="4" fill={train.color} />
                    <rect x="-8" y="1" width="6" height="4" fill={train.color} />
                    <rect x="2" y="1" width="6" height="4" fill={train.color} />
                    <rect x="-10" y="8" width="4" height="3" fill="#374151" rx="1.5" />
                    <rect x="6" y="8" width="4" height="3" fill="#374151" rx="1.5" />
                    {/* Train ID badge */}
                    <circle cx="12" cy="-12" r="8" fill="white" stroke={train.color} strokeWidth="2" />
                    <text x="12" y="-8" textAnchor="middle" className="text-xs font-black" fill={train.color}>{train.trainId}</text>
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend - Responsive */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-3 md:p-4 space-y-2 md:space-y-2.5 border border-emerald-200 max-w-[180px] md:max-w-none">
          <h4 className="text-xs md:text-sm font-bold text-slate-700 mb-1 md:mb-2">คำอธิบาย</h4>
          {trainPositions.map(train => (
            <div key={train.trainId} className="flex items-center gap-2">
              <div className="w-4 h-4 md:w-5 md:h-5 rounded-full shadow-md flex-shrink-0" style={{ backgroundColor: train.color }}></div>
              <span className="text-xs md:text-sm font-semibold text-slate-700 truncate">{train.trainName}</span>
            </div>
          ))}
          <div className="h-px bg-slate-300 my-1.5 md:my-2"></div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-white border-2 md:border-4 border-emerald-500 shadow-md flex-shrink-0"></div>
            <span className="text-xs md:text-sm font-semibold text-slate-700">จุดจอด</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 md:w-8 h-1 md:h-1.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full shadow-sm flex-shrink-0"></div>
            <span className="text-xs md:text-sm font-semibold text-slate-700">เส้นทาง</span>
          </div>
        </div>
      </div>
    </div>
  );
}