const express = require('express');
const router = express.Router();
const { connectDB, sql } = require('../config/db.js');

// Create a new event
router.post('/', async (req, res) => {
  try {
    const {
      EventID,
      StartDate,
      EndDate,
      EventType,
      EventHost,
      EventName,
      Location,
      EventDescription,
      Agenda,
      ICRAttendees,
      ClientAttendees,
      Rating,
      PostEventNotes,
      RegistrationLink
    } = req.body;

    const pool = await connectDB();
    
    const result = await pool.request()
      .input('EventID', sql.VarChar(50), EventID)
      .input('StartDate', sql.DateTime, StartDate || null)
      .input('EndDate', sql.DateTime, EndDate || null)
      .input('EventType', sql.VarChar(100), EventType)
      .input('EventHost', sql.VarChar(200), EventHost)
      .input('EventName', sql.VarChar(500), EventName)
      .input('Location', sql.VarChar(500), Location)
      .input('EventDescription', sql.VarChar(sql.MAX), EventDescription)
      .input('Agenda', sql.VarChar(sql.MAX), Agenda)
      .input('ICRAttendees', sql.VarChar(sql.MAX), ICRAttendees)
      .input('ClientAttendees', sql.VarChar(sql.MAX), ClientAttendees)
      .input('Rating', sql.VarChar(10), Rating)
      .input('PostEventNotes', sql.VarChar(sql.MAX), PostEventNotes)
      .input('RegistrationLink', sql.VarChar(1000), RegistrationLink)
      .query(`
        INSERT INTO dbo.WebEventTracker (
          EventID, StartDate, EndDate, EventType, EventHost,
          EventName, Location, EventDescription, Agenda,
          ICRAttendees, ClientAttendees, Rating, PostEventNotes,
          RegistrationLink
        )
        OUTPUT INSERTED.ID
        VALUES (
          @EventID, @StartDate, @EndDate, @EventType, @EventHost,
          @EventName, @Location, @EventDescription, @Agenda,
          @ICRAttendees, @ClientAttendees, @Rating, @PostEventNotes,
          @RegistrationLink
        )
      `);

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      id: result.recordset[0].ID
    });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({
      success: false,
      message: 'Error creating event',
      error: err.message
    });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`
      SELECT 
        ID, EventID, StartDate, EndDate, EventType, EventHost,
        EventName, Location, EventDescription, Agenda,
        ICRAttendees, ClientAttendees, Rating, PostEventNotes,
        RegistrationLink
      FROM dbo.WebEventTracker
      ORDER BY StartDate DESC
    `);

    res.json({
      success: true,
      data: result.recordset
    });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching events',
      error: err.message
    });
  }
});

// Get single event by ID
router.get('/:id', async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query(`
        SELECT 
          ID, EventID, StartDate, EndDate, EventType, EventHost,
          EventName, Location, EventDescription, Agenda,
          ICRAttendees, ClientAttendees, Rating, PostEventNotes,
          RegistrationLink
        FROM dbo.WebEventTracker
        WHERE ID = @id
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    res.json({
      success: true,
      data: result.recordset[0]
    });
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({
      success: false,
      message: 'Error fetching event',
      error: err.message
    });
  }
});

module.exports = router;