import { Station, TrainPosition } from '../types/train';
import { Bus, Clock, Navigation, Zap, Activity, Users } from 'lucide-react';

interface LiveTrainStatusProps {
  stations: Station[];
  trainPositions: TrainPosition[];
  currentTime: Date;
}

export function LiveTrainStatus({ stations, trainPositions, currentTime }: LiveTrainStatusProps) {
  const totalStations = stations.length;

  const getStatus = (train: TrainPosition) => {
    const currentSegment = train.currentSegment;
    const nextStationIndex = (currentSegment + 1) % totalStations;
    const currentStation = stations[currentSegment];
    const nextStation = stations[nextStationIndex];

    if (train.isParked) {
      return `จอดอยู่ที่ ${currentStation?.nameTh || ''}`;
    } else if (train.progress < 0.1) {
      return `กำลังออกจาก ${currentStation?.nameTh || ''}`;
    } else if (train.progress > 0.9) {
      return `ใกล้ถึง ${nextStation?.nameTh || ''} กำลังชะลอความเร็ว`;
    } else {
      return `กำลังเดินทางไปยัง ${nextStation?.nameTh || ''}`;
    }
  };

  // Get crowding level and color
  const getCrowdingInfo = (passengerCount: number, capacity: number) => {
    const percentage = (passengerCount / capacity) * 100;
    
    if (percentage <= 25) {
      return { 
        level: 'สบาย', 
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
        icon: '😊'
      };
    } else if (percentage <= 50) {
      return { 
        level: 'ปานกลาง', 
        color: 'from-blue-500 to-cyan-600',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
        icon: '🙂'
      };
    } else if (percentage <= 75) {
      return { 
        level: 'ค่อนข้างแออัด', 
        color: 'from-orange-500 to-amber-600',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
        icon: '😐'
      };
    } else {
      return { 
        level: 'แออัดมาก', 
        color: 'from-red-500 to-rose-600',
        bgColor: 'bg-red-100',
        textColor: 'text-red-700',
        icon: '😰'
      };
    }
  };

  // Calculate time remaining to next station (5 minutes per segment)
  const calculateTimeRemaining = (train: TrainPosition) => {
    const minutesPerSegment = 5;
    const remainingProgress = 1 - train.progress;
    const totalMinutes = remainingProgress * minutesPerSegment;
    const minutes = Math.floor(totalMinutes);
    const seconds = Math.round((totalMinutes - minutes) * 60);
    
    return { minutes, seconds, totalMinutes };
  };

  // Calculate time elapsed from current station
  const calculateTimeElapsed = (train: TrainPosition) => {
    const minutesPerSegment = 5;
    const elapsedProgress = train.progress;
    const totalMinutes = elapsedProgress * minutesPerSegment;
    const minutes = Math.floor(totalMinutes);
    const seconds = Math.round((totalMinutes - minutes) * 60);
    
    return { minutes, seconds, totalMinutes };
  };

  return (
    <>
      {trainPositions.map(train => {
        const currentStation = stations[train.currentSegment];
        const nextStationIndex = (train.currentSegment + 1) % totalStations;
        const nextStation = stations[nextStationIndex];
        const timeRemaining = calculateTimeRemaining(train);
        const timeElapsed = calculateTimeElapsed(train);
        const crowdingInfo = getCrowdingInfo(train.passengerCount, train.passengerCapacity);

        return (
          <div 
            key={train.trainId}
            className="relative overflow-hidden rounded-2xl shadow-xl p-6 text-white border border-white/20 flex-shrink-0 w-[90vw] sm:w-[75vw] lg:w-auto"
            style={{
              background: `linear-gradient(135deg, ${train.color}dd, ${train.color})`
            }}
          >
            {/* Animated background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            {/* Glow effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
            
            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 shadow-xl">
                    <Bus className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{train.trainName}</h3>
                    <p className="text-blue-100 text-sm flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {currentTime.toLocaleTimeString('th-TH')}
                    </p>
                  </div>
                </div>
                
                {/* Live badge */}
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </div>
              </div>

              {/* Status card */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 mb-4 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-blue-100 font-semibold">สถานะการเดินทาง</span>
                </div>
                <p className="text-xl font-bold">{getStatus(train)}</p>
              </div>

              {/* Current and next stations */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-yellow-900 font-black text-sm">P{currentStation?.id}</span>
                    </div>
                    <span className="text-xs text-blue-100 font-semibold">จุดจอดปัจจุบัน</span>
                  </div>
                  <p className="font-bold truncate">{currentStation?.nameTh || 'N/A'}</p>
                  <p className="text-sm text-blue-100 truncate">{currentStation?.name}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/15 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-green-400 rounded-lg flex items-center justify-center shadow-lg">
                      <span className="text-green-900 font-black text-sm">P{nextStation?.id}</span>
                    </div>
                    <span className="text-xs text-blue-100 font-semibold">จุดจอดถัดไป</span>
                  </div>
                  <p className="font-bold truncate">{nextStation?.nameTh || 'N/A'}</p>
                  <p className="text-sm text-blue-100 truncate">{nextStation?.name}</p>
                </div>
              </div>

              {/* Progress section */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 mb-4 border border-white/20">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-blue-100 font-semibold">
                    {train.isParked ? '⏱️ เวลาจอดคงเหลือ' : '🚀 ความคืบหน้า'}
                  </span>
                  <span className="text-2xl font-black">
                    {train.isParked ? (
                      <>
                        {Math.floor(train.parkingTimeRemaining)}<span className="text-base font-semibold">s</span>
                      </>
                    ) : (
                      <>
                        {timeRemaining.minutes}:{timeRemaining.seconds.toString().padStart(2, '0')}<span className="text-base font-semibold">min</span>
                      </>
                    )}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="relative w-full bg-white/20 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className={`${train.isParked ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 'bg-gradient-to-r from-green-400 to-emerald-500'} h-4 transition-all duration-500 relative overflow-hidden`}
                    style={{ 
                      width: train.isParked 
                        ? `${(1 - train.parkingTimeRemaining / 30) * 100}%` 
                        : `${train.progress * 100}%` 
                    }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-3 text-xs text-blue-100">
                  {train.isParked ? (
                    <>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        กำลังจอด รับ-ส่งผู้โดยสาร
                      </span>
                      <span className="font-semibold">{Math.ceil(train.parkingTimeRemaining)}s เหลือ</span>
                    </>
                  ) : (
                    <>
                      <span>ผ่านมา {timeElapsed.minutes}:{timeElapsed.seconds.toString().padStart(2, '0')}</span>
                      <span className="font-semibold">เหลือ {timeRemaining.minutes}:{timeRemaining.seconds.toString().padStart(2, '0')}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Speed indicator */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Zap className="w-5 h-5 text-yellow-300" />
                  </div>
                  <span className="text-sm text-blue-100 font-semibold">ความเร็วปัจจุบัน</span>
                </div>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-black">{train.speed}</p>
                  <span className="text-lg font-semibold mb-1">กม./ชม.</span>
                  {train.isParked && (
                    <span className="ml-2 mb-1 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full animate-pulse">
                      จอด
                    </span>
                  )}
                </div>
              </div>

              {/* Crowding level */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 mb-4 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-blue-100 font-semibold">ระดับความแออัด</span>
                </div>
                
                {/* Passenger count */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{crowdingInfo.icon}</span>
                    <div>
                      <p className="text-2xl font-black">{crowdingInfo.level}</p>
                      <p className="text-sm text-blue-100">
                        {train.passengerCount} / {train.passengerCapacity} คน
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black">
                      {Math.round((train.passengerCount / train.passengerCapacity) * 100)}%
                    </p>
                  </div>
                </div>
                
                {/* Visual bar */}
                <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${crowdingInfo.color} h-3 transition-all duration-500`}
                    style={{ width: `${(train.passengerCount / train.passengerCapacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}