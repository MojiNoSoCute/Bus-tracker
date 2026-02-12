import { Schedule, Station } from '../types/train';
import { Clock, Calendar } from 'lucide-react';

interface ScheduleTableProps {
  schedules: Schedule[];
  stations: Station[];
}

export function ScheduleTable({ schedules, stations }: ScheduleTableProps) {
  return (
    <div className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-2xl p-8 border border-indigo-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">ตารางเวลารถเมล์ไฟฟ้า</h2>
          <p className="text-sm text-slate-500">เส้นทางวนรอบ - ประจำวันจันทร์ - ศุกร์</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border-2 border-indigo-200 shadow-inner">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <th className="text-left py-4 px-6 font-bold">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  เวลาออก
                </div>
              </th>
              {stations.map(station => (
                <th key={station.id} className="text-center py-4 px-3">
                  <div className="font-bold">{station.nameTh}</div>
                  <div className="text-xs text-indigo-200 font-semibold">P{station.id}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, idx) => (
              <tr 
                key={idx} 
                className={`border-b border-indigo-100 transition-all hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-indigo-50/30'
                }`}
              >
                <td className="py-4 px-6 font-bold text-indigo-600">
                  {schedule.departureTime}
                </td>
                {stations.map(station => (
                  <td key={station.id} className="text-center py-4 px-3">
                    <span className="inline-block bg-gradient-to-br from-slate-100 to-slate-200 hover:from-indigo-100 hover:to-purple-100 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:shadow-md">
                      {schedule.arrivalTimes[station.id]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
        <p className="text-sm text-slate-700">
          <strong className="text-indigo-700">💡 หมายเหตุ:</strong> รถเมล์ไฟฟ้าวิ่งเป็นเส้นทางวนรอบ หลังจากจุดสุดท้ายจะกลับมาที่จุดเริ่มต้นซ้ำ • ตารางเวลาอาจมีการเปลี่ยนแปลงตามสภาพการจราจร
        </p>
      </div>
    </div>
  );
}