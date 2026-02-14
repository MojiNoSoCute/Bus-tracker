import { useState } from 'react';
import { RouteMap } from './RouteMap';
import { LiveTrainStatus } from './LiveTrainStatus';
import { ScheduleTable } from './ScheduleTable';
import { ArrivalEstimates } from './ArrivalEstimates';
import { ReportIssue } from './ReportIssue';
import { Bus, Calendar, MapPin, Info, Sparkles, AlertCircle } from 'lucide-react';
import { useTrainSimulation } from '../hooks/useTrainSimulation';
import { stations, schedules } from '../data/stations';

export function TrainTracker() {
  const [activeTab, setActiveTab] = useState<'live' | 'schedule' | 'stations' | 'report'>('live');
  const { trainPositions, currentTime } = useTrainSimulation(stations.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50/30">
      {/* Header - Mobile optimized */}
      <div className="relative bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white shadow-xl overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-6 md:px-6 md:py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl"></div>
                <div className="relative p-3 md:p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 shadow-xl">
                  <Bus className="w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>
              <div>
                <h1 className="text-xl md:text-4xl font-bold mb-1 flex items-center gap-2 md:gap-3">
                  ระบบติดตามรถเมล์ไฟฟ้า
                  <span className="inline-flex items-center gap-1 bg-yellow-400 text-yellow-900 text-xs md:text-sm font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                    LIVE
                  </span>
                </h1>
                <p className="text-blue-50 text-sm md:text-lg">ม.ราชภัฏนครปฐม • {trainPositions.length} คัน</p>
              </div>
            </div>
            
            {/* Current time display */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl px-3 py-2 md:px-6 md:py-3 border border-white/30 shadow-lg">
              <div className="text-xs md:text-sm text-blue-50 mb-0.5 md:mb-1">เวลา</div>
              <div className="text-base md:text-2xl font-bold">
                {currentTime.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-6 md:h-auto">
            <path d="M0 48h1440V0s-180 48-720 48S0 0 0 0v48z" fill="rgb(248 250 252)" />
          </svg>
        </div>
      </div>

      {/* Navigation Tabs - Mobile optimized */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-lg shadow-md border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('live')}
              className={`group relative flex items-center gap-2 px-6 md:px-8 py-4 md:py-5 transition-all text-sm md:text-base font-semibold ${
                activeTab === 'live'
                  ? 'text-red-600'
                  : 'text-slate-600 hover:text-red-600'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>ติดตามสด</span>
              {activeTab === 'live' && (
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-t-full"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-t-full blur-sm"></div>
                </>
              )}
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`group relative flex items-center gap-2 px-6 md:px-8 py-4 md:py-5 transition-all text-sm md:text-base font-semibold ${
                activeTab === 'schedule'
                  ? 'text-red-600'
                  : 'text-slate-600 hover:text-red-600'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>ตารางเวลา</span>
              {activeTab === 'schedule' && (
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-t-full"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-t-full blur-sm"></div>
                </>
              )}
            </button>
            <button
              onClick={() => setActiveTab('stations')}
              className={`group relative flex items-center gap-2 px-6 md:px-8 py-4 md:py-5 transition-all text-sm md:text-base font-semibold ${
                activeTab === 'stations'
                  ? 'text-red-600'
                  : 'text-slate-600 hover:text-red-600'
              }`}
            >
              <Info className="w-5 h-5" />
              <span className="hidden sm:inline">ข้อมูลจุดจอด</span>
              <span className="sm:hidden">จุดจอด</span>
              {activeTab === 'stations' && (
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-t-full"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-t-full blur-sm"></div>
                </>
              )}
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`group relative flex items-center gap-2 px-6 md:px-8 py-4 md:py-5 transition-all text-sm md:text-base font-semibold ${
                activeTab === 'report'
                  ? 'text-red-600'
                  : 'text-slate-600 hover:text-red-600'
              }`}
            >
              <AlertCircle className="w-5 h-5" />
              <span>รายงานปัญหา</span>
              {activeTab === 'report' && (
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-t-full"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-t-full blur-sm"></div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Content - Mobile optimized */}
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        {activeTab === 'live' && (
          <div className="space-y-6 md:space-y-8">
            {/* Route Map - Full width at top */}
            <div className="w-full">
              <RouteMap stations={stations} trainPositions={trainPositions} />
            </div>

            {/* Train Status Cards - Horizontal scrollable on mobile, grid on desktop */}
            <div className="w-full overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex lg:grid lg:grid-cols-3 gap-6">
                <LiveTrainStatus
                  stations={stations}
                  trainPositions={trainPositions}
                  currentTime={currentTime}
                />
              </div>
            </div>

            {/* Arrival Estimates - Full width at bottom */}
            <div className="w-full">
              <ArrivalEstimates
                stations={stations}
                trainPositions={trainPositions}
                currentTime={currentTime}
              />
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="space-y-6">
            <ScheduleTable schedules={schedules} stations={stations} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg p-8 border border-blue-200">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/50 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">ข้อมูลการให้บริการ</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">วันให้บริการ</span>
                      <span className="font-semibold text-slate-800">จันทร์ - ศุกร์</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">เวลาให้บริการ</span>
                      <span className="font-semibold text-slate-800">08:00 - 16:45 น.</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">ความถี่</span>
                      <span className="font-semibold text-slate-800">ทุก 30 นาที</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">ระยะเวลาเดินทางรอบเดียว</span>
                      <span className="font-semibold text-slate-800">ประมาณ 45-50 นาที</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-slate-600">ประเภทเส้นทาง</span>
                      <span className="font-semibold text-slate-800">วนรอบ (Circular Route)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg p-8 border border-red-200">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100/50 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl shadow-lg">
                      <Bus className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">ข้อมูลรถเมล์ไฟฟ้า</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">จำนวนรถ</span>
                      <span className="font-semibold text-slate-800">{trainPositions.length} คัน</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">ความจุ</span>
                      <span className="font-semibold text-slate-800">40 ที่นั่ง/คัน</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">ความเร็วสูงสุด</span>
                      <span className="font-semibold text-slate-800">30 กม./ชม.</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">ความเร็วเฉลี่ย</span>
                      <span className="font-semibold text-slate-800">20 กม./ชม.</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600">ระบบขับเคลื่อน</span>
                      <span className="font-semibold text-slate-800">พลังงานไฟฟ้า 100%</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-slate-600">จุดจอดทั้งหมด</span>
                      <span className="font-semibold text-slate-800">{stations.length} จุด</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stations.map(station => (
              <div key={station.id} className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-slate-200">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500"></div>
                
                <div className="bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 p-6 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-6 -mb-6"></div>
                  
                  <div className="relative flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl font-black border border-white/30 shadow-xl">
                      {station.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">{station.nameTh}</h3>
                      <p className="text-sm text-blue-50">{station.name}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4 pb-4 border-b border-slate-200">
                    <span className="text-sm text-slate-500 block mb-1">รหัสสถานี</span>
                    <p className="text-2xl font-bold bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">S{station.id}</p>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm text-slate-500 block mb-3">สิ่งอำนวยความสะดวก</span>
                    <div className="flex flex-wrap gap-2">
                      {station.facilities.map((facility, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <span className="text-sm text-slate-500 block mb-2">ตำแหน่งบนแผนที่</span>
                    <div className="flex gap-3">
                      <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center border border-slate-200">
                        <span className="text-xs text-slate-500 block">X</span>
                        <span className="text-sm font-semibold text-slate-700">{station.position.x}</span>
                      </div>
                      <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center border border-slate-200">
                        <span className="text-xs text-slate-500 block">Y</span>
                        <span className="text-sm font-semibold text-slate-700">{station.position.y}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'report' && (
          <div className="space-y-6">
            <ReportIssue stations={stations} trainPositions={trainPositions} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white mt-20">
        <div className="container mx-auto px-4 py-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bus className="w-6 h-6 text-emerald-400" />
              <p className="text-base text-slate-300">
                © 2026 มหาวิทยาลัยราชภัฏนครปฐม | ระบบติดตามรถเมล์ไฟฟ้า
              </p>
            </div>
            <p className="text-sm text-slate-400">
              ข้อมูลในระบบเป็นเพียงต้นแบบสำหรับการสาธิต - เส้นทางวนรอบภายในมหาวิทยาลัย • {trainPositions.length} คันให้บริการ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}