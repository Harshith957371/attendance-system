import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { supabase } from "./supabaseClient";

function Teacher() {
  const [sessionId, setSessionId] = useState(null);
  const [attendanceList, setAttendanceList] = useState([]);

  const [classId, setClassId] = useState("IT");
  const [subject, setSubject] = useState("ATCD");

  // 🔥 Start attendance
  async function startAttendance() {
    const newSessionId = Date.now().toString();

    await supabase.from("sessions").insert([
      {
        id: newSessionId,
        class_id: classId,
        subject: subject,
        status: "active"
      }
    ]);

    setSessionId(newSessionId);
  }

  // 🔄 Fetch attendance
  async function fetchAttendance() {
    if (!sessionId) return;

    const { data } = await supabase
      .from("attendance")
      .select("*")
      .eq("session_id", sessionId);

    setAttendanceList(data || []);
  }

  useEffect(() => {
  const interval = setInterval(fetchAttendance, 2000);

  return () => clearInterval(interval);

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [sessionId]);
  // ✅ Finalize
  async function finalizeAttendance() {
    await supabase
      .from("sessions")
      .update({ status: "completed" })
      .eq("id", sessionId);

    alert("Attendance Finalized!");
  }

  // ❌ Delete student attendance
  async function deleteAttendance(id) {
    await supabase.from("attendance").delete().eq("id", id);

    alert("Deleted successfully!");
    fetchAttendance(); // refresh list
  }

  // 📥 Download CSV
  function downloadCSV() {
    let csv = "Student ID\n";

    attendanceList.forEach((item) => {
      csv += item.student_id + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance.csv";
    a.click();
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Teacher Dashboard</h1>

      <input value={classId} onChange={(e) => setClassId(e.target.value)} />
      <br /><br />

      <input value={subject} onChange={(e) => setSubject(e.target.value)} />
      <br /><br />

      <button onClick={startAttendance}>Start Attendance</button>

      {sessionId && (
        <div>
          <h3>{classId} - {subject}</h3>

          <QRCodeCanvas
            value={`http://192.168.0.5:3000/student?session=${sessionId}`}
            size={220}
          />

          {/* 🔥 LIVE COUNT */}
          <h2 style={{ marginTop: "20px" }}>
            Present: {attendanceList.length}
          </h2>

          <h3>Present Students</h3>

          <ul style={{ listStyle: "none" }}>
            {attendanceList.map((item) => (
              <li key={item.id} style={{ marginBottom: "10px" }}>
                ✅ {item.student_id}

                {/* ❌ DELETE BUTTON */}
                <button
                  style={{
                    marginLeft: "10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                  }}
                  onClick={() => deleteAttendance(item.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

          <button onClick={finalizeAttendance}>
            Finalize Attendance
          </button>

          <br /><br />

          <button onClick={downloadCSV}>
            Download Attendance
          </button>
        </div>
      )}
    </div>
  );
}

export default Teacher;