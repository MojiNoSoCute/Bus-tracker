export interface Station {
  id: number;
  name: string;
  nameTh: string;
  position: {
    x: number;
    y: number;
  };
  facilities: string[];
}

export interface Schedule {
  departureTime: string;
  arrivalTimes: { [stationId: number]: string };
}

export interface TrainPosition {
  trainId: number;
  trainName: string;
  color: string; // Color for visual identification
  currentSegment: number; // Between station N and N+1
  progress: number; // 0 to 1
  nextStationId: number;
  speed: number;
  isParked: boolean; // Is the bus currently parked at a station?
  parkingTimeRemaining: number; // Seconds remaining at the station
  passengerCount: number; // Current number of passengers (0-40)
  passengerCapacity: number; // Maximum capacity (40)
}

export interface MultiTrainPosition {
  trains: TrainPosition[];
}