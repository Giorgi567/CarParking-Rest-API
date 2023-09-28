import { CronJob } from 'cron';
import { getConnection } from 'typeorm';
import { ParkingZoneEntity } from 'src/Entity/parking.entity';
import { CarEntity } from 'src/Entity/cars.entity';

// Function to periodically check and update reservation statuses
export const checkReservationStatus = async () => {
  const connection = getConnection();
  const reservationRepository = connection.getRepository(ParkingZoneEntity);
  const carRepository = connection.getRepository(CarEntity);

  const reservations = await reservationRepository.find({
    where: { expired: true },
  });

  if (!reservations || reservations.length === 0) {
    return;
  }

  for (const reservation of reservations) {
    if (reservation.endTime <= new Date()) {
      // Mark the reservation as expired in the database
      reservation.expired = true;

      if (reservation.expired) {
        const car = await carRepository.findOne({
          where: { id: reservation.id },
        });

        if (car) {
          // Remove the car from parkingOnGoingistory
          const index = reservation.parkingOnGoingistory.indexOf(car);
          if (index !== -1) {
            reservation.parkingOnGoingistory.splice(index, 1);
          }

          // Add the car to parkingExpiredHistory
          reservation.parkingExpiredHistory.push(car);

          // Save the reservation
          await reservationRepository.save(reservation);
        }
      }
    }
  }
};
