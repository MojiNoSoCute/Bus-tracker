import { Station, TrainPosition } from '../types/train';
import { AlertCircle, MapPin, Bus, Clock, Send, CheckCircle2, MessageSquare, User, Phone } from 'lucide-react';
import { useState } from 'react';

interface ReportIssueProps {
  stations: Station[];
  trainPositions: TrainPosition[];
}

interface ReportForm {
  issueType: string;
  stationId: string;
  trainId: string;
  description: string;
  contactName: string;
  contactPhone: string;
}

export function ReportIssue({ stations, trainPositions }: ReportIssueProps) {
  const [formData, setFormData] = useState<ReportForm>({
    issueType: '',
    stationId: '',
    trainId: '',
    description: '',
    contactName: '',
    contactPhone: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const issueTypes = [
    { value: 'train_delay', label: 'รถเมล์มาช้า', icon: '⏰' },
    { value: 'train_full', label: 'รถเมล์เต็ม/แออัด', icon: '👥' },
    { value: 'train_breakdown', label: 'รถเมล์เสีย', icon: '🔧' },
    { value: 'station_facility', label: 'สิ่งอำนวยความสะดวกเสีย', icon: '🚏' },
    { value: 'safety', label: 'ปัญหาความปลอดภัย', icon: '⚠️' },
    { value: 'cleanliness', label: 'ความสะอาด', icon: '🧹' },
    { value: 'driver_behavior', label: 'พฤติกรรมคนขับ', icon: '👤' },
    { value: 'other', label: 'อื่นๆ', icon: '📝' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        issueType: '',
        stationId: '',
        trainId: '',
        description: '',
        contactName: '',
        contactPhone: '',
      });
    }, 3000);
  };

  const handleChange = (field: keyof ReportForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative inline-flex mb-6">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl">
              <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-white" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
            ส่งรายงานสำเร็จ!
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto">
            ขอบคุณที่แจ้งปัญหา ทีมงานจะดำเนินการตรวจสอบและแก้ไขโดยเร็วที่สุด
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200">
            <Clock className="w-4 h-4" />
            เวลาประมวลผล: 24-48 ชั่วโมง
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-8 border border-blue-200/50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-600 rounded-xl md:rounded-2xl blur-lg md:blur-xl opacity-50"></div>
          <div className="relative p-2 md:p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl md:rounded-2xl shadow-lg">
            <AlertCircle className="w-5 h-5 md:w-7 md:h-7 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            รายงานปัญหา
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-0.5 md:mt-1">
            แจ้งปัญหาเพื่อให้ทีมงานดำเนินการแก้ไข
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Issue Type Selection */}
        <div>
          <label className="block text-sm md:text-base font-semibold text-slate-700 mb-2 md:mb-3">
            ประเภทปัญหา <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
            {issueTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => handleChange('issueType', type.value)}
                className={`relative p-3 md:p-4 rounded-xl border-2 transition-all text-left ${
                  formData.issueType === type.value
                    ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="text-2xl md:text-3xl mb-1 md:mb-2">{type.icon}</div>
                <div className="text-xs md:text-sm font-semibold text-slate-700 leading-tight">
                  {type.label}
                </div>
                {formData.issueType === type.value && (
                  <div className="absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Station Selection */}
        <div>
          <label className="block text-sm md:text-base font-semibold text-slate-700 mb-2 md:mb-3">
            <MapPin className="w-4 h-4 inline-block mr-1 mb-0.5" />
            จุดจอดที่เกี่ยวข้อง (ถ้ามี)
          </label>
          <select
            value={formData.stationId}
            onChange={(e) => handleChange('stationId', e.target.value)}
            className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base rounded-xl border-2 border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          >
            <option value="">-- เลือกจุดจอด --</option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                P{station.id} - {station.nameTh}
              </option>
            ))}
          </select>
        </div>

        {/* Train Selection */}
        <div>
          <label className="block text-sm md:text-base font-semibold text-slate-700 mb-2 md:mb-3">
            <Bus className="w-4 h-4 inline-block mr-1 mb-0.5" />
            รถเมล์ที่เกี่ยวข้อง (ถ้ามี)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
            {trainPositions.map((train) => (
              <button
                key={train.trainId}
                type="button"
                onClick={() => handleChange('trainId', train.trainId)}
                className={`relative p-3 md:p-4 rounded-xl border-2 transition-all ${
                  formData.trainId === train.trainId
                    ? 'border-2 shadow-lg scale-105'
                    : 'border-slate-200 bg-white hover:border-opacity-50 hover:shadow-md'
                }`}
                style={{
                  borderColor: formData.trainId === train.trainId ? train.color : undefined,
                  backgroundColor: formData.trainId === train.trainId ? `${train.color}15` : undefined,
                }}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-md"
                    style={{ backgroundColor: train.color }}
                  >
                    <Bus className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-bold text-sm md:text-base text-slate-800">
                      {train.trainName}
                    </div>
                    <div className="text-xs text-slate-500">
                      รถคัน {train.trainId}
                    </div>
                  </div>
                  {formData.trainId === train.trainId && (
                    <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" style={{ color: train.color }} />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm md:text-base font-semibold text-slate-700 mb-2 md:mb-3">
            <MessageSquare className="w-4 h-4 inline-block mr-1 mb-0.5" />
            รายละเอียดปัญหา <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            required
            rows={4}
            placeholder="โปรดอธิบายปัญหาที่พบอย่างละเอียด..."
            className="w-full px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base rounded-xl border-2 border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
          />
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50/50 rounded-xl p-4 md:p-5 border border-blue-200">
          <h3 className="font-semibold text-sm md:text-base text-slate-700 mb-3 md:mb-4">
            ข้อมูลติดต่อ (ไม่บังคับ)
          </h3>
          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-slate-600 mb-1.5 md:mb-2">
                <User className="w-3.5 h-3.5 inline-block mr-1 mb-0.5" />
                ชื่อ-นามสกุล
              </label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) => handleChange('contactName', e.target.value)}
                placeholder="กรอกชื่อของคุณ"
                className="w-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base rounded-lg border-2 border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-slate-600 mb-1.5 md:mb-2">
                <Phone className="w-3.5 h-3.5 inline-block mr-1 mb-0.5" />
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => handleChange('contactPhone', e.target.value)}
                placeholder="0XX-XXX-XXXX"
                className="w-full px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base rounded-lg border-2 border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={!formData.issueType || !formData.description || isSubmitting}
            className={`flex-1 relative overflow-hidden group ${
              !formData.issueType || !formData.description || isSubmitting
                ? 'bg-slate-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
            } text-white font-bold py-3 md:py-4 px-6 rounded-xl transition-all`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                กำลังส่ง...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4 md:w-5 md:h-5" />
                ส่งรายงาน
              </span>
            )}
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 md:p-4 flex items-start gap-2 md:gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs md:text-sm text-amber-800">
            <strong>หมายเหตุ:</strong> ข้อมูลที่คุณส่งจะถูกใช้เพื่อปรับปรุงระบบเท่านั้น 
            หากเป็นกรณีฉุกเฉิน โปรดติดต่อเจ้าหน้าที่โดยตรงที่ <strong>Tel: 034-xxx-xxx</strong>
          </div>
        </div>
      </form>
    </div>
  );
}
