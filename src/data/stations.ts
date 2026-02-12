import { Station, Schedule } from '../types/train';

export const stations: Station[] = [
  {
    id: 1,
    name: "Main Gate",
    nameTh: "ประตูหลัก",
    position: { x: 150, y: 100 },
    facilities: ["ที่จอดรถ", "ห้องน้ำ"]
  },
  {
    id: 2,
    name: "Faculty of Education",
    nameTh: "คณะครุศาสตร์",
    position: { x: 350, y: 80 },
    facilities: ["ห้องน้ำ", "ร้านค้า"]
  },
  {
    id: 3,
    name: "Central Library",
    nameTh: "หอสมุดกลาง",
    position: { x: 550, y: 100 },
    facilities: ["ห้องน้ำ", "Wi-Fi", "ร้านกาแฟ"]
  },
  {
    id: 4,
    name: "Science Building",
    nameTh: "อาคารวิทยาศาสตร์",
    position: { x: 700, y: 150 },
    facilities: ["ห้องน้ำ"]
  },
  {
    id: 5,
    name: "Sports Complex",
    nameTh: "อาคารกีฬา",
    position: { x: 800, y: 250 },
    facilities: ["ห้องน้ำ", "ร้านค้า", "ที่จอดรถ"]
  },
  {
    id: 6,
    name: "Student Dormitory",
    nameTh: "หอพักนักศึกษา",
    position: { x: 750, y: 370 },
    facilities: ["ห้องน้ำ", "ร้านสะดวกซื้อ"]
  },
  {
    id: 7,
    name: "Engineering Faculty",
    nameTh: "คณะวิศวกรรมศาสตร์",
    position: { x: 600, y: 420 },
    facilities: ["ห้องน้ำ", "ที่จอดรถ"]
  },
  {
    id: 8,
    name: "Administration Building",
    nameTh: "อาคารบริหาร",
    position: { x: 400, y: 400 },
    facilities: ["ห้องน้ำ", "ธนาคาร", "ร้านค้า"]
  },
  {
    id: 9,
    name: "Canteen",
    nameTh: "โรงอาหาร",
    position: { x: 200, y: 350 },
    facilities: ["ห้องน้ำ", "ร้านอาหาร", "Wi-Fi"]
  },
  {
    id: 10,
    name: "Medical Center",
    nameTh: "ศูนย์แพทย์",
    position: { x: 120, y: 230 },
    facilities: ["ห้องน้ำ", "ร้านขายยา"]
  }
];

export const schedules: Schedule[] = [
  {
    departureTime: "08:00",
    arrivalTimes: {
      1: "08:00",
      2: "08:05",
      3: "08:10",
      4: "08:15",
      5: "08:20",
      6: "08:25",
      7: "08:30",
      8: "08:35",
      9: "08:40",
      10: "08:45"
    }
  },
  {
    departureTime: "08:30",
    arrivalTimes: {
      1: "08:30",
      2: "08:35",
      3: "08:40",
      4: "08:45",
      5: "08:50",
      6: "08:55",
      7: "09:00",
      8: "09:05",
      9: "09:10",
      10: "09:15"
    }
  },
  {
    departureTime: "09:00",
    arrivalTimes: {
      1: "09:00",
      2: "09:05",
      3: "09:10",
      4: "09:15",
      5: "09:20",
      6: "09:25",
      7: "09:30",
      8: "09:35",
      9: "09:40",
      10: "09:45"
    }
  },
  {
    departureTime: "10:00",
    arrivalTimes: {
      1: "10:00",
      2: "10:05",
      3: "10:10",
      4: "10:15",
      5: "10:20",
      6: "10:25",
      7: "10:30",
      8: "10:35",
      9: "10:40",
      10: "10:45"
    }
  },
  {
    departureTime: "11:00",
    arrivalTimes: {
      1: "11:00",
      2: "11:05",
      3: "11:10",
      4: "11:15",
      5: "11:20",
      6: "11:25",
      7: "11:30",
      8: "11:35",
      9: "11:40",
      10: "11:45"
    }
  },
  {
    departureTime: "12:00",
    arrivalTimes: {
      1: "12:00",
      2: "12:05",
      3: "12:10",
      4: "12:15",
      5: "12:20",
      6: "12:25",
      7: "12:30",
      8: "12:35",
      9: "12:40",
      10: "12:45"
    }
  },
  {
    departureTime: "13:00",
    arrivalTimes: {
      1: "13:00",
      2: "13:05",
      3: "13:10",
      4: "13:15",
      5: "13:20",
      6: "13:25",
      7: "13:30",
      8: "13:35",
      9: "13:40",
      10: "13:45"
    }
  },
  {
    departureTime: "14:00",
    arrivalTimes: {
      1: "14:00",
      2: "14:05",
      3: "14:10",
      4: "14:15",
      5: "14:20",
      6: "14:25",
      7: "14:30",
      8: "14:35",
      9: "14:40",
      10: "14:45"
    }
  },
  {
    departureTime: "15:00",
    arrivalTimes: {
      1: "15:00",
      2: "15:05",
      3: "15:10",
      4: "15:15",
      5: "15:20",
      6: "15:25",
      7: "15:30",
      8: "15:35",
      9: "15:40",
      10: "15:45"
    }
  },
  {
    departureTime: "16:00",
    arrivalTimes: {
      1: "16:00",
      2: "16:05",
      3: "16:10",
      4: "16:15",
      5: "16:20",
      6: "16:25",
      7: "16:30",
      8: "16:35",
      9: "16:40",
      10: "16:45"
    }
  }
];