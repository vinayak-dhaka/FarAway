import { useState } from "react";

export default function AiForm({ onAddAiItems }) {
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [tripType, setTripType] = useState("");
  const [customTrip, setCustomTrip] = useState("");
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  async function handleAiGenerate() {
    if (!destination || !duration || !month || !tripType) {
      alert("Please fill all fields");
      return;
    }

    const tripRequest = {
      destination,
      duration,
      typeOfTrip: tripType === "Others" ? customTrip : tripType,
      month,
    };

    try {
      setLoading(true);
      setGenerating(true);
      const res = await fetch(
        "http://localhost:8080/api/ollama/generate-items",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tripRequest),
        }
      );

      let data = await res.json();

      onAddAiItems(data);
    } catch (err) {
      console.error(err);
      alert("Failed to connect to AI backend");
    } finally {
      setLoading(false);
      setGenerating(false);
    }
  }

  return (
    <div
      className="add-form"
      style={{
        backgroundColor: "#000000",
        color: "white",
        paddingTop: "130px",
        display: "block",
        paddingBottom: "130px",
      }}
    >
      <h3 style={{ textAlign: "center", paddingBottom: "55px" }}>
        Let AI help you to add items for your next trip
      </h3>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingLeft: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="text"
          placeholder="Duration (Days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <select
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="">Type of trip</option>
          <option value="Vacation">Vacation</option>
          <option value="Work trip">Work trip</option>
          <option value="Trek">Trek</option>
          <option value="Wedding">Wedding</option>
          <option value="Festival">Festival</option>
          <option value="Others">Others</option>
        </select>

        {tripType === "Others" && (
          <input
            type="text"
            placeholder="Please specify"
            value={customTrip}
            onChange={(e) => setCustomTrip(e.target.value)}
          />
        )}

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="">Month</option>
          {[
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
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <button
          onClick={handleAiGenerate}
          disabled={loading || generating}
          style={{ display: "flex", alignItems: "center" }}
        >
          {generating ? (
            <span>
              Generating
              <span className="dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </span>
            </span>
          ) : loading ? (
            "Generating..."
          ) : (
            "Add"
          )}
        </button>
      </div>
    </div>
  );
}
