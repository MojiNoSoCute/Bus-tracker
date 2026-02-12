import { Station, TrainPosition } from '../types/train';
import { Clock, MapPin, CircleDot, Navigation2, Sparkles } from 'lucide-react';

interface ArrivalEstimatesProps {
  stations: Station[];
  trainPositions: TrainPosition[];
  currentTime: Date;
}

export function ArrivalEstimates({ stations, trainPositions, currentTime }: ArrivalEstimatesProps) {
  const totalStations = stations.length;
  
  // Calculate arrival time for a specific train to a specific station
  const calculateArrivalTime = (train: TrainPosition, stationIndex: number): { time: string, minutesAway: number } => {
    const currentSegment = train.currentSegment;
    const progress = train.progress;
    const isParked = train.isParked;

    // Calculate distance in segments (circular route)
    let segmentsToGo;
    if (stationIndex > currentSegment) {
      segmentsToGo = stationIndex - currentSegment;
    } else if (stationIndex < currentSegment) {
      // Need to wrap around
      segmentsToGo = (totalStations - currentSegment) + stationIndex;
    } else {
      // At current station
      if (isParked) {
        return { time: `จอดอยู่ (${Math.ceil(train.parkingTimeRemaining)} วินาที)`, minutesAway: 0 };
      } else if (progress < 0.3) {
        return { time: 'เพิ่งออกแล้ว', minutesAway: 0 };
      } else {
        // Already passed, will come back around
        segmentsToGo = totalStations;
      }
    }

    const progressRemaining = isParked ? 1 : (1 - progress);
    const parkingTimeInMinutes = train.parkingTimeRemaining / 60;

    // Assume 5 minutes per segment + 0.5 minutes parking at each station
    const minutesPerSegment = 5;
    const totalMinutes = (segmentsToGo - 1) * (minutesPerSegment + 0.5) + progressRemaining * minutesPerSegment + parkingTimeInMinutes;

    const arrivalTime = new Date(currentTime.getTime() + totalMinutes * 60000);

    // If arriving soon
    if (totalMinutes < 1) {
      return { time: 'กำลังจะถึง', minutesAway: totalMinutes };
    } else if (totalMinutes < 5) {
      return { time: `${Math.ceil(totalMinutes)} นาที`, minutesAway: totalMinutes };
    }

    return { time: arrivalTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }), minutesAway: totalMinutes };
  };

  // Find the next train arriving at each station
  const getNextTrainForStation = (stationIndex: number) => {
    let closestTrain: TrainPosition | null = null;
    let closestTime = Infinity;
    let closestTimeStr = '';

    trainPositions.forEach(train => {
      const { time, minutesAway } = calculateArrivalTime(train, stationIndex);
      if (minutesAway < closestTime) {
        closestTime = minutesAway;
        closestTrain = train;
        closestTimeStr = time;
      }
    });

    return { train: closestTrain, time: closestTimeStr, minutesAway: closestTime };
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-red-50 to-rose-50 rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-8 border border-red-200/50 backdrop-blur-sm">
      {/* Header with gradient - Mobile optimized */}
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-rose-600 rounded-xl md:rounded-2xl blur-lg md:blur-xl opacity-50"></div>
            <div className="relative p-2 md:p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl md:rounded-2xl shadow-lg">
              <Navigation2 className="w-5 h-5 md:w-7 md:h-7 text-white" />
            </div>
          </div>
          <div>
            <h2 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              เวลาถึงแต่ละจุดจอด
            </h2>
            <p className="text-xs md:text-sm text-slate-500 flex items-center gap-1.5 mt-0.5 md:mt-1">
              <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
              ติดตามเวลาถึงแบบเรียลไทม์ • {trainPositions.length} คัน
            </p>
          </div>
        </div>
        
        {/* Live indicator - Mobile optimized */}
        <div className="flex items-center gap-1.5 md:gap-2 bg-white/80 backdrop-blur-sm px-2 py-1.5 md:px-4 md:py-2 rounded-full shadow-md border border-red-200">
          <div className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-full w-full bg-red-500"></span>
          </div>
          <span className="text-xs md:text-sm font-semibold text-slate-700">LIVE</span>
        </div>
      </div>

      {/* Grid of stations - Mobile optimized */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
        {stations.map((station, index) => {
          const nextTrainInfo = getNextTrainForStation(index);
          const train = nextTrainInfo.train;
          const arrivalTime = nextTrainInfo.time;
          const isParked = train && train.isParked && train.currentSegment === index;
          const isNext = train && !isParked && train.currentSegment === (index - 1 + totalStations) % totalStations && train.progress > 0.5;

          return (
            <div
              key={station.id}
              className={`group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                isParked 
                  ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border-2 shadow-2xl scale-105' 
                  : isNext 
                  ? 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-2 shadow-2xl scale-105' 
                  : 'bg-white/90 backdrop-blur-sm border-2 border-slate-200/50 hover:border-blue-300 hover:shadow-xl'
              }`}
              style={{
                borderColor: train && (isParked || isNext) ? train.color : undefined
              }}
            >
              {/* Animated gradient bar on top */}
              <div 
                className="absolute left-0 top-0 right-0 h-2"
                style={{
                  background: train 
                    ? `linear-gradient(90deg, ${train.color}, ${train.color}dd)` 
                    : 'linear-gradient(90deg, #94a3b8, #cbd5e1)',
                  opacity: isParked || isNext ? 1 : 0.6
                }}
              >
                {(isParked || isNext) && (
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                )}
              </div>

              {/* Glow effect for active cards */}
              {train && (isParked || isNext) && (
                <div 
                  className="absolute inset-0 blur-2xl opacity-20"
                  style={{ backgroundColor: train.color }}
                ></div>
              )}

              <div className="relative pt-4 md:pt-6 px-3 md:px-5 pb-3 md:pb-5">
                {/* Station badge with 3D effect - Mobile optimized */}
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className={`relative group-hover:scale-110 transition-transform duration-300`}>
                    {/* Glow background */}
                    {train && (isParked || isNext) && (
                      <div 
                        className="absolute inset-0 rounded-xl md:rounded-2xl blur-md md:blur-lg transition-opacity"
                        style={{ backgroundColor: train.color, opacity: isParked ? 1 : 0.7 }}
                      ></div>
                    )}
                    
                    {/* Badge */}
                    <div 
                      className="relative w-14 h-14 md:w-20 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl"
                      style={{
                        background: train && (isParked || isNext)
                          ? `linear-gradient(135deg, ${train.color}, ${train.color}aa)`
                          : 'linear-gradient(135deg, #60a5fa, #818cf8)'
                      }}
                    >
                      <span className="text-white text-lg md:text-2xl font-black drop-shadow-lg">P{station.id}</span>
                      
                      {/* Pulse dot for parked */}
                      {isParked && (
                        <div className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2">
                          <div className="relative flex h-4 w-4 md:h-6 md:w-6">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-full w-full bg-red-500 border-2 border-white shadow-lg"></span>
                          </div>
                        </div>
                      )}
                      
                      {/* Arrow for next */}
                      {isNext && !isParked && (
                        <div className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-white rounded-full p-0.5 md:p-1 shadow-lg">
                          <Navigation2 className="w-3 h-3 md:w-4 md:h-4" style={{ color: train.color }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Station name with gradient text - Mobile optimized */}
                <div className="text-center mb-3 md:mb-4">
                  <h3 className="font-bold text-sm md:text-lg mb-0.5 md:mb-1 text-slate-800 leading-tight">
                    {station.nameTh}
                  </h3>
                  <p className="text-[10px] md:text-xs text-slate-500 font-medium">{station.name}</p>
                </div>

                {/* Train indicator - Mobile optimized */}
                {train && (
                  <div className="flex justify-center mb-3 md:mb-4 min-h-[24px] md:min-h-[32px]">
                    <div className="relative">
                      <div 
                        className="absolute inset-0 blur-sm md:blur-md rounded-full"
                        style={{ backgroundColor: train.color }}
                      ></div>
                      <div 
                        className="relative flex items-center gap-1.5 md:gap-2 text-white text-[10px] md:text-xs font-bold px-2.5 py-1.5 md:px-4 md:py-2 rounded-full shadow-lg"
                        style={{ background: `linear-gradient(90deg, ${train.color}, ${train.color}dd)` }}
                      >
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}></div>
                        <span>{train.trainName}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Arrival time with enhanced design - Mobile optimized */}
                <div className="flex justify-center mb-3 md:mb-4">
                  <div className={`relative group/time`}>
                    {train && (
                      <div 
                        className="absolute inset-0 rounded-lg md:rounded-xl blur-sm transition-opacity"
                        style={{ backgroundColor: train.color, opacity: isParked || isNext ? 0.5 : 0 }}
                      ></div>
                    )}
                    
                    <div 
                      className="relative flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl shadow-md backdrop-blur-sm bg-white/80 border"
                      style={{
                        borderColor: train && (isParked || isNext) ? train.color : '#e2e8f0'
                      }}
                    >
                      <Clock 
                        className="w-4 h-4 md:w-5 md:h-5"
                        style={{ color: train?.color || '#64748b' }}
                      />
                      <span 
                        className="font-bold text-xs md:text-sm"
                        style={{ color: train?.color || '#334155' }}
                      >
                        {arrivalTime}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Facilities with pills - Mobile optimized, hide on mobile */}
                {station.facilities.length > 0 && (
                  <div className={`hidden sm:flex gap-1.5 pt-3 md:pt-4 border-t flex-wrap justify-center border-slate-200`}>
                    {station.facilities.slice(0, 2).map((facility, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] md:text-xs font-semibold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-sm transition-all hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 border border-blue-200"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Footer info box - Mobile optimized */}
      <div className="mt-4 md:mt-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-xl md:rounded-2xl"></div>
        <div className="relative p-3 md:p-5 bg-white/60 backdrop-blur-md rounded-xl md:rounded-2xl border border-blue-200/50 shadow-lg">
          <div className="flex items-start gap-2 md:gap-4">
            <div className="p-1.5 md:p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg md:rounded-xl shadow-md flex-shrink-0">
              <MapPin className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                <strong className="text-blue-700 font-bold">เส้นทางวนรอบ:</strong> รถเมล์ไฟฟ้าทั้ง {trainPositions.length} คัน จะวิ่งเป็นเส้นทางวนรอบและกลับมาที่จุดเริ่มต้นซ้ำ แสดงเวลามาถึงของรถคันถัดไปที่แต่ละจุด
              </p>
              <div className="flex items-center gap-2 md:gap-6 mt-2 md:mt-3 text-[10px] md:text-xs text-slate-600 flex-wrap">
                <span className="flex items-center gap-1 md:gap-1.5 bg-blue-50 px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-blue-200">
                  <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-blue-600" />
                  <strong>เวลาจอด:</strong> 30 วินาที
                </span>
                <span className="flex items-center gap-1 md:gap-1.5 bg-emerald-50 px-2 py-1 md:px-3 md:py-1.5 rounded-lg border border-emerald-200">
                  <Navigation2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-emerald-600" />
                  <strong>ระยะเวลาเดินทาง:</strong> ~5 นาที/จุด
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}