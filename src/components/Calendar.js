import React, { useState, useEffect } from "react";
import WeatherDisplay from "./WeatherDisplay";

const Calendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [journalEntry, setJournalEntry] = useState("");
  const [journalEntriesForDay, setJournalEntriesForDay] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load journal entries for the selected day from local storage
    if (selectedDay !== null) {
      const entryKey = `${currentYear}-${currentMonth}-${selectedDay}`;
      const storedEntries = localStorage.getItem(entryKey);
      if (storedEntries) {
        setJournalEntriesForDay(JSON.parse(storedEntries));
      } else {
        setJournalEntriesForDay([]);
      }
      setJournalEntry(""); // Clear journal entry input
    }
  }, [currentYear, currentMonth, selectedDay]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleJournalChange = (event) => {
    setJournalEntry(event.target.value);
  };

  const saveJournalEntry = () => {
    if (selectedDay !== null && journalEntry.trim() !== "") {
      const entryKey = `${currentYear}-${currentMonth}-${selectedDay}`;
      let storedEntries = localStorage.getItem(entryKey);

      try {
        // Parse existing entries or initialize an empty array
        let entries = storedEntries ? JSON.parse(storedEntries) : [];

        // Add the new journal entry to the array
        entries.push(journalEntry);

        // Store the updated entries back in local storage
        localStorage.setItem(entryKey, JSON.stringify(entries));

        setIsModalOpen(false);
      } catch (error) {
        console.error("Error parsing JSON data:", error);
        // Handle parsing error (e.g., log error message, provide default behavior)
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth - 1;
      let newYear = currentYear;
      if (newMonth < 0) {
        newMonth = 11;
        newYear = currentYear - 1;
      }
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth + 1;
      let newYear = currentYear;
      if (newMonth > 11) {
        newMonth = 0;
        newYear = currentYear + 1;
      }
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  return (
    <div className="flex justify-center mt-8">
      {/* Calendar */}
      <div className="flex flex-col items-center mr-8">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <button className="mr-2" onClick={handlePrevMonth}>
              &lt;
            </button>
            <h2 className="text-xl font-bold">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button className="ml-2" onClick={handleNextMonth}>
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array(firstDayOfMonth)
              .fill(null)
              .map((_, index) => (
                <div key={`empty-${index}`} />
              ))}
            {Array(daysInMonth)
              .fill(null)
              .map((_, day) => (
                <div
                  key={day}
                  className={`text-center py-2 border cursor-pointer ${
                    currentYear === new Date().getFullYear() &&
                    currentMonth === new Date().getMonth() &&
                    day + 1 === new Date().getDate()
                      ? "bg-blue-500 text-white"
                      : ""
                  } ${day + 1 === selectedDay ? "bg-green-100" : ""}`}
                  onClick={() => handleDayClick(day + 1)}
                >
                  {day + 1}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Journal Entries for Selected Day */}
      {isModalOpen && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">
            {`${monthNames[currentMonth]} ${selectedDay}, ${currentYear}`}
          </h3>
          <div className="mb-4">
            {journalEntriesForDay.map((entry, index) => (
              <div key={index} className="border p-2 mb-2">
                {entry}
              </div>
            ))}
          </div>
          {/* Journal Entry Input */}
          <textarea
            className="w-64 h-32 p-2 border rounded mb-2"
            value={journalEntry}
            onChange={handleJournalChange}
            placeholder="Write your journal entry..."
          />
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              onClick={saveJournalEntry}
            >
              Save
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Weather Display for Selected Day */}
      {selectedDay !== null && (
        <div className="ml-8">
          <WeatherDisplay
            selectedDate={new Date(currentYear, currentMonth, selectedDay)}
          />
        </div>
      )}
    </div>
  );
};

export default Calendar;
