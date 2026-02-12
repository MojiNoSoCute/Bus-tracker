import { useState, useEffect } from 'react';
import { TrainPosition } from '../types/train';

const PARKING_DURATION = 30; // 30 seconds parking time at each station

// Define 3 trains with different starting positions and colors
const TRAINS = [
  {
    trainId: 1,
    trainName: 'รถเมล์ที่ 1',
    color: '#14b8a6', // Teal
    initialSegment: 0,
    initialProgress: 0
  },
  {
    trainId: 2,
    trainName: 'รถเมล์ที่ 2',
    color: '#f59e0b', // Amber
    initialSegment: 3, // Start 3 stations behind (30 minutes)
    initialProgress: 0.5
  },
  {
    trainId: 3,
    trainName: 'รถเมล์ที่ 3',
    color: '#8b5cf6', // Purple
    initialSegment: 7, // Start 7 stations behind (60 minutes)
    initialProgress: 0
  }
];

const PASSENGER_CAPACITY = 40;

export function useTrainSimulation(totalStations: number) {
  const [trainPositions, setTrainPositions] = useState<TrainPosition[]>(
    TRAINS.map(train => ({
      trainId: train.trainId,
      trainName: train.trainName,
      color: train.color,
      currentSegment: train.initialSegment,
      progress: train.initialProgress,
      nextStationId: ((train.initialSegment + 1) % totalStations) || totalStations,
      speed: 0,
      isParked: true,
      parkingTimeRemaining: PARKING_DURATION,
      passengerCount: Math.floor(Math.random() * 20) + 10, // Start with 10-30 passengers
      passengerCapacity: PASSENGER_CAPACITY
    }))
  );

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      setTrainPositions(prevTrains => 
        prevTrains.map(train => {
          // If parked, count down parking time
          if (train.isParked) {
            const newParkingTime = train.parkingTimeRemaining - 0.1;
            
            if (newParkingTime <= 0) {
              // Finished parking, start moving
              return {
                ...train,
                isParked: false,
                parkingTimeRemaining: 0,
                speed: 10,
                progress: 0.01
              };
            }
            
            return {
              ...train,
              parkingTimeRemaining: newParkingTime,
              speed: 0
            };
          }
          
          // Moving between stations
          let newProgress = train.progress + 0.008;
          let newSegment = train.currentSegment;
          let newSpeed = train.speed;

          // Simulate speed changes
          if (newProgress < 0.15) {
            newSpeed = 10; // Accelerating from station
          } else if (newProgress > 0.85) {
            newSpeed = 10; // Decelerating to station
          } else {
            newSpeed = 25; // Normal speed between stations
          }

          // Reached next station - start parking
          if (newProgress >= 1) {
            newSegment = (train.currentSegment + 1) % totalStations;
            
            // Simulate passenger changes when arriving at station
            const passengersGettingOff = Math.floor(Math.random() * 8); // 0-7 passengers leaving
            const passengersGettingOn = Math.floor(Math.random() * 10); // 0-9 passengers boarding
            const newPassengerCount = Math.min(
              PASSENGER_CAPACITY, 
              Math.max(0, train.passengerCount - passengersGettingOff + passengersGettingOn)
            );
            
            return {
              ...train,
              currentSegment: newSegment,
              progress: 1,
              nextStationId: ((newSegment + 1) % totalStations) || totalStations,
              speed: 0,
              isParked: true,
              parkingTimeRemaining: PARKING_DURATION,
              passengerCount: newPassengerCount
            };
          }

          const nextStationId = (newSegment + 1) % totalStations;

          return {
            ...train,
            currentSegment: newSegment,
            progress: newProgress,
            nextStationId: nextStationId === 0 ? totalStations : nextStationId,
            speed: newSpeed,
            isParked: false,
            parkingTimeRemaining: 0
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, [totalStations]);

  return { trainPositions, currentTime };
}