import { Request, Response } from 'express';

const checkAvailability = async (req: Request, res: Response) => {
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate() + 1).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  };

  const queryDate = req.query.date || getTodayDate();

  const availableSlot = [];
  const totalAvaliableHour = { startTime: '10:00', endTime: '20:00' };

  const startTime = new Date(`${queryDate}T${totalAvaliableHour.startTime}`);
  const endTime = new Date(`${queryDate}T${totalAvaliableHour.endTime}`);

  for (
    let time = startTime;
    time < endTime;
    time.setHours(time.getHours() + 2)
  ) {
    const slotStartTime = new Date(time);
    const slotEndTime = new Date(time);
    slotEndTime.setHours(slotEndTime.getHours() + 2);

    availableSlot.push({
      startTime: slotStartTime.toTimeString().slice(0, 5),
      endTime: slotEndTime.toTimeString().slice(0, 5),
    });
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Available time slots retrieved successfully',
    data: availableSlot,
  });
};

export { checkAvailability };
