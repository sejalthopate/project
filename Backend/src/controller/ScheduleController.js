import {Schedule} from '../models/ScheduleModel.js';

export const createOrUpdateSchedule = async (req, res) => {
  const { department, year, timetable } = req.body;

  try {
    let schedule = await Schedule.findOne({ department, year });

    if (schedule) {
      schedule.timetable = timetable;
      await schedule.save();
      return res.status(200).json({ success: true, message: "Schedule updated", schedule });
    }

    const newSchedule = new Schedule({ department, year, timetable });
    await newSchedule.save();
    res.status(201).json({ success: true, message: "Schedule created", schedule: newSchedule });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getScheduleByDeptYear = async (req, res) => {
  const { department, year } = req.params;

  try {
    const schedule = await Schedule.findOne({ department, year });

    if (!schedule) {
      return res.status(404).json({ success: false, message: "Schedule not found" });
    }

    res.status(200).json({ success: true, schedule: schedule.timetable });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json({ success: true, schedules });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};