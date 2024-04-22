import React, { useState, useEffect } from "react";
import WeatherDisplay from "./WeatherDisplay";

const Calendar = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [journalEntry, setJournalEntry] = useState("");
  const [journalEntriesForDay, setJournalEntriesForDay] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrlsByDay, setImageUrlsByDay] = useState({}); // Map day numbers to arrays of image URLs

  useEffect(() => {
    // Load journal entries for the selected day from local storage
    if (selectedDay !== null) {
      const entryKey = `${currentYear}-${currentMonth}-${selectedDay}`;
      const storedEntries = localStorage.getItem(entryKey);
      if (storedEntries) {
        // Split stored entries into an array of strings
        const entriesArray = storedEntries.split("\n");
        setJournalEntriesForDay(entriesArray);
      } else {
        setJournalEntriesForDay([]);
      }
      setJournalEntry(""); // Clear journal entry input
    }
  }, [currentYear, currentMonth, selectedDay]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const handleJournalChange = (event) => {
    setJournalEntry(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 0 && selectedDay !== null) {
      const urls = files.map((file) => URL.createObjectURL(file));
      const updatedUrls = { ...imageUrlsByDay };
      if (updatedUrls[selectedDay]) {
        updatedUrls[selectedDay] = [...updatedUrls[selectedDay], ...urls];
      } else {
        updatedUrls[selectedDay] = urls;
      }
      setImageUrlsByDay(updatedUrls);
    }
  };

  const saveJournalEntry = () => {
    if (selectedDay !== null && journalEntry.trim() !== "") {
      const entryKey = `${currentYear}-${currentMonth}-${selectedDay}`;
      let storedEntries = localStorage.getItem(entryKey);

      try {
        // Append new journal entry to existing stored entries
        let updatedEntries = storedEntries ? `${storedEntries}\n${journalEntry}` : journalEntry;
        localStorage.setItem(entryKey, updatedEntries);

        // Update the journal entries for the selected day
        setJournalEntriesForDay((prevEntries) => [...prevEntries, journalEntry]);
        setJournalEntry(""); // Clear the journal entry input
      } catch (error) {
        console.error("Error storing journal entry:", error);
        // Handle storage error
      }
    }
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null); // Reset selectedDay to hide weather display
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
      <div className="flex flex-1">
        {/* Calendar */}
        <div className="flex flex-col items-center mr-8 flex-1">
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
            <div className={`grid grid-cols-7 ${isModalOpen ? "gap-4" : "gap-20"}`}>
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
                    className={`text-center relative ${
                      isModalOpen ? "px-4 py-4" : "px-20 py-20"
                    } border cursor-pointer ${
                      currentYear === new Date().getFullYear() &&
                      currentMonth === new Date().getMonth() &&
                      day + 1 === new Date().getDate()
                        ? "bg-blue-500 text-white"
                        : ""
                    } ${day + 1 === selectedDay ? "bg-green-100" : ""}`}
                    onClick={() => handleDayClick(day + 1)}
                  >
                    <span className="absolute inset-0 flex items-center justify-center">
                      {day + 1}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Journal Entries and Weather Display */}
        {isModalOpen && (
          <div className="bg-gray-100 p-4 rounded flex-2">
            <h3 className="text-lg font-bold mb-2">
              {`${monthNames[currentMonth]} ${selectedDay}, ${currentYear}`}
            </h3>
            <div className="mb-4" style={{ maxHeight: "200px", overflowY: "auto" }}>
              {journalEntriesForDay.map((entry, index) => (
                <div key={index} className="border p-2 mb-2" style={{ maxWidth: "300px", wordWrap: "break-word" }}>
                  {entry}
                </div>
              ))}
            </div>
            {/* Display uploaded images for the selected day */}
            {imageUrlsByDay[selectedDay] && (
              <div className="mb-4">
                {imageUrlsByDay[selectedDay].map((url, index) => (
                  <img key={index} src={url} alt={`Image ${index + 1}`} style={{ maxWidth: "100%", marginBottom: "8px" }} />
                ))}
              </div>
            )}
            {/* Upload Image Button */}
            <div>
              <input
                type="file"
                accept="image/*"
                className="mt-2"
                onChange={handleImageChange}
                multiple // Allow multiple file selection
              />
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
      </div>

      {/* Weather Display */}
      {selectedDay !== null && (
        <div className="mt-4 w-64 bg-yellow-200 p-4 rounded-l-lg">
          <h3 className="text-lg font-bold mb-2">
            Weather
          </h3>
          <div className="">
            <WeatherDisplay selectedDate={new Date(currentYear, currentMonth, selectedDay)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
