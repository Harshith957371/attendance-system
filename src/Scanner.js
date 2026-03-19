import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "./supabaseClient";

function Scanner() {
  const [params] = useSearchParams();
  const sessionId = params.get("session");

  const [status, setStatus] = useState("processing");
useEffect(() => {
  handleAttendance();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [sessionId]);
  async function handleAttendance() {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    // 🔒 Must be logged in (NO prompt now)
    const studentId = localStorage.getItem("studentId");

    if (!studentId) {
      window.location.href = "/login";
      return;
    }

    // 🔍 Check duplicate
    const { data: existing, error: checkError } = await supabase
      .from("attendance")
      .select("*")
      .eq("student_id", studentId)
      .eq("session_id", sessionId);

    if (checkError) {
      setStatus("error");
      return;
    }

    if (existing.length > 0) {
      setStatus("duplicate");
      return;
    }

    // ✅ Insert attendance
    const { error } = await supabase.from("attendance").insert([
      {
        student_id: studentId,
        session_id: sessionId
      }
    ]);

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      
      {status === "processing" && (
        <h2>⏳ Marking Attendance...</h2>
      )}

      {status === "success" && (
        <h2 style={{ color: "green" }}>
          ✅ Attendance Marked Successfully
        </h2>
      )}

      {status === "duplicate" && (
        <h2 style={{ color: "orange" }}>
          ⚠️ Attendance Already Marked
        </h2>
      )}

      {status === "error" && (
        <h2 style={{ color: "red" }}>
          ❌ Something went wrong
        </h2>
      )}
    </div>
  );
}

export default Scanner;